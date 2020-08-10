
const mongoose = require('mongoose');


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose
    .connect(process.env.MONGODB_URL, options)
    .then(() => console.log('mongoDB connected'))
    .catch(err => console.log(err.message))