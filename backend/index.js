const express = require('express')
const bodyParser = require('body-parser')

// import user from './routes/users';
// import auth from './routes/auth'
// import event from './routes/event'
const user = require('./routes/users')
const auth = require('./routes/auth')


let app = express();

app.use(bodyParser.json());
app.use('/api/users', user)
app.use('/api/auth', auth)
// app.use('/api/events', event)
// require("./routes/billing")(app); // for stripe api
app.get('/', (req,res)=>{
    res.send('Your fucking capstone backend is running la')
})

app.listen(6060, ()=>{console.log('Capstone Backend API server Running on localhost:6060')})