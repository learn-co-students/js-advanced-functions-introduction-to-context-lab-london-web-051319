// Your code here
function createEmployeeRecord(data) {
  return {
    firstName: data[0],
    familyName: data[1],
    title: data[2],
    payPerHour: data[3],
    timeInEvents: [],
    timeOutEvents:[]
  }
}

function createEmployees(data) {
  let arr = [];
  for (let employee of data) {
    arr.push(createEmployeeRecord(employee));
  }
  return arr;
}

function createTimeInEvent(record, time) {
    let obj = {
      type: "TimeIn",
      hour: parseInt(time.split(" ")[1]),
      date: time.split(" ")[0]
    };
    record.timeInEvents.push(obj);
    return record;
}

function createTimeOutEvent(record, time) {
  let obj = {
    type: "TimeOut",
    hour: parseInt(time.split(" ")[1]),
    date: time.split(" ")[0]
  };
  record.timeOutEvents.push(obj);
  return record;
}

function hoursWorkedOnDate(record, date) {
  let timeInObj = record.timeInEvents.find(ob => ob.date === date);
  let timeOutObj = record.timeOutEvents.find(ob => ob.date === date);

  let hourIn = timeInObj.hour;
  let hourOut = timeOutObj.hour;

  let hoursWorked = (hourOut - hourIn) / 100;
  return hoursWorked;
}

function wagesEarnedOnDate(record, date) {
  let earnings = record.payPerHour * hoursWorkedOnDate(record, date);
  return earnings;
}

function allWagesFor(obj) {
  let dateArr = obj.timeInEvents;
  let totalEarnings = 0;
  for (let data of dateArr) {
    let date = data.date;
    totalEarnings += wagesEarnedOnDate(obj, date);
  }
  return totalEarnings;
}

function createEmployeeRecords(arr) {
  let newArr = arr.map(data => createEmployeeRecord(data));
  return newArr;
}

function findEmployeebyFirstName(arr, name) {
  return arr.find(emp => emp.firstName === name);
}

function calculatePayroll(arr) {
  let sum = 0;
  for (let emp of arr) {
    sum += allWagesFor(emp);
  }

  return sum;
}
