const inquirer = require('inquirer');
const db = require('../db/connection');
const cTable = require('console.table');

const viewDepartments = function() {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return; 
        }
        console.table(result);
    })
};

const viewAllRoles = function() {
    const sql = `SELECT * FROM role`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(result);
    })
};

const viewAllEmployees = function() {
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, result ) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(result);
    })
};

const tracker = function() {
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
            'Update an Employee Role'
        ]
    }).then(answer => {
        console.log(answer);
        if (answer.choice === 'View All Departments') {
            viewDepartments();
        }
        if (answer.choice === 'View All Roles') {
            viewAllRoles();
        }
        if (answer.choice === 'View All Employees')
            viewAllEmployees();
    });
};

module.exports = tracker;