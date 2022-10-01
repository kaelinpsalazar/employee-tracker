const connection= require('./connection')


class DB {
    constructor(connection){
        this.connection=connection
    }
    findAllEmployees() {
        return this.connection.promise().query(
          "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary FROM employee LEFT JOIN role ON employee.role_id =role.id;"
        );
      }
    findAllRoles() {
        return this.connection.promise().query(
          "SELECT role.title, role.id, department.name AS departmentName, role.salary FROM role JOIN department ON role.department_id = department.id;"
        );
      }
    findAllDepartments() {
        return this.connection.promise().query(
          "SELECT * FROM department;"
          // "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
      }
    
}


module.exports= new DB(connection);