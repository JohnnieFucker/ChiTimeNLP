'use strict';

/**
 *Intro: 工具类
 *Author:shine
 *Date:2017/11/1
 */

var util = {
    ONE_MINUTE_MILLISECOND: 60000,
    ONE_HOUR_MILLISECOND: 3600000,
    ONE_DAY_MILLISECOND: 86400000,
    ONE_WEEK_MILLISECOND: 604800000,
    ONE_MONTH_MILLISECOND: 2592000000,
    ONE_YEAR_MILLISECOND: 31536000000,
    zodiacArray: ['猴', '鸡', '狗', '猪', '鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊'],
    constellationArray: ['水瓶座', '双鱼座', '牡羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '魔羯座'],
    constellationEdgeDay: [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22],

    isEmptyStr: function isEmptyStr(str) {
        return !(str && str.trim().length > 0);
    },
    zeroPad: function zeroPad(digits, n) {
        n = n.toString();
        while (n.length < digits) {
            n = '0' + n;
        }
        return n;
    },
    reverseStr: function reverseStr(str) {
        return str.split('').reverse().join('');
    },
    isLeapYear: function isLeapYear(year) {
        if (year / 4 * 4 !== year) {
            // eslint-disable-line
            return false;
        }
        if (year / 100 * 100 !== year) {
            // eslint-disable-line
            return true;
        }

        return year / 400 * 400 === year; // eslint-disable-line
    },
    year2Zodica: function year2Zodica(year) {
        return util.zodiacArray[year % 12];
    },
    date2Zodica: function date2Zodica(date) {
        var d = date ? new Date(date) : new Date();
        return util.year2Zodica(d.getFullYear());
    },
    date2Constellation: function date2Constellation(date) {
        var d = date ? new Date(date) : new Date();
        var month = d.getMonth();
        var day = d.getDate();
        if (day < util.constellationEdgeDay[month]) {
            month -= 1;
        }
        if (month >= 0) {
            return util.constellationArray[month];
        }

        return util.constellationArray[11];
    },

    /**
     * 是否是今天
     * @param date
     */
    isToday: function isToday(date) {
        return util.isTheDay(date, new Date());
    },
    /**
     * 获得指定时间那天的某个小时（24小时制）的整点时间
     */
    getSpecificHourInTheDay: function getSpecificHourInTheDay(date, hourIn24) {
        var d = date ? new Date(date) : new Date();
        d.setHours(hourIn24, 0, 0, 0);
        return d;
    },
    /**
     * 取周一
     */
    getFirstDayOfWeek: function getFirstDayOfWeek(date) {
        var d = date ? new Date(date) : new Date();
        var currentDay = d.getDay();
        currentDay = currentDay === 0 ? 7 : currentDay;
        return util.getDateAfterDays(date, 1 - currentDay);
    },
    /**
     * 获取相对多少天后的日期
     * @param date
     * @param AddDayCount
     * @return {Date}
     */
    getDateAfterDays: function getDateAfterDays(date, AddDayCount) {
        var d = date ? new Date(date) : new Date();
        d.setDate(d.getDate() + AddDayCount);
        return d;
    },
    /**
     * 获取相对多少星期后的日期
     * @param date
     * @param AddWeekCount
     * @param weekDay
     * @return {Date}
     */
    getDateAfterWeeks: function getDateAfterWeeks(date, AddWeekCount, weekDay) {
        var d = date ? new Date(date) : new Date();
        d.setDate(d.getDate() + 7 * AddWeekCount);
        if (weekDay) {
            var dWeekDay = d.getDay();
            if (dWeekDay === 0) {
                dWeekDay = 7;
            }
            if (weekDay !== dWeekDay) {
                d.setDate(d.getDate() + (weekDay - dWeekDay));
            }
        }
        return d;
    },
    /**
     * 获取相对多少月后的日期
     * @param date
     * @param AddMonthCount
     * @return {Date}
     */
    getDateAfterMonths: function getDateAfterMonths(date, AddMonthCount) {
        var d = date ? new Date(date) : new Date();
        var day = d.getDate();
        d.setDate(1);
        d.setMonth(d.getMonth() + AddMonthCount);
        d.setDate(day);
        return d;
    },
    /**
     * 获取相对多少年后的日期
     * @param date
     * @param AddYearCount
     * @return {Date}
     */
    getDateAfterYears: function getDateAfterYears(date, AddYearCount) {
        var d = date ? new Date(date) : new Date();
        d.setFullYear(d.getFullYear() + AddYearCount);
        return d;
    },
    /**
     * 某一天开始时间
     */
    dayBegin: function dayBegin(date) {
        return util.getSpecificHourInTheDay(date, 0);
    },
    /**
     * 某一天结束时间
     */
    dayEnd: function dayEnd(date) {
        var d = date ? new Date(date) : new Date();
        d.setHours(23, 59, 59, 999);
        return d;
    },
    /**
     * 判断是否某一天
     * @param date
     * @param day
     * @return {boolean}
     */
    isTheDay: function isTheDay(date, day) {
        var d = date ? new Date(date) : new Date();
        return d >= util.dayBegin(day).getTime() && d <= util.dayEnd(day).getTime();
    },
    /**
     * 格式化时间
     * @param date
     * @return {string}
     */
    formatDateDefault: function formatDateDefault(date) {
        var d = date ? new Date(date) : new Date();
        var year = d.getFullYear();
        var month = util.zeroPad(2, d.getMonth() + 1);
        var day = util.zeroPad(2, d.getDate());
        var hour = util.zeroPad(2, d.getHours());
        var min = util.zeroPad(2, d.getMinutes());
        var sec = util.zeroPad(2, d.getSeconds());
        return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
    },
    /**
     * 检测日期格式字符串是否合法
     * @param strDateTime
     * @return {boolean}
     */
    checkDateFormatAndValite: function checkDateFormatAndValite(strDateTime) {
        if (util.isEmptyStr(strDateTime)) {
            return false;
        }
        if (util.formatDateDefault(new Date(strDateTime)) !== strDateTime) {
            return false;
        }
        return true;
    }
};
module.exports = util;