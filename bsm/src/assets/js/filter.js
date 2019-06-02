//时间格式化
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
exports.timeFormate = (val,monthDay) => {
	if (val == null) return '--'
  var date = new Date(val)
  var year = date.getFullYear()
  var month = formatNumber(date.getMonth() + 1)
  var day = formatNumber(date.getDate())
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  var time = [hour, minute, second].map(formatNumber).join(':')
  if (monthDay) {
    return year + '-' + month + '-' + day 
  } else {
    return year + '-' + month + '-' + day+' '+time
  }
}