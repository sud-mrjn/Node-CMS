const express=require('express');
const app=express();
const path =require('path');
const exphbs=require('express-handlebars');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

mongoose.connect('mongodb://localhost:27017/bookstore_cms')
.then((db)=>{
  console.log('mongo connected');
}).catch(error=>console.error(error));




app.use(express.static(path.join(__dirname,'public')));

//set view engine

app.engine('handlebars',exphbs({defaultLayout:'home'}));
app.set('view engine','handlebars');
//Body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Load route

const home=require('./routes/home/index');
const admin=require('./routes/admin/index');
const posts=require('./routes/admin/posts');

//Use Routes

app.use('/',home);
app.use('/admin',admin);
app.use('/admin/posts', posts);


app.listen(4500,()=>{
  console.log(`listening on port 4500`);
});
