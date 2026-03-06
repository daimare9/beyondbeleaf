const mongoose = require('mongoose');

const uri = "mongodb+srv://beyondbeleaf:LSDKfjo20394sldkfmlaowkd@cluster0.pnxoh9c.mongodb.net/beyondbeleaf?retryWrites=true&w=majority";

mongoose.connect(uri)
    .then(() => {
        console.log("Connected to MongoDB successfully!");
        process.exit(0);
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });
