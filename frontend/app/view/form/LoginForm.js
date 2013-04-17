Ext.define('Scrum.view.form.LoginForm', {
	extend: 'Ext.form.Panel',
    xtype: 'login-form',
    requires : [
        'Ext.ux.statusbar.StatusBar'
    ],
    cls : 'app-login-form',
    title: 'Login',
    frame:true,
    width: 320,
    bodyPadding: 10,
    
    defaultType: 'textfield',
    defaults: {
        anchor: '100%'
    },
    listeners : {
        beforeshow : function(self, e){
            var authStatus = this.getComponent('auth_status');
            self.getForm().reset();
            //clear state
            authStatus.update('');
            authStatus.hide();
        },
        beforeaction : function(self, e){
            //show loading
            this.setLoading({ msg : "Checking..."});
            //hide state
            (authStatus = this.getComponent('auth_status')).update('');
            authStatus.hide();
        },
        actioncomplete : function(self, action){
            this.setLoading(false);
        },
        actionfailed : function(self, action){
            var authStatus = this.getComponent('auth_status');

            //update state
            authStatus.show();
            authStatus.addCls('app-statusbar-error')
            authStatus.update(authStatus.tpl.apply(action.result.specific))
            //hide loading
            this.setLoading(false);  
        }
    },
    items: [
        { 
            xtype : 'component', 
            cls : 'app-statusbar',
            shadow : false,
            id : 'auth_status',
            hidden : true,
            flex : 1,
            tpl : Ext.create('Ext.XTemplate', 
                '<ul class="' + Ext.plainListCls + '">' + 
                    '<tpl for="password">' + 
                        '<li>{.}</li>' + 
                    '</tpl>' + 
                '</ul>')
        },
        {
            id : 'email_field',
            allowBlank: false,
            fieldLabel: 'Email',
            name: 'LoginForm[email]',
            emptyText: 'type your email',
            msgTarget : 'side',
            vtype : 'email'
        },
        {
            id : 'password_field',
            allowBlank: false,
            fieldLabel: 'Password',
            name: 'LoginForm[password]',
            emptyText: 'password',
            msgTarget : 'side',
            inputType: 'password'
        },
        {
            xtype:'checkbox',
            fieldLabel: 'Remember me',
            name: 'LoginForm[rememberMe]',
            inputValue : 1
        }
    ],
    dockedItems: [
        {
            xtype : 'toolbar',
            dock : 'bottom',
            ui : 'footer',
            id : 'login_footer',
            items : [
                '->',
                { 
                    xtype:'button', 
                    id : 'to_register_button',
                    text:'Register'
                },
                {
                    text:'Login' , 
                    id : 'login_button',
                    disabled: true,
                    formBind: true,
                    listeners : {
                        click : function(self, e){
                            var form = this.up('form');
                            if (form.isValid()){
                                form.submit();
                            }
                        }
                    }
                }],
        }]       
})