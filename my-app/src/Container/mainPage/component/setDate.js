export function oneDay() {
  // １日前
  var date = new Date();
  date.setDate(date.getDate() - 1);
  return date;
}
export function oneWeek() {
  // 1 週刊
  var date = new Date();
  date.setDate(date.getDate() - 1);
  return date;
}
export function oneMonth() {
  // 1 週刊
  var date = new Date();
  date.setMonth(date.getMonth() - 1);
  return date;
}
