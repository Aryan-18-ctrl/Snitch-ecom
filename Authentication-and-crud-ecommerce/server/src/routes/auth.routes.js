import express from "express" 
import { loginController, registerController ,getMeController ,refreshController, logoutController } from "../controllers/auth.controllers.js";
import { loginValidator, registerValidator  } from "../validator/auth.validator.js"; 
import { authenticate } from "../middleware/auth.middleware.js";

const  router = express.Router();

// @post  /api/auth/register

router.post("/register" ,registerValidator , registerController) 


// @post  /api/auth/login


router.post("/login" , loginValidator , loginController)



//@get /api/auth/me

router.get("/me" ,authenticate , getMeController )

//@post /pai/auth/refresh

router.post("/refresh", refreshController)

//@post /api/auth/logout 

router.post("/logout" , authenticate , logoutController)


export default router    