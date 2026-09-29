import {body , validationResult} from "express-validator"




export const registerValidator = [
    body("email").exists().withMessage("Email is required").bail()
    .trim().notEmpty().withMessage("Email can't be empty").bail()
    .isEmail().withMessage("Please enter valid email").bail()
    .isString().withMessage("Email must  be in string format") ,

body("name").exists().withMessage("Name is required").bail()
.trim().notEmpty().withMessage("Name  can't be empty").bail()
.isString().withMessage("Name must be in string format").bail()
.isLength({min:3}).withMessage("Name should be atleast of 3 characters").bail(),

body("password").exists().withMessage("Password is required").bail()
.isLength({min:4 , max:8}).withMessage("Password should be atleast of 6 characters and maximum of 12 characters").bail()
.isAlphanumeric().withMessage("Password should be alphanumeric").bail(),

body("confirmpassword").exists().withMessage("Confirm Password is required").bail()
.isLength({min:4 , max:8}).withMessage("Confirm Password should be atleast of 6 characters and maximum of 12 characters").bail()
.custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error("Passwords do not match");
    }
    return true;
}),

(req,res , next)=>{

    const errors = validationResult(req)

    if(!errors.isEmpty()){
 
        return res.status(400).json({
            message:"Invalid Request",
            errors:errors.array()
        })

    }

    next()

}




]





export const loginValidator = [
  body('email')
    .exists().withMessage('Email is required').bail()
    .trim().notEmpty().withMessage("Email can't be empty").bail()
    .isString().withMessage('Email must be in string format').bail()
    .isEmail().withMessage('Invalid email format'),
    
  body('password')
    .exists().withMessage('Password is required').bail()
    .isLength({ min: 6, max: 12 }).withMessage('Password should be atleast of 6 characters and maximum of 12 characters').bail()
    .isAlphanumeric().withMessage('Password should be alphanumeric').bail(),
    
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Invalid Request', 
        errors: errors.array() 
      });
    }
    next();
  }
];
