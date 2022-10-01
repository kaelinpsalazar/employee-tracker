const inquirer = require('inquirer');
const table = require('console.table');
const mysql = require('mysql2');
const db = require('./db/connection');

const question = () => {
inquirer.prompt([{
    message: 'What would you like to do?',
    type: 'list',
    choices:[
        'Add Department',
        'Add Employee',
        'Add Role',
        'View Departments',
        'View Role',
        'View Employees',
        'Update Employee Role',
        'nevermind',
    ],
    name:'choice'
}])
.then(init => {
    switch(init.choice) {
        case 'Add Department':
            addDepartment()
            break
            case 'Add Role':
                addRole()
                break
                case 'Add Employee':
                    addEmployee()
                    break
                    case 'View Departments':
                    viewDepartments()
                    break
                    case 'View Roles':
                    viewRoles()
                    break
                    case 'view Employees':
                    viewEmployees()
                    break
                    case 'Update Empoloyee Role':
                    updateEmployeeRole()
                    break
                    case 'nevermind':
                    console.log('ok!')
    }
})}

const addDepartment = () => {
    console.log('you attempted to add a department')
    inquirer.prompt([
    {
        message:'What is the name of the department you would like to add?',
        type: 'input',
        name:'name'
    }])
    .then(department => {
        console.log(department)
        db.query('INSERT INTO departments SET ?', department, err => {
            if(err) {console.log(err)}
        })
        console.log('department added')
        question()


    })
}

const addRole = () => {
    console.log('you attempted to add a department')
    inquirer.prompt([
    {
        message:'What is the title of the Role you would like to add?',
        type: 'input',
        name:'title'
    },
    {
        message:'What is the salary of the Role you would like to add?',
        type: 'input',
        name:'salary'
    },
    {
        message:'What is the id of the Role you would like to add?',
        type: 'input',
        name:'department_id'
    }])
    .then(role => {
        console.log(role)
        db.query('INSERT INTO role SET ?', role, err => {
            if(err) {console.log(err)}
        })
        console.log('role added')
        question()


    })
}
const addEmployee = () => {
    console.log('you attempted to add a department')
    inquirer.prompt([
    {
        message:'What is the first name of the employee you would like to add?',
        type: 'input',
        name:'first_name'
    },
    {
        message:'What is the last name of the employee you would like to add?',
        type: 'input',
        name:'last_name'
    },
    {
        message:'What is the id of the employee you would like to add?',
        type: 'input',
        name:'role_id'
    },
{
    message: 'is the employee a manager?',
    type: 'list',
    choices: ['yes','no'],
    name: 'managerBoolean'

}])
    .then(employee => {
        console.log(employee)
        if (employee.managerBoolean === 'yes'){
            console.log('you tried to add a manager')
            delete employee.managerBoolean
            console.log(employee)
            db.query('INSERT INTO employee SET ?', employee, err => {
                if(err) {console.log(err)}
            })
            console.log('employee added')
            question()

        } else if (employee.managerBoolean ==='no') {
        }

    })
    
}

const updateEmployeeRole =() => {
    inquirer.prompt([{
        message:'what is the id of the employee you would like to update',
        type: 'input',
        name:'id'
    },
    {
        message:'what is the id of the role that the employee should be updated to?',
        type: 'input',
        name: 'role_id'
    }])
    .then(employee => {
        
        let newRole = {
            role_id:employee.role_id
        }
        db.query(`UPDATE employee SET ? WHERE id = ${employee.id}`, newRole, err => {
            if(err) {console.log(err)}
        })
        console.log('employee updated')
        question()
        

    })
}

question()