import _ from "lodash";

export const dateFormats = {
    SHORT_DATE: "yyyy-MM-dd",
    LONG_DATE: "yyyy-MM-dd hh:mm",
    FULL_DATE: "yyyy-MM-dd hh:mm:ss"
};

export function date2String(date, format) {
    let dateString = null,
        yyyy,
        M,
        MM,
        d,
        dd,
        h,
        hh,
        m,
        mm,
        s,
        ss;
    if (!_.isDate(date)) {
        return null;
    }
    yyyy = date.getFullYear();
    M = date.getMonth() + 1;
    MM = M > 9 ? M : "0" + M;
    d = date.getDate();
    dd = d > 9 ? d : "0" + d;
    h = date.getHours();
    hh = h > 9 ? h : "0" + h;
    m = date.getMinutes();
    mm = m > 9 ? m : "0" + m;
    s = date.getSeconds();
    ss = s > 9 ? s : "0" + s;
    format = format ? format : dateFormats.FULL_DATE;
    switch (format) {
        case dateFormats.SHORT_DATE:
            dateString = yyyy + "-" + MM + "-" + dd;
            break;
        case dateFormats.LONG_DATE:
            dateString = yyyy + "-" + MM + "-" + dd + " " + hh + ":" + mm;
            break;
        case dateFormats.FULL_DATE:
            dateString = yyyy + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss;
            break;
        default:
        // do nothing
    }
    return dateString;
}

export function timestamp2String(timestamp, format) {
    let date = new Date(timestamp);
    return date2String(date, format);
}

export function parseString2Date(ps, format) {
    let result = new Date(),
        yyyy,
        MM,
        dd,
        hh,
        mm,
        ss;
    format = format ? format : dateFormats.FULL_DATE;
    switch (format) {
        case dateFormats.SHORT_DATE:
            yyyy = ps.substring(0, 4);
            MM = ps.substring(5, 7);
            dd = ps.substring(8, 10);
            result.setFullYear(parseInt(yyyy));
            result.setMonth(parseInt(MM) - 1);
            result.setDate(parseInt(dd));
            result.setHours(0);
            result.setMinutes(0);
            result.setSeconds(0);
            result.setMilliseconds(0);
            break;
        case dateFormats.LONG_DATE:
            yyyy = ps.substring(0, 4);
            MM = ps.substring(5, 7);
            dd = ps.substring(8, 10);
            hh = ps.substring(11, 13);
            mm = ps.substring(14, 16);
            result.setFullYear(parseInt(yyyy));
            result.setMonth(parseInt(MM) - 1);
            result.setDate(parseInt(dd));
            result.setHours(parseInt(hh));
            result.setMinutes(parseInt(mm));
            result.setSeconds(0);
            result.setMilliseconds(0);
            break;
        case dateFormats.FULL_DATE:
            yyyy = ps.substring(0, 4);
            MM = ps.substring(5, 7);
            dd = ps.substring(8, 10);
            hh = ps.substring(11, 13);
            mm = ps.substring(14, 16);
            ss = ps.substring(17, 19);
            result.setFullYear(parseInt(yyyy));
            result.setMonth(parseInt(MM) - 1);
            result.setDate(parseInt(dd));
            result.setHours(parseInt(hh));
            result.setMinutes(parseInt(mm));
            result.setSeconds(parseInt(ss));
            result.setMilliseconds(0);
            break;
        default:
        // do nothing
    }
    return result;
}

export function parseString2Timestamp(ps, format) {
    let date = parseString2Date(ps, format);
    return date ? date.getTime() : null;
}

/**
 * 时间格式化
 * @params "09:12"
 * return "09小时12分钟"
 **/
export function timeFormat(time) {
    let timeArr = time.split(":");
    if (timeArr[0] == 0) {
        return timeArr[1] + "分钟";
    } else if (timeArr[1] == 0) {
        return timeArr[0] + "小时";
    } else {
        return timeArr[0] + "小时" + timeArr[1] + "分钟";
    }
}


//标准时间 -- 时间戳
export function time2Timestamp(date) {
    let arr = date.replace(/ |:/g, '-').split('-');
    let newDate = new Date(Date.UTC.apply(null, arr));
    return newDate.getTime();
}

/*
 * 列车/飞机 行驶时间计算
 * @params 起始时间戳 终止时间戳
 * return "09:09"
 * */
export function timeDuration(startTimestamp, endTimestamp) {
    var startDate = new Date(startTimestamp),
        endDate = new Date(endTimestamp),
        totalMinutes = (endDate - startDate) / (1000 * 60),
        duration;
    var hours = parseInt(totalMinutes / 60) < 10 ? "0" + parseInt(totalMinutes / 60) : parseInt(totalMinutes / 60);
    var minutes = Math.round(((totalMinutes / 60).toFixed(2) - hours) * 60) < 10 ? "0" + Math.round(((totalMinutes / 60).toFixed(2) - hours) * 60) : Math.round(((totalMinutes / 60).toFixed(2) - hours) * 60);
    duration = hours + ':' + minutes;
    return duration;
}

/*
 * 价格格式化 Function
 * @param    price           float    价格
 * @param    NumberOfDecimal number   精确位数
 * @param    unit            string   单位
 * return                   string
 * */
export function formatPrice(price, NumberOfDecimal, unit) {
    if (typeof(NumberOfDecimal) == "undefined") {
        NumberOfDecimal = 2;
    }
    if (typeof(unit) == "undefined") {
        return price.toFixed(NumberOfDecimal).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }
    return price.toFixed(NumberOfDecimal).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + unit;
}

/*
 * 飞行时间计算
 * @param startTimestamp 出发时间戳
 * @param endTimestamp   到达时间戳
 * return 3小时20分钟
 * */
export function countDurationForTimestamp(startTimestamp, endTimestamp) {
    var startDate = new Date(startTimestamp),
        endDate = new Date(endTimestamp),
        totalMinutes = (endDate - startDate) / (1000 * 60),
        duration;
    var hours = parseInt(totalMinutes / 60) < 10 ? "0" + parseInt(totalMinutes / 60) : parseInt(totalMinutes / 60);
    var minutes = Math.round(((totalMinutes / 60).toFixed(2) - hours) * 60) < 10 ? "0" + Math.round(((totalMinutes / 60).toFixed(2) - hours) * 60) : Math.round(((totalMinutes / 60).toFixed(2) - hours) * 60);
    duration = hours + ':' + minutes;
    return duration;
    var hours = parseInt(totalMinutes / 60);
    var minutes = Math.round(((totalMinutes / 60).toFixed(2) - hours) * 60);
    duration = hours + '小时' + minutes + '分钟';
    return duration;
}

/*
 * 折扣格式化
 * 格式化前 @param discount "0.5"
 * 格式化后 "5折"
 * */
export function discountFormat(discount) {
    if (discount < 1) {
        switch (typeof(discount)) {
            case "number":
                return discount.toString().split(".")[1] + "折";
                break;
            case "string":
                return discount.split(".")[1] + "折";
                break;
            default:
                return discount.toString().split(".")[1] + "折";
        }
    } else {
        return (discount * 10).toString() + "折";
    }
}

/*
 * 间夜计算
 * @param checkIn 入住日期
 * @param checkOut 离店日期
 * @param roomCount 入住人数
 * return 间夜 (离店日期 - 入住日期) * 入住人数
 * */
function getDaysInterval(checkIn, checkOut, roomCount) {
    let newDateStart = new Date(checkIn);
    let newDateEnd = new Date(checkOut);
    let daysInterval;
    if (newDateEnd <= newDateStart) {
        alert("离店日期必须大于入住日期!");
        return;
    }
    daysInterval = parseInt(Math.abs(newDateEnd - newDateStart) / 1000 / 60 / 60 / 24);
    if (typeof roomCount == "undefined") {
        return daysInterval;
    } else {
        return daysInterval * roomCount;
    }
}

export function getRealParams(data) {
    let params = {};
    for(let p in data) {
        if(data[p] != null) {
            params[p] = data[p];
        }
    }
    return params;
}