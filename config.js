const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/collegeadmission');
// mongoose.connect('mongodb://127.0.0.1:27017/collegeadmission');

// mongoose.connect('mongodb://localhost:27017/collegeadmission');

// const connection = mongoose.connection;
// connection.on('connected', () => {
//   console.log('MongoDB database connection established successfully');
// });

//Note for connect database from mongo db compass
//mongoose.connect('mongodb://0.0.0.0:27017/collegeadmission')
//Note for connect database from mongo db cluster
mongoose.connect('mongodb+srv://itscpankaj:RJpuZkwHWoLI5Ov6@cluster0.gwhz0pz.mongodb.net/collegeadmission')

.then(() => console.log('Mongodb Connected Successfully'))

.catch((err) => { console.error(err); });




