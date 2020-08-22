const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();
process.env.PORT=5000;
const app = express();
const port = process.env.PORT||8080;
console.log("port from server: ", process.env.PORT)


app.use(cors());
app.use(express.json());

const URI=process.env.MONGODB_ENV||'mongodb+srv://harshit:2bpJhDewafbfhbJ@v1-olhzv.mongodb.net/exersise-app?retryWrites=true&w=majority';
try {
mongoose.connect(URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
} catch(err) {
  console.log(err)
}
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');


if(process.env.NODE_ENV == 'production'){
  app.use(express.static('client/build'));

  app.get('/', (req,res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
  
}

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
