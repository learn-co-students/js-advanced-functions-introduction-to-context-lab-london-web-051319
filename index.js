  function createEmployeeRecord(employee_details){
    const employee = {};
    [employee.firstName, employee.familyName, employee.title, employee.payPerHour] = employee_details;
    employee.timeInEvents = [];
    employee.timeOutEvents = [];
    return employee;
  }

  function createEmployees(employees) {
    return employees.map(createEmployeeRecord);
  }

  function createEmployeeRecords(employees) {
    return employees.map(createEmployeeRecord);
  }

  function createTimeEvent(date_stamp, type) {
    const event = {
      type: type,
      date: date_stamp.split(" ")[0],
      hour: parseInt(date_stamp.split(" ")[1])
    };
    return event;
  }

  function createTimeInEvent(employee, date_stamp) {
    const event = createTimeEvent(date_stamp, "TimeIn");
    employee.timeInEvents.push(event);
    return employee;
  }

  function createTimeOutEvent(employee, date_stamp) {
    const event = createTimeEvent(date_stamp, "TimeOut");
    employee.timeOutEvents.push(event);
    return employee;
  }

  function hoursWorkedOnDate(employee, date) {
    for (let i=0; i < employee.timeInEvents.length; i++) {
      if (employee.timeInEvents[i].date === date) {
        const timeIn = employee.timeInEvents[i].hour;
        const timeOut = employee.timeOutEvents[i].hour;
        return (timeOut - timeIn) / 100;
      }
    }
  }

  function wagesEarnedOnDate(employee, date) {
    return (employee.payPerHour * hoursWorkedOnDate(employee, date));
  }

function allWagesFor(employee) {
  return employee.timeInEvents.map(event => event.date).map(date => {
    return wagesEarnedOnDate(employee,date);
  }).reduce((total, amount) => total + amount);
}

function findEmployeebyFirstName(employee_records, firstName) {
  return employee_records.find(employee => employee.firstName === firstName)
}

function calculatePayroll(employee_records) {
  return employee_records.map(employee => allWagesFor(employee)).reduce((total, wages) => total + wages)
}