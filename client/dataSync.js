/**
 * Created by bai on 2015/9/7.
 */

Template.dataSync.helpers({
    recordList: function() {
        return DataStationHourlyReSyncRecord.find({}, { sort: { tStart: -1 } }).map(function(e) {
            return {
                _id: e._id,
                date: moment(e.date).format('YYYY-MM-DD'),
                success: e.success ? '成功' : '失败',
                tStart: moment(e.tStart).format('YYYY-MM-DD HH:mm:ss'),
                tEnd: moment(e.tEnd).format('YYYY-MM-DD HH:mm:ss')
            }
        })
    },
    pageList: function() {
        var pages = Session.get('pages')
        var page = Session.get('page')
        var res = []
        for (var i = 1; i <= pages; i++) {
            res.push({
                page: i,
                active: (function() {
                    return i == page ? 'btn-success' : ''
                })()
            })
        }
        return res;
    }
});

Template.dataSync.events({
    'click .sync': function(e, t) {
        e.preventDefault()
        var dateFrom = $('#dateFrom').datepicker('getDate')
        var dateTo = $('#dateTo').datepicker('getDate')
        Util.modal('数据重新同步', '任务已提交给后台处理！')
        Meteor.call('dataStationHourlyReSync', dateFrom, dateTo)
    },
    'mouseenter tbody>tr': function() {
        $('#' + this._id).css({
            'border': '2px solid #186E37',
            'border-width': '0 0 0 2px'
        })
    },
    'mouseleave tbody>tr': function() {
        $('#' + this._id).css({
            'border': '1px dashed #D8D8D8',
        })
    },
    'click .remove': function() {
        console.log(this)
        DataStationHourlyReSyncRecord.remove({ _id: this._id }, function(err, res) {
            if (err)
                console.log(err)
        });
    },
    'click .page': function() {
        if (!this.page) return;
        if (this.page != Session.get('page'))
            Session.set('page', this.page)
    },
    'click .page.pre': function() {
        var page = Session.get('page')
        if (page != 1)
            Session.set('page', page - 1)
    },
    'click .page.next': function() {
        var page = Session.get('page')
        if (page != Session.get('pages'))
            Session.set('page', page + 1)
    }
});

Template.dataSync.onRendered(function() {

    $('#daterange').datepicker({
        language: "zh-CN"
    });

    $('#dateFrom').datepicker('setDate', new Date())
    $('#dateTo').datepicker('setDate', new Date())
    $('#dateFrom').datepicker('setStartDate', (function() {
        var d = new Date();
        d.setDate(d.getDate() - 60);
        return d;
    })())
    $('#dateTo').datepicker('setStartDate', (function() {
        var d = new Date();
        d.setDate(d.getDate() - 60);
        return d;
    })())
    $('#dateFrom').datepicker('setEndDate', new Date())
    $('#dateTo').datepicker('setEndDate', new Date())

    // $('.mainR').scroll(function() {
    //     var scrollValue = Session.get('scrollValue')
    //     if ($('.mainR').scrollTop() > scrollValue) {
    //         Session.set('limit', Session.get('limit') + 20);
    //         Session.set('scrollValue', scrollValue + $('.mainR').height())
    //     }
    // });
}
);

Template.dataSync.onCreated(function() {
    Session.setDefault('page', 1);
    Session.setDefault('count', 12);
    Meteor.call('dataStationHourlyReSyncRecord_pages', Session.get('count'), function(err, res) {
        Session.setDefault('pages', res)
    })

    Tracker.autorun(function() {
        Meteor.subscribe('dataStationHourlyReSyncRecord', Session.get('page'), Session.get('count'));
    });
}
);