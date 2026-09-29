import express from "express"
import authRouter from "../routes/auth.routes.js" 
import cookieParser from "cookie-parser"
import productRoutes from "../routes/product.routes.js"

function configureApp(app) {
	app.use(express.json()) ;

	app.use(cookieParser())

	app.use("/api/auth" ,  authRouter  )

	app.use("/api/products" , productRoutes)

	return app
}

export default configureApp









