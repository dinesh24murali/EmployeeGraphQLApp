// This file contains all the entity objects needed
class Employee {
    constructor(id, name, desig, sex, salary, dob) {
        this._id = id;
        this.name = name;
        this.desig = desig;
        this.sex = sex;
        this.salary = salary;
        this.dob = dob;
    }
}

class EmployeeInput {
    constructor(name, desig, sex, salary, dob) {
        this.name = name;
        this.desig = desig;
        this.sex = sex;
        this.salary = salary;
        this.dob = dob;
    }
}

class QueryStatus {
    constructor(error, message) {
        this.error = error;
        this.message = message;
    }
}

module.exports = { Employee: Employee, QueryStatus: QueryStatus };