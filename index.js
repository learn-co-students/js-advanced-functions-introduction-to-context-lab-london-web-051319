// Your code here
function createEmployeeRecord(array) {
  const employee = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  };
  return employee
}

function createEmployees(arrayOfArrays) {
  let employees = arrayOfArrays.map(array => createEmployeeRecord(array))
  return employees;
}

function createTimeInEvent(employee, dateStamp) {
  let newEvent = {}
  newEvent.type = "TimeIn";
  let time = dateStamp.split(" ")
  let date = time[0];
  newEvent["hour"] = parseInt(time[1]);
  newEvent["date"] = date;

  employee.timeInEvents.push(newEvent)
  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  let newEvent = {}
  newEvent.type = "TimeOut"
  let dateTime = dateStamp.split(" ")
  let time = dateTime[1];
  let date = dateTime[0];
  newEvent["hour"] = parseInt(time);
  newEvent["date"] = date;

  employee.timeOutEvents.push(newEvent);

  return employee;
}

function hoursWorkedOnDate(employee, date) {
  const selectDateIn = employee.timeInEvents.find(obj => obj.date == date);
  const selectDateOut = employee.timeOutEvents.find(obj => obj.date == date);

  let hoursWorked = ((selectDateOut.hour) - (selectDateIn.hour))/100

  return hoursWorked;
}

function wagesEarnedOnDate (employee, date) {
  let hours = hoursWorkedOnDate(employee, date)
  let pay = hours * employee.payPerHour;
  return pay;
}

function allWagesFor(employee) {
  let arrayOfDates = employee.timeInEvents.map(event => event.date);

  let wagesForDates = arrayOfDates.map(date => wagesEarnedOnDate(employee, date));

  let totalWages = wagesForDates.reduce((acc, cur)  => { return acc + cur; })

  return totalWages;
}

function createEmployeeRecords(array) {
  return array.map(createEmployeeRecord);
}

function findEmployeebyFirstName(srcArray, name){
  let found;
  srcArray.filter(employee => {
    if (employee.firstName == name) {
      found = employee;
    }
  })
  return found;
};


function calculatePayroll(employees) {
  let wagesArray = employees.map(allWagesFor)
  let total = wagesArray.reduce((acc, num) => {return acc + num})

  return total;
}
