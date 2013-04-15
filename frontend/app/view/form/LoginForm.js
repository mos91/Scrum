Ext.define('Scrum.view.form.LoginForm', {
	extend: 'Ext.form.Panel',
    xtype: 'login-form',
    cls : 'app-login-form',

    title: 'Login',
    frame:true,
    width: 320,
    bodyPadding: 10,
    
    defaultType: 'textfield',
    defaults: {
        anchor: '100%'
    },
    
    items: [
        {
            allowBlank: false,
            fieldLabel: 'Email',
            name: 'LoginForm[email]',
            emptyText: 'type your email',
            vtype : 'email'
        },
        {
            allowBlank: false,
            fieldLabel: 'Password',
            name: 'LoginForm[password]',
            emptyText: 'password',
            inputType: 'password'
        },
        {
            xtype:'checkbox',
            fieldLabel: 'Remember me',
            name: 'remember'
        }
    ],
    dockedItems: [
        {
            xtype : 'toolbar',
            dock : 'bottom',
            ui : 'footer',
            id : 'login_buttons',
            items : [
                '->',
                { xtype:'button', id : 'to_register_button',  text:'Register' },
                {
                    text:'Login' , 
                    id : 'login_button',
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
})