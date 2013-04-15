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

    items: [{
        xtype: 'fieldset',
        title: 'User Info',
        defaultType: 'textfield',
        defaults: {
            anchor: '100%'
        },
        items: [
            { allowBlank:false, fieldLabel: 'Email', name: 'RegisterForm[email]', emptyText: 'type your email', vtype:'email' },
            { allowBlank:false, fieldLabel: 'Password', name: 'RegisterForm[password]', emptyText: 'password', inputType: 'password' },
            { allowBlank:false, fieldLabel: 'Verify', name: 'RegisterForm[passwordConfirm]', emptyText: 'password', inputType: 'password' }
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
            name: 'RegisterForm[firstname]',

        },
        {
            fieldLabel: 'Last Name',
            emptyText: 'Last Name',
            name: 'RegisterForm[lastname]'
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
                    handler : function(self, e){
                        var form = this.up('form').getForm();
                        if (form.isValid()){
                            form.submit({
                                success : function(form, action){
                                    Ext.Msg.alert('Success', action.result.msg);
                                },
                                failure : function(form, action){
                                    Ext.Msg.alert('Failure', action.result.msg);
                                }
                            })
                        }
                    }
                }],
        }]
});