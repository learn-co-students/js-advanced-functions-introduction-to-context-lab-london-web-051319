// Your code here
const createEmployeeRecord = arr => ({
  firstName: arr[0],
  familyName: arr[1],
  title: arr[2],
  payPerHour: arr[3],
  timeInEvents: [],
  timeOutEvents: []
})

const createEmployees = arr => arr.map(createEmployeeRecord);

const createTimeInEvent = (record, string) => {
  const [date, hour] = string.split(" ")
  record.timeInEvents.push({type: "TimeIn",
                            date: date,
                            hour: ~~hour});
  return record
}

const createTimeOutEvent = (record, string) => {
  const [date, hour] = string.split(" ")

  record.timeOutEvents.push({type: "TimeOut",
                            date: date,
                            hour: ~~hour});
  return record
}

const hoursWorkedOnDate = (record, dString) =>

{
  return (record.timeOutEvents.find(({date}) => date === dString).hour - record.timeInEvents.find(({date}) => date === dString).hour) / 100;
}

const wagesEarnedOnDate = (record, date) => hoursWorkedOnDate(record, date) * record.payPerHour;

const allWagesFor = record => record.timeOutEvents.reduce((sum, e) =>  sum +  hoursWorkedOnDate(record, e.date), 0) * record.payPerHour;


const calculatePayroll = arr => arr.reduce((sum, e) => sum + allWagesFor(e), 0);

const createEmployeeRecords = createEmployees;

const findEmployeebyFirstName = (employees, first) => employees.find(({firstName}) => firstName === first);
