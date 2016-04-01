/**
 * Created by bai on 2015/9/1.
 */


Weibo.attachSchema(new SimpleSchema({
    content: {
        type: String
    },
    timestamp: {
        type: Date,
        autoValue: function() {
            return new Date();
        }
    },
    cityCode: {
        type: Number
    },
    cityName: {
        type: String
    }
}));


Weibo.allow({
    insert: function() {
        //TODO roles auth here
        return true;
    }, remove: function() {
        return true;
    }, update: function() {
        //TODO roles auth here
        return true;
    }
})

Meteor.publish('weibo', function() {
    //TODO page
    return Warning.find();
})


