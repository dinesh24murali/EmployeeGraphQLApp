var express = require('express');
var graphqlHTTP = require('express-graphql');
var employeeHandler = require('./src/employee.js');

var app = express();

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});
app.use('/employee', graphqlHTTP({
  schema: employeeHandler.employeeSchema,
  rootValue: employeeHandler.employeeResolver,
  graphiql: true
}));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/employee');