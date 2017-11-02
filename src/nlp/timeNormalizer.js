'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *Intro:
 *Author:shine
 *Date:2017/11/1
 */

var TimeUnit = require('./timeUnit');
var preHandle = require('./strPreHandling');

var normalizer = function () {
    function normalizer() {
        _classCallCheck(this, normalizer);

        this.timeBase = false;
        this.expression = '';
        this.isPreferFuture = true;
    }

    _createClass(normalizer, [{
        key: 'turnOffPreferFuture',
        value: function turnOffPreferFuture() {
            this.isPreferFuture = false;
        }
    }, {
        key: 'getTimeBase',
        value: function getTimeBase() {
            return this.timeBase;
        }
    }, {
        key: 'setTimeBase',
        value: function setTimeBase(s) {
            this.timeBase = s;
        }
    }, {
        key: 'parse',
        value: function parse(expression, timeBase) {
            this.expression = expression;
            var exp = normalizer._preHandling(expression);
            if (timeBase) {
                if (typeof timeBase === 'string') {
                    this.timeBase = new Date(timeBase);
                } else {
                    this.timeBase = timeBase;
                }
            } else {
                this.timeBase = new Date();
            }
            var tu = new TimeUnit(exp, this.isPreferFuture, this.timeBase);
            return tu.timeNormalization();
        }
    }], [{
        key: '_preHandling',
        value: function _preHandling(expression) {
            expression = preHandle.delKeyword(expression, '\\s+'); // 清理空白符
            expression = preHandle.delKeyword(expression, '[的]+'); // 清理语气助词
            expression = preHandle.DBC2CDB(expression); // 全角转半角
            expression = preHandle.numberTranslator(expression); // 大写数字转化
            return expression;
        }
    }]);

    return normalizer;
}();

module.exports = normalizer;