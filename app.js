const  mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require('path');
const fileUpload = require('express-fileupload');
// const covdata = require('./india/api.json');
// console.log(covdata);
const router = express.Router();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');//“cookie-parser” is Express middleware. It is enabled for all routes through using the App.use() function.
const session = require('express-session')

dotenv.config({path:'./.env'});
app.set('veiw engine' , 'hbs');
const pathDiretory = path.join(__dirname , './public')
console.log(__dirname);
app.use(express.static(pathDiretory));//To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
app.use(express.urlencoded({extended:false}));//This is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(fileUpload());
app.use(express.json());//This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(cookieParser());
app.use(session({
  key:'user_id',
  secret: 'max',
  resave: false,
  saveUninitialized: false,
  cookie:{
    expires:60000
  }
  }));

const  db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database:process.env.DATABASE
});
db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use('/' , require('./routes/pages'));
app.use('/auth' , require('./routes/auth'));

app.listen(5004 , ()=>{
  console.log('Server is running on the port 5004.....');
});