"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *Intro:
 *Author:shine
 *Date:2017/11/1
 */
var TimePoint = function TimePoint(date) {
    _classCallCheck(this, TimePoint);

    if (date) {
        var d = new Date(date);
        this.tunit = [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()];
    } else {
        this.tunit = [-1, -1, -1, -1, -1, -1];
    }
};

module.exports = TimePoint;