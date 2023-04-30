const express = require('express');
const app = express();
const mongoose = require('mongoose');

const route = require('./routes/route');

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use('src/uploads' , express.static('uploads'))
require('dotenv').config();

mongoose.connect(`mongodb+srv://rahulkumar:A8K4HFFnpjfeY3Pl@cluster0.pchlfj0.mongodb.net/Task`, { useNewUrlParser: true }).then(() => console.log("MongoDb is connected"))
    .catch((err) => console.log(err));

app.use('/api/v3/app', route);

app.listen(process.env.PORT || 3000, () => {
    console.log('Express app runnin