import { body, param, validationResult } from "express-validator";
export const productValidator = [

 body("title")
    .trim()
    .notEmpty().withMessage("Title is required").bail()
    .isLength({ min: 3, max: 100 }).withMessage("Title must be between 3 and 100 characters").bail()
    .matches(/^[a-zA-Z0-9\s\-,':?]+$/).withMessage("Title contains invalid characters").bail(),

  body("description")
    .trim()
    .notEmpty().withMessage("Description is required").bail()
    .isLength({ min: 10, max: 2000 }).withMessage("Description must be between 10 and 2000 characters").bail(),

body("prices").exists().withMessage("Prices are required").bail() ,

body("prices")
  .exists().withMessage("Prices are required").bail(),

body("prices.amount")
  .exists().withMessage("Amount is required").bail()
  .isFloat({ min: 0 }).withMessage("Price must be a number greater than or equal to 0").bail(),

body("prices.currency")
  .exists().withMessage("Currency is required").bail()
  .isString().withMessage("Currency must be a string").bail()
  .isIn(["INR", "USD"]).withMessage("Currency must be INR or USD").bail(),


body("sizes")
  .exists().withMessage("Sizes are required").bail()
  .isArray().withMessage("Sizes must be an array").bail(),

body("sizes.*.size")
  .exists().withMessage("Size is required").bail()
  .isString().withMessage("Size must be a string").bail()
  .trim()
  .notEmpty().withMessage("Size cannot be empty").bail()
  .isIn(["XS", "S", "M", "L", "XL", "XXL"])
  .withMessage("Invalid size").bail(),

  body("sizes.*.stock")
  .exists().withMessage("Stock is required").bail()
  .trim()
  .notEmpty().withMessage("Stock cannot be empty").bail()
  .isInt({ min: 0 }).withMessage("Stock must be an integer value").bail() ,

  (req, res ,next)=>{

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            messaage:"Invlid request" ,
            errors:errors.array()
        })
    }

    next()

  }
      
]



export const validateProductId = [

param("id")
  .exists()
  .withMessage("Product ID is required")
  .bail()
  .isMongoId()
  .withMessage("Invalid Product ID") ,

    (req, res, next) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid request",
        errors: errors.array()
      })
    }

    next()
  }


]

export const updateProductValidator = [

  body("title")
    .trim()
    .notEmpty().withMessage("Title is required").bail()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters").bail()
    .matches(/^[a-zA-Z0-9\s\-,':?]+$/)
    .withMessage("Title contains invalid characters").bail(),

  body("description")
    .trim()
    .notEmpty().withMessage("Description is required").bail()
    .isLength({ min: 10, max: 2000 })
    .withMessage("Description must be between 10 and 2000 characters").bail(),

  body("prices")
    .exists().withMessage("Prices are required").bail(),

  body("prices.amount")
    .exists().withMessage("Amount is required").bail()
    .isFloat({ min: 0 })
    .withMessage("Price must be a number greater than or equal to 0").bail(),

  body("prices.currency")
    .exists().withMessage("Currency is required").bail()
    .isString().withMessage("Currency must be a string").bail()
    .isIn(["INR", "USD"])
    .withMessage("Currency must be INR or USD").bail(),

  body("sizes")
    .exists().withMessage("Sizes are required").bail()
    .isArray().withMessage("Sizes must be an array").bail(),

  body("sizes.*.size")
    .exists().withMessage("Size is required").bail()
    .isString().withMessage("Size must be a string").bail()
    .trim()
    .notEmpty().withMessage("Size cannot be empty").bail()
    .isIn(["XS", "S", "M", "L", "XL", "XXL"])
    .withMessage("Invalid size").bail(),

  body("sizes.*.stock")
    .exists().withMessage("Stock is required").bail()
    .trim()
    .notEmpty().withMessage("Stock cannot be empty").bail()
    .isInt({ min: 0 })
    .withMessage("Stock must be an integer value").bail(),

  (req, res, next) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid request",
        errors: errors.array()
      })
    }

    next()
  }

]

