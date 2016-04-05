
Meteor.methods({
    weiboVarList: function() {
        //TODO the real value
        return [
            {
                code: '1',
                name: '2',
                description: '3',
                value: '4'
            },
            {
                code: '1',
                name: '2',
                description: '3',
                value: '4'
            },
            {
                code: '1',
                name: '2',
                description: '3',
                value: '4'
            },
        ]
    },
    'weiboRecord_pages': function(count, filter) {
        if (!filter) filter = {}
        return Math.round(WeiboRecord.find(filter).count() / count)
    },
    weiboPublish:function(){
        //TODO
        
    }
});
