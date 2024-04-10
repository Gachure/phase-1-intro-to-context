// Your code here
// index.js

// Function to create an employee record
function createEmployeeRecord(array) {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Function to process an array of arrays into an array of employee records
  function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
  }
  
  // Function to add a timeIn event Object to an employee's record of timeInEvents
  function createTimeInEvent(employeeRecord, dateTimeString) {
    let [date, hour] = dateTimeString.split(" ");
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      date: date,
      hour: parseInt(hour, 10)
    });
    return employeeRecord;
  }
  
  // Function to add a timeOut event Object to an employee's record of timeOutEvents
  function createTimeOutEvent(employeeRecord, dateTimeString) {
    let [date, hour] = dateTimeString.split(" ");
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      date: date,
      hour: parseInt(hour, 10)
    });
    return employeeRecord;
  }
  
  // Function to calculate the hours worked on a specific date
  function hoursWorkedOnDate(employeeRecord, date) {
    let timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    let timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  // Function to calculate the wages earned on a specific date
  function wagesEarnedOnDate(employeeRecord, date) {
    let hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
  }
  
  // Function to calculate all wages for an employee
  function allWagesFor(employeeRecord) {
    return employeeRecord.timeInEvents.reduce((totalWages, timeInEvent) => {
      let date = timeInEvent.date;
      return totalWages + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
  }
  
  // Function to calculate payroll for an array of employees
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employeeRecord) => {
      return totalPayroll + allWagesFor(employeeRecord);
    }, 0);
  }
  
