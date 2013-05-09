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
    require : [
        'Scrum.util.template',
        'Scrum.state.UserStateProvider'
    ],
    controllers : [
        'TopPanel',
        'ProjectProfile'
    ],
    views: [
        'Viewport',
    ],
    launch : function(){
        Ext.state.Manager.setProvider(Ext.create('Scrum.state.UserStateProvider'));
    },
    autoCreateViewport: true
});

Ext.namespace('Scrum.util', 'Scrum.util.template');
Scrum.util.template.getPostDate = function(date){
    var hours, days, months;
    var now = Date.now();
    var date = date.getTime();
    var string;
    var diff = now - date;

    if (diff <= 3600*1000){
        string = 'less an hour ago';
    }
    else {
        hours = Math.floor(diff / (3600*1000));
        if (hours <= 24){
            string = hours + ' hour ago';
        }
        else {
            days = Math.floor(hours / 24);
            if (days <= 30){
                string = days + ' days ago';
            }
            else {
                months = Math.floor(days / 30);
                if (months <= 12){
                    string = months + ' monts ago';
                }
        }}}
    return string;  
}
