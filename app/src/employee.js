var { buildSchema } = require('graphql');
var employeeDatabaseHandler = require('./employeeDatabaseHandler.js');
var uuid = require('uuid');

// This class implements the EmployeeHandler GraphQL type
class EmployeeHandler {
    constructor() { }
    /*
    * function used to get an employee record based on id
    * {id} contains the unique identifier need to fetch record
    */
    getEmployee(id) {
        return employeeDatabaseHandler.getEmployee(id).then(function (res) {
            return res;
        }, function (err) {
            console.log("Error: " + err);
        });
    }
    /*
    * function used to get all avalilable records from database
    */
    getEmployees() {
        return employeeDatabaseHandler.getEmployees().then(err => {
            return err;
        }, err => {
            console.log("Error: " + err);
        });
    }
}
// This class is used to handle all mutation operations
class EmployeeMutationHandler {
    constructor() { }
    /*
    * function used to get the update records
    * {input} contains the record information needed to update
    */
    updateEmployee({ input }) {
        return employeeDatabaseHandler.updateEmployee(input).then(res => {
            return res;
        }, err => {
            console.log("Error: " + err);
            return err;
        });
    }
    /*
    * function used to uploaded records
    * {input} contains the record need to create
    */
    uploadEmployees({ records }) {
        let uploadRecords = [];
        records.forEach(record => {
            var date = (record[4] != "" || record[4] != undefined || record[4] != null) ? new Date(record[4]) : new Date();
            uploadRecords.push({ _id: uuid(), name: record[0], desig: record[1], sex: record[2], salary: record[3], dob: date });
        });

        return employeeDatabaseHandler.uploadEmployees(uploadRecords).then(res => {
            return res;
        }, err => {
            console.log("Error: " + err);
            return err;
        });
    }
    /*
    * function used to delete a record
    * {id} contains the unique identifier of the record needed to delete
    */
    deleteEmployee({ id }) {
        return employeeDatabaseHandler.deleteEmployee(id).then(res => {
            return res;
        }, err => {
            console.log("Error: " + err);
            return err;
        });
    }
}
 // scheme needed for the graphQL to handle the request
var employeeSchema = buildSchema(`
  type QueryStatus {
      error: Boolean!
      message: String
  }

  type Employee {
    _id: String!
    name: String!
    desig: String!
    sex: String!
    salary: String!
    dob: String!
  }
  
  input EmployeeInput {
    _id: String!
    name: String!
    desig: String!
    sex: String!
    salary: String!
    dob: String!
  }

  type EmployeeHandler {
    getEmployee(id: String!):Employee
    getEmployees:[Employee]
  }
  
  type EmployeeMutationHandler {
    updateEmployee(input: EmployeeInput!): QueryStatus
    uploadEmployees(records: [[String!]]): QueryStatus
    deleteEmployee(id: String!): QueryStatus
  }

  type Mutation {
    handleEmployeeMutation: EmployeeMutationHandler
  }

  type Query {
    handleEmployees: EmployeeHandler
  }
`);

// Resolver need to handle the graphQL queries
var root = {
    handleEmployees: function () {
        return new EmployeeHandler();
    },
    handleEmployeeMutation: function () {
        return new EmployeeMutationHandler();
    }
};


module.exports = { employeeSchema: employeeSchema, employeeResolver: root };