const inquirer = require('inquirer');

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
    });
};

module.exports = tracker;