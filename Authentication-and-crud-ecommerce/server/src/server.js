import express from "express"
import configureApp from "./app/app.js"
import connectDb from "./config/db.config.js"

const app = configureApp(express())

await connectDb()

if (!process.env.VERCEL) {
    const port = process.env.PORT || 3000

    app.listen(port , ()=>{

        console.log(`server is running on port ${port}`)

    })
}

export default app