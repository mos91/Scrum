Ext.define('Scrum.view.sprint.summary.BurndownChart', {
    extend : 'Ext.chart.Chart',
	xtype : 'scrum-sprint-burndown-chart',
    requires : ['Scrum.store.sprint.BurndownStatistic'],
	style: 'background:#fff',
    animate: true,
    shadow: true,
    initComponent : function(){
        Ext.apply(this, {
            store : Ext.create('Scrum.store.sprint.BurndownStatistic')
        });

        this.callParent();
    },
    axes: [{
        type: 'Numeric',
        minimum: 0,
        position: 'left',
        fields: ['sprint_estimate'],
        title: 'Story Points',
        minorTickSteps: 1,
        grid: {
            odd: {
                opacity: 1,
                fill: '#ddd',
                stroke: '#bbb',
                'stroke-width': 0.5
            }
        }
    }, 
    {
        type: 'Time',
        position: 'bottom',
        adjustMinimumByMajorUnit : true,
        fields: ['complete_time'],
        dateFormat : 'M d',
        title: 'Date'
    }],
    series : [{
    	type: 'line',
        highlight: {
            size: 7,
            radius: 7
        },
        axis: 'left',
        xField: 'complete_time',
        yField: 'sprint_estimate',
        markerConfig: {
            type: 'cross',
            size: 4,
            radius: 4,
            'stroke-width': 0
        }
    }]
})