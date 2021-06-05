require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken')
const cors = require('cors')
const mongoose = require('mongoose')
const getAccessToken = require('./scripts/getAccessToken')

const app = express()

app.use(cors())
app.use(express.json());

const PORT = process.env.PORT || 5001

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify: false })
  .then(()=>console.log('Mongo connected'))
  .catch(err=>console.log(err))

app.use(getAccessToken)

app.use('/user', require('./routes/user/user'))
app.use('/applets', require('./routes/applets'))

let server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
