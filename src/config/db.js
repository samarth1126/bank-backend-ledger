const mongoose = require("mongoose")




function connectToDB(){
    console.log("MONGO_URI:", process.env.MONGO_URI)
    
    if (!process.env.MONGO_URI) {
        console.error("ERROR: MONGO_URI is not defined in .env file")
        process.exit(1)
    }
    
    mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    })
    .then(()=>{
        console.log("✓ Server is connected to DB")
    })
    .catch(err=>{
        console.error("✗ Error connecting to DB:", err.message)
        console.error("  Make sure:")
        console.error("  1. Your IP is whitelisted in MongoDB Atlas")
        console.error("  2. Credentials are correct")
        console.error("  3. Cluster is not paused")
        process.exit(1)
    })
}



module.exports=connectToDB