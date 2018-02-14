const mongoClient = require('mongodb').MongoClient;
var Promise = require('promise');
var EntityObj = require('./Models/EntityObjects');

// This class is used to handle all the database related operations
class EmployeeDatabaseHandler {

    constructor() { }
    /*
    * function used to get all avalilable records from database
    */
    getEmployees() {

        return new Promise(function (resolve, reject) {

            mongoClient.connect("mongodb://admin:admin@127.0.0.1/Employee", function (err, db) {

                db.collection('EmployeeTab').find().toArray().then(function (result) {
                    resolve(result);
                });

                db.close();
            });
        });
    }
    /*
    * function used to get an employee record based on id
    * {id} contains the unique identifier need to fetch record
    */
    getEmployee(id) {

        return new Promise(function (resolve, reject) {

            mongoClient.connect("mongodb://admin:admin@127.0.0.1/Employee", function (err, db) {

                db.collection('EmployeeTab').find({ "_id": id.id }).toArray(function (err, result) {
                    resolve(result[0]);
                });

                db.close();
            });
        });
    }
    /*
    * function used to get the update records
    * {input} contains the record information needed to update
    */
    updateEmployee(record) {
        return new Promise(function (resolve, reject) {

            mongoClient.connect("mongodb://admin:admin@127.0.0.1/Employee", function (err, db) {
                var date = (record.dob != "" || record.dob != undefined || record.dob != null) ? new Date(record.dob) : new Date();

                db.collection('EmployeeTab')
                    .update({
                        "_id": record._id
                    },
                        {
                            "name": record.name,
                            "desig": record.desig,
                            "sex": record.sex,
                            "salary": record.salary,
                            "dob": date
                        });
                resolve(new EntityObj.QueryStatus(false, ""));

                db.close();
            });
        });
    }
    /*
    * function used to delete a record
    * {id} contains the unique identifier of the record needed to delete
    */
    deleteEmployee(id) {
        return new Promise(function (resolve, reject) {

            mongoClient.connect("mongodb://admin:admin@127.0.0.1/Employee", function (err, db) {

                db.collection('EmployeeTab').deleteOne({ "_id": id });
                resolve(new EntityObj.QueryStatus(false, ""));
                db.close();
            });
        });
    }
    /*
    * function used to uploaded records
    * {input} contains the record need to create
    */
    uploadEmployees(records) {
        return new Promise(function (resolve, reject) {

            mongoClient.connect("mongodb://admin:admin@127.0.0.1/Employee", function (err, db) {
                db.collection('EmployeeTab').insert(records, { ordered: false });
                resolve(new EntityObj.QueryStatus(false, ""));
                db.close();
            });
        });
    }
}

module.exports = new EmployeeDatabaseHandler();