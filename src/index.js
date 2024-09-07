// require ("dotenv").config({path:'./env'})
import dotenv from "dotenv"


//you can write database connection in two ways but the preferred way is to write it in the db folder for better understanding
// const app=express()

// (async ()=>{
//     try {
//          await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//          app.on("Error",(error)=>{
//             console.log("Error",error)
//             throw error
//          })

//          app.listen(process.env.PORT,()=>{
//             console.log(`App is listening on port ${process.env.PORT}`)
//          })
//     } catch (error) {
//         console.error("Error:",error);
//         throw err
//     }

// })()

dotenv.config({
    path:'./env'
})


import connectDB from "./db/index.js";
connectDB()