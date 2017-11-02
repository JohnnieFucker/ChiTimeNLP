/**
 *Intro:
 *Author:shine
 *Date:2017/11/1
 */

const TimeUnit = require('./timeUnit');
const preHandle = require('./strPreHandling');

class normalizer {
    constructor() {
        this.timeBase = false;
        this.expression = '';
        this.isPreferFuture = true;
    }

    static _preHandling(expression) {
        expression = preHandle.delKeyword(expression, '\\s+'); // 清理空白符
        expression = preHandle.delKeyword(expression, '[的]+'); // 清理语气助词
        expression = preHandle.DBC2CDB(expression);// 全角转半角
        expression = preHandle.numberTranslator(expression);// 大写数字转化
        return expression;
    }

    turnOffPreferFuture() {
        this.isPreferFuture = false;
    }

    getTimeBase() {
        return this.timeBase;
    }

    setTimeBase(s) {
        this.timeBase = s;
    }

    parse(expression, timeBase) {
        this.expression = expression;
        const exp = normalizer._preHandling(expression);
        if (timeBase) {
            if (typeof (timeBase) === 'string') {
                this.timeBase = new Date(timeBase);
            } else {
                this.timeBase = timeBase;
            }
        } else {
            this.timeBase = new Date();
        }
        const tu = new TimeUnit(exp, this.isPreferFuture, this.timeBase);
        return tu.timeNormalization();
    }
}

module.exports = normalizer;
