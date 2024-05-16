// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');
const formContainer = document.querySelector('.form-container');
const EmployeeTable = document.querySelector('#employee-table');
let employees = [];

// Collect employee data
const collectEmployees = function() {
  let addEmployee = true;
  while (addEmployee) {
    const firstName = prompt("Enter employee's first name:");
    if (firstName === null || firstName.trim() === "") {
      break; 
    }
    const lastName = prompt("Enter employee's last name:");
    const salary = parseInt(prompt("Enter employee's salary:") || 0); 
    employees.push({ firstName, lastName, salary });
    const continueAdding = confirm("Do you want to add another employee?");
    if (!continueAdding) {
      addEmployee = false;
    }
  }
  return employees;
}

// Display the average salary
const displayAverageSalary = function(employeesArray) {
  const totalSalary = employeesArray.reduce((acc, curr) => acc + curr.salary, 0);
  const averageSalary = totalSalary / employeesArray.length;
  console.log(`Average Salary: $${averageSalary.toFixed(2)}`);
}

// Select a random employee
const getRandomEmployee = function(employeesArray) {
  const randomIndex = Math.floor(Math.random() * employeesArray.length);
  const randomEmployee = employeesArray[randomIndex];
  console.log(`Random Employee: ${randomEmployee.firstName} ${randomEmployee.lastName}`);
}

// Event listener for 'Add Employees' button click
addEmployeesBtn.addEventListener('click', function() {
  const employees = collectEmployees();
  trackEmployeeData(employees);
    if (employees.length > 0) {
    const averageSalary = calculateAverageSalary(employees);
    console.log(`The average employee salary between our ${employees.length} employee(s) is $${averageSalary.toFixed(2)}`);
  
    const randomEmployee = selectRandomEmployee(employees);
    console.log(`Congratulations to ${randomEmployee.firstName} ${randomEmployee.lastName}, our random drawing winner!`);
  } else {
    console.log("No employees added.");
  }
});

// Calculate average salary
const calculateAverageSalary = function(employeesArray) {
  const totalSalary = employeesArray.reduce((acc, curr) => acc + curr.salary, 0);
  const averageSalary = totalSalary / employeesArray.length;
  return averageSalary;
}

// Select random employee
const selectRandomEmployee = function(employeesArray) {
  const randomIndex = Math.floor(Math.random() * employeesArray.length);
  return employeesArray[randomIndex];
}

// Track employee data
const trackEmployeeData = function() {
  const employees = collectEmployees();

  console.table(employees);

  if (employees.length > 0) {
    const averageSalary = calculateAverageSalary(employees);
    console.log(`The average employee salary between our ${employees.length} employee(s) is $${averageSalary.toFixed(2)}`);

    const randomEmployee = selectRandomEmployee(employees);
    console.log(`Congratulations to ${randomEmployee.firstName} ${randomEmployee.lastName}, our random drawing winner!`);
  } else {
    console.log("No employees added.");
  }

  console.log('==============================');

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function() {
  const employees = collectEmployees();
  console.table(employees);
  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
