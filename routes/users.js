// Create a new router
const express = require("express")
const router = express.Router();
const bcrypt = require("bcrypt");
const saltrounds = 10;
const { check, validationResult } = require('express-validator');



const redirectLogin = (req, res, next) => {
    if (!req.session.userId ) {
      res.redirect('./login') // redirect to the login page
    } else { 
        next(); // move to the next middleware function
    } 
}

//register page
router.get('/register', function (req, res, next) {
    res.render('register.ejs')                                                               
})    


router.post('/registered', 
    [
        check('firstname').isLength({ max: 50 }),
        check('lastname').isLength({ max: 50 }),
        check('email').isEmail(), 
        check('username').isLength({ max: 30 }), 
        check('password').isLength({ min: 5 }) 
    ], 
    function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Invalid Input");
            return res.redirect('./register');
        }

        const plainPassword = req.sanitize(req.body.password);

        
        bcrypt.hash(plainPassword, saltrounds, (err, hashedPassword) => {
            if (err) {
                console.error("Error hashing the password:", err);
                return next(err);
            }
            
            let newrecord = [
                req.sanitize(req.body.firstname),
                req.sanitize(req.body.lastname),
                req.sanitize(req.body.email),
                req.sanitize(req.body.username),
                hashedPassword
            ];

            let sqlquery = "INSERT INTO passwords1 (firstname, lastname, email, username, hashedpassword) VALUES (?,?,?,?,?)";

            // Insert the new record into the database
            db.query(sqlquery, newrecord, (err, result) => {
                if (err) {
                    console.log("Error inserting into database:", err);
                    return next(err);
                }

           
            });
        });
});

router.get('/login', (req, res, next) => {
    res.render('login.ejs');                                                             
})

//logged / matched passwords
router.post('/logged', (req, res) => {

    const password = req.body.password
    const sqlquery = "SELECT * FROM passwords1 WHERE username = ?";
    
    db.query(sqlquery, [req.body.username], (err, result) => {
        if (err) {
            console.error("Error inserting into database:", err);
            return next(err);
        }
        
        if(result.length == 0)
            {
                res.send("no username found, you can browse the web normally though")
            }
            else
            {
                const user = result[0].hashedpassword;
                bcrypt.compare(password, user, (err, matching) => {
                if (err) {
                    console.error("Error comparing passwords:", err);
                    return res.send("An error has occurred: " + err);
                }
                if (matching) {
                  req.session.userId = req.sanitize(req.body.username);
                  console.log("db comparison working")
                }
                else {
                  res.send("password incorrect")
                }
              })
          
          
        }
            })
        
    });

// Export the router object so index.js can access it
module.exports = router;