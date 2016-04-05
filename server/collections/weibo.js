/**
 * Created by bai on 2015/9/1.
 */


WeiboConfig.attachSchema(new SimpleSchema({
    account: {
        type: String,
        autoValue: function() {
            return '';
        }
    },
    password: {
        type: String,
        autoValue: function() {
            return '';
        }
    },
    autoPublish: {
        type: Boolean,
        autoValue: function() {
            return false;
        }
    },
    timerSchedule: {
        type: String,
        autoValue: function() {
            return '';
        }
    },
    waitData: {
        type: Boolean,
        autoValue: function() {
            return false;
        }
    },
    template:{
        type:String,
        autoValue:function(){
            return '';
        }
    }
}));

WeiboRecord.attachSchema(new SimpleSchema({
    date: {
        type: Date,
        autoValue: function() {
            return new Date();
        }
    },
    content: {
        type: String
    },
    status: {
        type: Boolean
    }
}));


WeiboConfig.allow({
    insert: function() {
        //TODO roles auth here
        return true;
    }, update: function() {
        //TODO roles auth here
        return true;
    }
})

WeiboRecord.allow({
    insert: function() {
        //TODO roles auth here
        return true;
    }
})

Meteor.publish('weiboConfig', function() {
    return WeiboConfig.find();
})

Meteor.publish('weiboRecord', function() {
    return WeiboRecord.find();
})


