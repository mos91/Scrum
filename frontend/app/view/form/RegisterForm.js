Ext.define('Scrum.view.form.RegisterForm', {
    extend: 'Ext.form.Panel',
    xtype: 'register-form',
    cls : 'app-register-form',
    
    frame: true,
    title: 'Register',
    bodyPadding: 10,
    autoScroll:true,
    width: 355,

    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 115,
        msgTarget: 'side'
    },
    listeners : {
        afterrender : function(self, e){
            Ext.create('Ext.util.KeyNav', {
                target : self,
                enter : function(){
                    form = this.getForm();
                    if (form.isValid)
                        this.getDockedComponent('register_buttons').
                        getComponent('submit_registration_form_button').fireEvent('click');
                },
                scope : this
            });  
        },
        beforeshow : function(self, e){
            this.getForm().reset();
            //clear state
            (registrationStatus = this.getComponent('registration_status')).update('');
            registrationStatus.hide();
        },
        beforeaction : function(self, e){
             //show loading
            this.setLoading({ msg : "Handling request..."});
            //hide state
            (registrationStatus = this.getComponent('registration_status')).update('');
            registrationStatus.hide();
        },
        actioncomplete : function(self, action){
            var result = action.result;
                                
            if (result.success){
                       
            }
            this.setLoading(false);
        },
        actionfailed : function(self, action){
            var registrationStatus = this.getComponent('registration_status');

            //update state
            registrationStatus.show();
            registrationStatus.addCls('app-statusbar-error')
            registrationStatus.update(registrationStatus.tpl.apply(action.result.specific))
            //hide loading
            this.setLoading(false);
        }
    },

    items: [
    {
        xtype : 'component', 
        cls : 'app-statusbar',
        shadow : false,
        id : 'registration_status',
        hidden : true,
        flex : 1,
        tpl : Ext.create('Ext.XTemplate', 
            '<ul class="' + Ext.plainListCls + '">' + 
                '<tpl for="email">' + 
                    '<li>{.}</li>' + 
                '</tpl>' +
            '</ul>' + 
            '<ul class="' + Ext.plainListCls + '">' + 
                '<tpl for="password">' + 
                    '<li>{.}</li>' + 
                '</tpl>' + 
            '</ul>')
    },
    {
        xtype: 'fieldset',
        title: 'User Info',
        defaultType: 'textfield',
        defaults: {
            anchor: '100%'
        },
        items: [
            { allowBlank:false, fieldLabel: 'Email', name: 'RegistrationForm[email]', emptyText: 'type your email', vtype:'email' },
            { allowBlank:false, fieldLabel: 'Password', name: 'RegistrationForm[password]', emptyText: 'password', inputType: 'password' },
            { allowBlank:false, fieldLabel: 'Verify', name: 'RegistrationForm[passwordConfirm]', emptyText: 'password', inputType: 'password' }
        ]
    },
    {
        xtype: 'fieldset',
        title: 'Contact Information',
        defaultType: 'textfield',
        defaults: {
            anchor: '100%'
        },
        items: [{
            fieldLabel: 'First Name',
            emptyText: 'First Name',
            name: 'RegistrationForm[firstname]',
            allowBlank : false
        },
        {
            fieldLabel: 'Last Name',
            emptyText: 'Last Name',
            name: 'RegistrationForm[lastname]',
            allowBlank : false
        }]
    }],
    dockedItems: [
        {
            xtype : 'toolbar',
            dock : 'bottom',
            ui : 'footer',
            id : 'register_buttons',
            items : [
                '->',
                {   
                    xtype:'button', 
                    id : 'back_to_login_button',
                    text : "Back to Login" 
                },
                {
                    text: 'Register', 
                    id  : 'submit_registration_form_button',
                    disabled: true,
                    formBind: true,
                    listeners : {
                        click :  function(self, e){
                            var form = this.up('form');
                            if (form.isValid()){
                                form.submit();
                            }
                        }
                    }
                }],
        }]
});