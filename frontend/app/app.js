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
        'Backlog',
        'ProjectProfile'
    ],
    views: [
        'Viewport',
    ],
    autoCreateViewport: true
});

Ext.namespace('Scrum.util', 'Scrum.util.template', 'Scrum.util.template.date');
Scrum.util.template.date.MS_IN_WEEK = 3600*1000*24*7;
Scrum.util.template.PRIORITY_DISPLAY_VALUES = { 0 : 'Low', 1 : 'Medium', 2 : 'High'};
Scrum.util.template.USER_STORY_STATUS_DISPLAY_VALUES  = {
    0x0000 : 'Open',
    0x0002 : 'Accepted',
    0x0003 : 'Todo',
    0x0005 : 'To test',
    0x0007 : 'Done',
    0x0008 : 'Completed',
    0x0007 : 'Closed'
}

Scrum.util.template.getPostDate = function(date){
    var hours, days, months;
    var now = Date.now();
    var value = date.getTime();
    var string;
    var diff = now - value;

    if (diff >= Scrum.util.template.date.MS_IN_WEEK){
        string = Ext.Date.format(date, 'F j, Y, g:i a');
    }
    else if (diff <= 3600*1000){
        string = 'less an hour ago';
    }
    else {
        hours = Math.floor(diff / (3600*1000));
        if (hours <= 24){
            string = hours + ' hour ago';
        }
        else {
            days = Math.floor(hours / 24);
            if (days <= 7){
                string = days + ' days ago';
            }
        }}

    return string;  
}

Scrum.util.template.getPriorityDisplayValue = function(value){
    return Scrum.util.template.PRIORITY_DISPLAY_VALUES[value];
}

Scrum.util.template.getUserStoryDisplayValue = function(value){
    return Scrum.util.template.USER_STORY_STATUS_DISPLAY_VALUES[value];
}