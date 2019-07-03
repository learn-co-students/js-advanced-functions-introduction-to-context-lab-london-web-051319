// Your code here

const createEmployeeRecord = (array) => {
   let record = {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
   }
   return record;
};

const createEmployees = (data) => {
   let records = [];
   for(let row of data) {
      records.push(createEmployeeRecord(row));
   }
   return records;
};

const createTimeInEvent = (record, time) => {
   let [date, timeValue] = time.split(' ');
   record.timeInEvents.push({
      type: "TimeIn",
      date: date,
      hour: parseInt(timeValue, 10)
   });
   return record;
};

const createTimeOutEvent = (record, time) => {
   let [date, timeValue] = time.split(' ');
   record.timeOutEvents.push({
      type: "TimeOut",
      date: date,
      hour: parseInt(timeValue, 10)
   });
   return record;
};

const hoursWorkedOnDate = (record, date)  => {
   let startTime = record.timeInEvents.find(event => event.date === date).hour;
   let endTime = record.timeOutEvents.find(event => event.date === date).hour;
   let hoursWorked = (endTime - startTime)/100;
   return hoursWorked;
};

const wagesEarnedOnDate = (record, date) => {
   let hoursWorked = hoursWorkedOnDate(record, date);
   let payRate = record.payPerHour;
   let dayPay = hoursWorked * payRate;
   return dayPay;
}

const allWagesFor = (record) => {
   let dates = [];
   let wages = [];
   dates = record.timeInEvents.map(element => element = element.date);
   for(let date of dates) {
      wagesEarnedOnDate(date).push(wages);
   };
   let salary = wages.reduce(function(e, memo) {e+memo});
   return salary;
}

   let record = {
      firstName: "Julius",
      familyName: "Caesar",
      title: "General",
      payPerHour: 1000,
      timeInEvents: [{
         type: "TimeIn",
         date: "44-03-15",
         hour: parseInt("0900", 10)
      },
      {
         type: "TimeIn",
         date: "44-03-14",
         hour: parseInt("0900", 10)
      }
   ],
      timeOutEvents: [{
         type: "TimeOut",
         date: "44-03-15",
         hour: parseInt("1100", 10)
      },
      {
         type: "TimeOut",
         date: "44-03-14",
         hour: parseInt("2100", 10)
      }]
   };