const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')
const https = require('https');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT||5000;
app.set(PORT, () => console.log(`Server is listening on port ${PORT}...`));
https.createServer(app).listen(80);
https.createServer(app).listen(443);

app.use(cors());
app.use(express.json());

try {
mongoose.connect(process.env.MONGODB_ENV, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
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

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));

  app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
  
}

// app.listen(port, () => {
//     console.log(`Server is running on port: ${port}`);
// });