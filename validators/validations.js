const  {body,validationResult}=require('express-validator');

//wrong validation signup messages

exports.signupValidation=[
    body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 character long')
    .isString()
    .withMessage('Password must be string'),
    body('contacts')
    .notEmpty()
    .withMessage(' contacts  is required')
    .isLength({ min: 10,max:10})
    .withMessage('Contacts must be valid indian mobile number'),
    body('email')
    .notEmpty()
    .withMessage(' email  is required'),
    body('name')
    .notEmpty()
    .withMessage(' name  is required') 
];


//validation messages (occur only if there is wrong validation)
exports.loginValidation=[
    body('email')
    .notEmpty()
    .withMessage('Valid Email is required'),
    body('password')
    .notEmpty()
    .withMessage('Password is required')
];



//giving validation messages as response if there is wrong validation
exports.Validator=  (req,res,next)=> {const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg })
}
next();
}