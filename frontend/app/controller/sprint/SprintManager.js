/*
 * File: app/controller/sprint/SprintManager.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Scrum.controller.sprint.SprintManager', {
    extend: 'Ext.app.Controller',

    views: [
        'sprint.SprintManager'
    ],

    init: function(application) {
        this.sprintsStore = Ext.create('Scrum.store.Sprints', {
            storeId : 'sprints'
        });

        Ext.StoreManager.register(this.sprintsStore);

        this.control({
            'scrum-sprint-manager' : {
                viewSprintManager : {
                    fn : function(project){
                        if (project instanceof Scrum.model.Project){
                            this.project = project;
                        }

                        this.drawGrid(this.sprintsGrid, this.getSprintsStore());        
                    },
                    scope : this
                },
                render : { fn : this.setComponents ,  scope : this}
            },
            'scrum-sprint-manager scrum-sprint-grid' : {
                startSprint : {
                    fn : this.startSprint,
                    scope : this
                },
                stopSprint : {
                    fn : this.stopSprint,
                    scope : this
                },
                completeSprint : {
                    fn : this.completeSprint, 
                    scope : this
                }
            },
            'scrum-sprint-manager scrum-sprint-card' : {
                activate : { fn : function(card){
                    this.activeTab = card;
                }, scope : this}
            },
            'scrum-sprint-manager scrum-commentpanel' : {
                activate : { fn : function(commentPanel){
                    this.activeTab = commentPanel;
                }, scope : this}
            },
            'scrum-sprint-manager scrum-sprint-summary' : {
                activate : { fn : function(summary){
                    this.activeTab = summary;
                }}
            },
            'scrum-sprint-grid' : {
                itemclick : { fn : this.showSprintProfile, scope : this}
                //onCompleteEditStatus : { fn : this.changeUserStoryStatus, scope : this}
            },
            'scrum-sprint-grid tool[action=refresh]' : {
                click : { fn : this.onRefreshSprintGrid, scope : this }
            }, 
            'scrum-sprint-grid tool[action=create]' : {
                click : { fn : this.showSprintCreateForm , scope : this}
            },
            'scrum-sprint-create-form tool[action=close]' : {
                click : { fn : function(){
                    this.sprintsGrid.fireEvent('itemclick', this.sprintsGrid);
                }, scope : this}
            },
            'scrum-sprint-create-form button[action=submit]' : {
                click : { fn : this.submitCreateForm, scope : this}
            },
        })
    },

    getSprintsStore: function() {
        if (!this.sprintsStore){
            this.sprintsStore = Ext.StoreManager.lookup('sprints');
        }
        return this.sprintsStore;
    },

    setComponents: function(sprintManager) {
        var sprintsStore = this.getSprintsStore();

        this.sprintManager = sprintManager;
        this.sprintsGrid = sprintManager.down('scrum-sprint-grid');
        this.createForm = sprintManager.down('scrum-sprint-create-form');
        this.rightPart = sprintManager.down('scrum-sprint-right-part');
        this.commentPanel = sprintManager.down('scrum-comment-panel');
        this.profile = sprintManager.down('#profile');

        sprintsStore.addListener('beforeload', function(store){
            store.proxy.extraParams = { project_id : this.project.get('id')};
        }, this);
        sprintsStore.addListener('load', this.onLoadSprints, this);
        this.sprintsGrid.reconfigure(sprintsStore);
    },
    startSprint : function(sprint, activeSprint){
        var sprintsGrid = this.sprintsGrid;
        var oldStatus = sprint.get('status').value;

        sprint.set('status', Ext.data.Types.SPRINT_STATUS.CURRENT);
        if (!Ext.isEmpty(activeSprint)){
            activeSprint.set('status', Ext.data.Types.SPRINT_STATUS.PLANNED);
        }

        sprintsGrid.setLoading({ msg : 'Please wait...'});
        sprint.save({
            url : '/sprints/changeStatus',
            params : { id : sprint.get('id'), oldStatus: oldStatus, newStatus : Ext.data.Types.SPRINT_STATUS.CURRENT},
            callback : function(){
                sprintsGrid.getView().refresh();
                sprintsGrid.setLoading(false);
            },
            scope : this
        });
    },
    stopSprint : function(sprint){
        var sprintsGrid = this.sprintsGrid;
        var oldStatus = sprint.get('status').value;

        sprint.set('status', Ext.data.Types.SPRINT_STATUS.PLANNED);
        sprintsGrid.setLoading({ msg : 'Please wait...'});
        sprint.save({
            url : '/sprints/changeStatus',
            params : { id : sprint.get('id'), oldStatus : oldStatus, newStatus : Ext.data.Types.SPRINT_STATUS.PLANNED},
            callback : function(){
                sprintsGrid.getView().refresh();
                sprintsGrid.setLoading(false);
            },
            scope : this
        });
    },
    completeSprint : function(sprint){
        var sprintsGrid = this.sprintsGrid;
        var oldStatus = sprint.get('status').value;

        sprint.set('status', Ext.data.Types.SPRINT_STATUS.COMPLETED);
        sprintsGrid.setLoading({ msg : 'Please wait...'});
        sprint.save({
            url : '/sprints/changeStatus',
            params : { id : sprint.get('id'), oldStatus : oldStatus, newStatus : Ext.data.Types.SPRINT_STATUS.COMPLETED},
            callback : function(sprint){
                if (sprint.get('status').value === Ext.data.Types.SPRINT_STATUS.CURRENT){
                     Ext.MessageBox.alert('Status', 'You must complete all userstories in this sprint before you can complete it!');
                }

                sprintsGrid.getView().refresh();
                sprintsGrid.setLoading(false);
            },
            scope : this
        });
    },
    onLoadSprints: function(store) {
        if (store.count()){
            this.sprintsGrid.fireEvent('itemclick', this.sprintsGrid, store.getAt(0));
        }
        else {
            this.showSprintCreateForm();
        }
    },
    showSprintProfile : function(grid, sprint){
        var sprintManager = this.sprintManager;
        var rightPart = this.rightPart;
        var tabPanel = rightPart.down('#scrum-sprint-tab-panel');
        var profileTab;
        var profile, comments;

        rightPart.layout.setActiveItem(tabPanel);
        tabPanel.layout.setActiveItem('empty-panel');
        if (sprint instanceof Scrum.model.Sprint)
            this.getController('sprint.SprintProfile').setSprint(sprint);

        if (!this.activeTab || this.activeTab.itemId == 'profile'){
            tabPanel.layout.setActiveItem('profile');   

            profileTab = tabPanel.down('header').down('#profile-tab');
            profileTab.setText('Profile');
        }
        else if (this.activeTab.itemId == 'comments'){
            comments = tabPanel.layout.setActiveItem('comments');
        }
        else if (this.activeTab.itemId == 'summary'){
            summary = tabPanel.layout.setActiveItem('summary');
        }
    },

    showSprintCreateForm: function(button) {
        var form = this.rightPart.layout.setActiveItem('scrum-sprint-create-form');
        var project = this.project;

        form.down('hiddenfield[name=project_id]').setRawValue(project.get('id'));
        form.down('statusbar').hide();
    },

    submitCreateForm: function(button) {
        var form = this.createForm.getForm();
        var sprintsStore = this.getSprintsStore();
        var grid = this.sprintsGrid;

        if (form.isValid()){
            form.owner.setLoading({ msg : 'Please wait...'});
            form.submit({
                scope : this,
                success : function(record, action){
                    var sprint = Ext.create('Scrum.model.Sprint');
                    var statusBar = form.owner.down('statusbar');
                    var continueCreateCheckbox = form.owner.down('checkbox[action=continue_create]'); 
                    var continueCreate;

                    sprint.set(form.getValues());
                    sprint.set('update_time', action.result.sprint.update_time);
                    sprint.set('status', action.result.sprint.status);
                    sprintsStore.add(sprint);			

                    form.owner.setLoading(false);
                    continueCreate = continueCreateCheckbox.getRawValue();
                    form.reset();
                    if (continueCreate){
                        form.owner.onSuccessfulCreation(sprint);
                        form.owner.down('hiddenfield[name=project_id]').setRawValue(this.project.get('id'));
                    }
                    else {
                        statusBar.hide();
                        grid.fireEvent('itemclick', grid, sprint);	
                    }

                    form.owner.down('checkbox[action=continue_create]').setRawValue(continueCreate);
                }
            })
        }
    },
    onRefreshSprintGrid : function(tool){
        this.drawGrid(tool.up('grid'), this.getSprintsStore(), { redraw : true});
    },
    drawGrid : function(grid, store, options){
        //var paging;
        var partially,redraw;

        options = options || {};
        partially = options.partially;
        redraw = options.redraw;

        if (Ext.isEmpty(partially)){
            grid.setLoading({ msg : 'Refresh...'});
            if (redraw){
                store.reload({
                    callback : function(){
                        grid.setLoading(false);
                    },
                    scope : this
                }); 
            }
            else {
                //paging = grid.getDockedComponent('paging-toolbar');
                //paging.bind(store); 
                store.load({
                    callback : function(records){
                        grid.setLoading(false);
                    },
                    scope : this
                })
                /*store.loadPage(1, {
                    scope : this,
                    callback : function(){
                        grid.setLoading(false);
                    }
                }); */
            }   
        }
        else {
            grid.reconfigure(store);
        }
    }
});
