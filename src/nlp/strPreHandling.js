'use strict';

/**
 *Intro:
 *Author:shine
 *Date:2017/11/1
 */
var util = require('../util');

var handler = {
    delKeyword: function delKeyword(target, rules) {
        var r = new RegExp(rules, 'g');
        return target.replace(r, '');
    },
    /**
         * 方法numberTranslator的辅助方法，可将[零-九]正确翻译为[0-9]
         * @param s
         * @return {number}
         */
    wordToNumber: function wordToNumber(s) {
        if (s === '零' || s === '0') {
            return 0;
        } else if (s === '一' || s === '1') {
            return 1;
        } else if (s === '二' || s === '2') {
            return 2;
        } else if (s === '三' || s === '3') {
            return 3;
        } else if (s === '四' || s === '4') {
            return 4;
        } else if (s === '五' || s === '5') {
            return 5;
        } else if (s === '六' || s === '6') {
            return 6;
        } else if (s === '七' || s === '7') {
            return 7;
        } else if (s === '八' || s === '8') {
            return 8;
        } else if (s === '九' || s === '9') {
            return 9;
        } else if (s === '十') {
            return 10;
        }
        return -1;
    },

    numberTranslator: function numberTranslator(target) {
        var tmp = util.reverseStr(target);
        var rule = new RegExp('[末天日](?=(周|期星))', 'g');
        tmp = tmp.replace(rule, '7');
        target = util.reverseStr(tmp);
        target = target.replace(/零/g, '0').replace(/一/g, '1').replace(/二/g, '2').replace(/三/g, '3').replace(/四/g, '4').replace(/五/g, '5').replace(/六/g, '6').replace(/七/g, '7').replace(/八/g, '7').replace(/九/g, '7');
        return target;
    },

    DBC2CDB: function DBC2CDB(target) {
        var tmp = '';
        for (var i = 0; i < target.length; i++) {
            if (target.charCodeAt(i) > 65248 && target.charCodeAt(i) < 65375) {
                tmp += String.fromCharCode(target.charCodeAt(i) - 65248);
            } else {
                tmp += String.fromCharCode(target.charCodeAt(i));
            }
        }
        return tmp;
    }
};

module.exports = handler;