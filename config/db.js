// const mongoose = require('mongoose');

// // connection to mongoDB
// mongoose.connect('mongodb://127.0.0.1/Login-Auth')

// //Error Handling
// const db = mongoose.connection;
// db.on('error', console.error.bind(console,'error connecting to db'));
// db.once('open', () => { console.log('Successfully connected to the database')});

const mongoose = require('mongoose');
require("dotenv").config();

// cloud connection-Str
let cloudDB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

// mongoose.connect(process.env.DB_LOCAL, {
mongoose.connect(cloudDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
  console.log('DB connect success :)');
}).catch(() => {
  console.log('Something problem to connect DB !!!');
});
