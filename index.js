const inquirer = require('inquirer');
const db = require('./db/connection');

const start = () => {
inquirer.prompt([{
    message: 'What would you like to do?',
    type: 'list',
    choices:[
        'Add Department',
        'Add Employee',
        'Add Role',
        'View Departments',
        'View Roles',
        'View Employees',
        'Update Employee Role',
    ],
    name: 'choice'
}])
.then(answer => {
    switch(answer.choice) {
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
                    case 'View Employees':
                    viewEmployees()
                    break
                    case 'Update Empoloyee Role':
    }
})}

const addDepartment = () => {
    inquirer.prompt([
    {
        message:'What is the name of the department you would like to add?',
        type: 'input',
        name:'name'
    }]) .then(data => {
        db.promise().query('INSERT INTO departments SET ?',data)
        .then(data => {
            console.log('department has been inserted')
            start()
        })

    })
}

const addRole = () => {
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
    .then(data => {
        db.promise().query('INSERT INTO roles SET ?',data)
        .then(data => {
            console.log('role has been inserted')
            start()
        })

    })
    }

const addEmployee = () => {
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
    
])
.then(data => {
    db.promise().query('INSERT INTO employees SET ?',data)
    .then(data => {
        console.log('employee has been inserted')
        start()
    })

})}

    
const updateEmployeeRole =() => {
    db.promise().query('SELECT title, department_id FROM roles') 
    .then(roleData => {
        const roleChoices= roleData [0].map(role => ({name:role.title, value: role.department_id}) )
        inquirer.prompt([{
            message:'what is the id of the employee you would like to update',
            type: 'input',
            name:'id'
        },
        {
            message:'what is the id of the role that the employee should be updated to?',
            type: 'list',
            name: 'role',
            choices: roleChoices
        }])

    })
}

const viewDepartments =() => {
    console.log('viewDepartments')
    db.promise().query ('SELECT * FROM departments;')
    .then(departmentData => {
        console.table(departmentData[0])
        setTimeout(start(), 3000)
    })
}
const viewEmployees =() => {
    console.log('viewEmployees')
    db.promise().query ('SELECT * FROM employees;')
    .then(employeeData => {
        console.table(employeeData[0])
        setTimeout(start(), 3000)
    })
}

const viewRoles =() => {
    console.log('viewRoles')
    db.promise().query ('SELECT * FROM roles;')
    .then(roleData => {
        console.table(roleData[0])
        setTimeout(start(), 3000)
    })
  
}

start()