Template.weibo.helpers({
    varList: function() {
        return Session.get('weiboVarList')
    },
    recordList:function(){
        return weiboRecord.find()
    },
    
})

Template.weibo.events({
    'click .save':function(e,t){
        //save config
        //call weiboPublish
    },
    'click .detail':function(e,t){
        //modal
    },
})

Template.weibo.onRendered(function() {

}
);

Template.weibo.onCreated(function() {
    Meteor.call('weiboVarList', function(err, res) {
        if (err) console.log(err)
        else Session.set('weiboVarList', res)
    })
    Session.set('pages_method', 'weiboRecord_pages')
    Session.set('collection', 'weiboRecord')
    Session.set('filter',{})
}
);