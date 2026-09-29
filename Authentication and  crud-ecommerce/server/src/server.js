import app from "../src/app/app.js"
import connectDb from "./config/db.config.js"

await connectDb()

const port = 3000

app.listen(port , ()=>{

    console.log(`server is running on port ${port}`)

})