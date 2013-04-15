/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides

Ext.application({
    name: 'Scrum',
    appFolder : '/frontend/app',
    views: [
        'Viewport',
        'form.LoginForm',
        'form.RegisterForm'
    ],
    requires : [
        "Ext.util.Cookies",
        "Ext.util.KeyNav"
    ],
    launch : function(){
        var tabpanel = Ext.getCmp('app_viewport').getComponent('app_tabpanel');
        var loginForm, registerForm;

        if (Ext.util.Cookies.get('login')){
            tabpanel.getComponent('active_project_tab').enable();
            tabpanel.getComponent('backlog_tab').enable();
            tabpanel.getComponent('sprints_tab').enable();
            tabpanel.getComponent('team_tab').enable();

            //show dashboard
        }
        else {  
            tabpanel.getComponent('active_project_tab').disable();
            tabpanel.getComponent('backlog_tab').disable();
            tabpanel.getComponent('sprints_tab').disable();
            tabpanel.getComponent('team_tab').disable();

            //show login window
            loginForm = Ext.create('Scrum.view.form.LoginForm', {
                id : 'login_form',
                url : '/auth/login',
                renderTo : Ext.getBody(),
                floating : true
            });
            loginForm.getDockedComponent('login_footer').getComponent('to_register_button').on({
                click : function(self, e){
                    Ext.getCmp('register_form').show();
                    this.up('form').hide();
                }
            });
            Ext.create('Ext.util.KeyNav', {
                target : "login_form",
                enter : function(){
                    form = this.getForm();
                    if (form.isValid)
                        this.getDockedComponent('login_footer').
                        getComponent('login_button').fireEvent('click');
                },
                scope : loginForm
            });  
            //registration form
            registerForm = Ext.create('Scrum.view.form.RegisterForm', {
                id : 'register_form',
                url : '/auth/registration',
                renderTo : Ext.getBody(),
                floating : true,
                hidden : true
            });
            registerForm.getDockedComponent('register_buttons').getComponent('back_to_login_button').on({
                click : function(self, e){
                    Ext.getCmp('login_form').show();
                    this.up('form').hide();
                },
            });
            registerForm.on({
                actioncomplete : function(self, e){
                    var authStatus =  loginForm.getComponent('auth_status');
                    registerForm.hide();
                    loginForm.show();
                    authStatus.update('<h3>Now you can sign in</h3>');
                    authStatus.removeCls();
                    authStatus.addCls('app-statusbar-success');
                    authStatus.show();
                }
            });
            Ext.create('Ext.util.KeyNav', {
                target : 'register_form',
                enter : function(){
                    form = this.getForm();
                    if (form.isValid)
                        this.getDockedComponent('register_buttons').
                        getComponent('submit_registration_form_button').fireEvent('click');
                },
                scope : registerForm
            });
        }
    },

    autoCreateViewport: true
});
