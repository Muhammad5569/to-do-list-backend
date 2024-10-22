const express = require('express')
const mongoose = require('mongoose')
const user = require('./routes/user')
const task = require('./routes/task')
const auth = require('./routes/auth')
const category = require('./routes/category')

const app = express()

const dbURI = 'mongodb://127.0.0.1:27017/task-pro';

// Establish a connection to MongoDB
mongoose.createConnection(dbURI)

const port = process.env.PORT || 3000
// var cors = require('cors');

app.use(express.json())
// app.use(cors())
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use('/api/users', user)
app.use('/api/auth', auth)
app.use('/api/tasks', task)
// app.use('/api/categories', category)


app.post('/user',(req,res)=>{
    console.log(req.body);
    res.send('Testing!')
})



app.listen(port, ()=>{
    console.log('Server running on port', port)
})