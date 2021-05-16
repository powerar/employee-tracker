const inquirer = require('inquirer');
const db = require('../db/connection');
const cTable = require('console.table');

const viewDepartments = function () {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(result);
  });
};

const viewAllRoles = function () {
  const sql = `SELECT * FROM role`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(result);
  });
};

const viewAllEmployees = function () {
  const sql = `SELECT * FROM employee`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(result);
  });
};

const addDepartment = function (departmentName) {
  const sql = `INSERT INTO department (name) VALUES (?)`;
  const name = departmentName;
  db.promise()
    .query(sql, name, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(result);
    })
    .then(viewDepartments());
};

const addRole = function (role) {
  const getDepartment = `SELECT id FROM department WHERE name LIKE ?`;
  const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
  const departmentId = db.promise()
    .query(getDepartment, '%' + role.roleDepartment + '%', (err) => {
      if (err) {
        console.log(err);
        return;
      }
    });

  departmentId.then((data) => {
    let id = data[0][0].id;
    db.promise()
      .query(sql, [role.roleTitle, role.salary, id], (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(result);
      })
      .then(viewAllRoles());
  });
};

const getRole = function(employee) {
  const sql = `SELECT id FROM role WHERE title LIKE ?`;
  let roleId = db.promise().query(sql, `%${employee.role}%`, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
    });

  roleId.then(data => {
    roleId = data[0][0].id;
  });

  return roleId;
};

const getManager = function(employee) {
  const sql = `SELECT id FROM employee WHERE last_name LIKE ?`;
  let managerId = db.promise().query(sql, `%${employee.manager}%`, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
    });
    
    managerId.then(data => {
      managerId = data[0][0].id;
    });

    return managerId;
}

const addEmployee = async function(employee) {
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
  let roleId = await getRole(employee);
  let managerId = await getManager(employee);

  console.log(roleId);
  console.log(managerId);
  
  db.promise().query(sql, [employee.firstName, employee.lastName, roleId[0][0].id, managerId[0][0].id], (err, result) => {    
      if (err) {
        console.log(err);
        return;
      }
      console.log(result);
    })
    .then(viewAllEmployees());
};

const tracker = function () {
  inquirer
    .prompt({
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update an Employee Role',
      ],
    })
    .then((answer) => {
      console.log(answer);
      if (answer.choice === 'View All Departments') {
        viewDepartments();
      }
      if (answer.choice === 'View All Roles') {
        viewAllRoles();
      }
      if (answer.choice === 'View All Employees') {
        viewAllEmployees();
      }
      if (answer.choice === 'Add a Department') {
        inquirer
          .prompt({
            type: 'input',
            name: 'departmentName',
            message: 'Please enter the department name:',
          })
          .then((answer) => {
            console.log(answer);
            addDepartment(answer.departmentName);
          });
      }
      if (answer.choice === 'Add a Role') {
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'roleTitle',
              message: 'Please enter the role title:',
            },
            {
              type: 'input',
              name: 'salary',
              message: 'Please enter the role salary:',
            },
            {
              type: 'input',
              name: 'roleDepartment',
              message: 'Please enter the role department:',
            },
          ])
          .then((answer) => {
            console.log(answer);
            addRole(answer);
          });
      }
      if (answer.choice === 'Add an Employee') {
        inquirer.prompt([
          {
            type: 'input',
            name: 'firstName',
            message: 'Please enter the employee first name:'
          },
          {
            type: 'input',
            name: 'lastName',
            message: 'Please enter the employee last name:'
          },
          {
            type: 'input',
            name: 'role',
            message: 'Please enter the employee role:'
          },
          {
            type: 'input',
            name: 'manager',
            message: 'Please enter the employee manager last name:'
          }
        ]).then(answer => {
          addEmployee(answer);
        })
      }
    });
};

module.exports = tracker;
