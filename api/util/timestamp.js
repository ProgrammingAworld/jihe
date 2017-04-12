moduels.exports = function() {
    var now = new Date();
    var year = now.getFullYear().toString(),
        month = (now.getMonth() + 1).toString(),
        date = now.getDate().toString(),
        hour = now.getHours().toString(),
        minute = now.getMinutes().toString(),
        second = now.getSeconds().toString();
    month = month.length < 2 ? '0' + month : month;
    date = date.length < 2 ? '0' + date : date;
    hour = hour.length < 2 ? '0' + hour : hour;
    minute = minute.length < 2 ? '0' + minute : minute;
    second = second.length < 2 ? '0' + second : second;
    return year + month + date + hour + minute + second;
}