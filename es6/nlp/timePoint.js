/**
 *Intro:
 *Author:shine
 *Date:2017/11/1
 */
class TimePoint {
    constructor(date) {
        if (date) {
            const d = new Date(date);
            this.tunit = [
                d.getFullYear(),
                d.getMonth() + 1,
                d.getDate(),
                d.getHours(),
                d.getMinutes(),
                d.getSeconds()
            ];
        } else {
            this.tunit = [-1, -1, -1, -1, -1, -1];
        }
    }
}

module.exports = TimePoint;
