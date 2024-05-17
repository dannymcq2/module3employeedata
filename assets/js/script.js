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
    if (firstName === '') {
      break;
    }
    if (firstName === null) {
      continue;
    }
    const lastName = prompt("Enter employee's last name:");
    if (lastName === '') {
      break;
    }
    if (lastName === null) {
      continue;
    }
    let salary;
    while (true) {
      const salaryInput = prompt("Enter employee's salary:");
      if (salaryInput === '') {
        break;
      }
      if (salaryInput === null) {
        continue;
      }
      salary = parseInt(salaryInput);
      if (!isNaN(salary) && salary >= 0) {
        break;
      }
    }
    employees.push({ firstName, lastName, salary });
    const continueAdding = confirm("Do you want to add another employee?");
    if (!continueAdding) {
      addEmployee = false;
    }
  }
  return employees;
};
// Display the average salary
const displayAverageSalary = function(employeesArray) {
  const totalSalary = employeesArray.reduce((acc, curr) => acc + curr.salary, 0);
  const averageSalary = totalSalary / employeesArray.length;
  console.log(`The average employee salary between our ${employeesArray.length} employee(s) is $${averageSalary.toFixed(2)}.`);
};
// Select a random employee
const getRandomEmployee = function(employeesArray) {
  const randomIndex = Math.floor(Math.random() * employeesArray.length);
  const randomEmployee = employeesArray[randomIndex];
  console.log(`Congratulations to ${randomEmployee.firstName}, our random drawing winner!`);
};
addEmployeesBtn.addEventListener('click', function() {
  const employees = collectEmployees();
  trackEmployeeData(employees);
});
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
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });
    newTableRow.append(salaryCell);
    employeeTable.append(newTableRow);
  }
};
const trackEmployeeData = function(employees) {
  console.table(employees);
  displayAverageSalary(employees);
  console.log('==============================');
  getRandomEmployee(employees);
  employees.sort(function(a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });
  displayEmployees(employees);
};
// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
