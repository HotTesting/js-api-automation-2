let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/admin", { useNewUrlParser: true });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async function() {
    let users = db.collection("users")
    console.log("connected");
    
    // Query
    // let result = await users.find({'_id': "tYFRgHuBfo4BKyc5S"}).toArray()
    // console.log(result)  

    // DELETE
    users.deleteMany( { "test" : "hello world" } );

    // INSERT
    // await users.insert( { test: "hello world" } )

    let result2 = await users.find().toArray()
    console.log(result2)  

    await db.close()
});
