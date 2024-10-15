// Create a new router
const express = require("express")
const router = express.Router();
const bcrypt = require("bcrypt");
const saltrounds = 10;


const redirectLogin = (req, res, next) => {
    if (!req.session.userId ) {
      res.redirect('./login') // redirect to the login page
    } else { 
        next (); // move to the next middleware function
    } 
}





//register page
// router.get('/register', function (req, res, next) {
//     res.render('register.ejs')                                                               
// })    


//registers route
router.post('/registered', function (req, res, next) {
    
    const plainPassword = req.body.password;
    
    bcrypt.hash(plainPassword, saltrounds, (err, hashedPassword) => {
        if (err) {
            console.error("Error hashing the password:", err);
            return next(err);
        }

        let newrecord = [
            req.body.firstname,
            req.body.lastname,
            req.body.email,
            hashedPassword 
        ];

        
        let sqlquery = "INSERT INTO passwords1 (firstname, lastname, email, hashedpassword) VALUES (?,?,?,?)";


       
        db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                console.log("Error inserting into database:", err);
                return next(err);
            }

            
            
            
            
    res.send(`Hello ${req.body.firstname} ${req.body.lastname}, you are now registered! We will send an email to you at ${req.body.email}. 
            Your plain password is: ${plainPassword}, and your hashed password is: ${hashedPassword}`);
        });
    });
});

router.get('/login', (req, res, next) => {
    res.render('login.ejs')                                                               
})

//logged / matched passwords
router.post('/logged', (req, res) => {

    const password = req.body.password
    const sqlquery = "SELECT * FROM passwords1 WHERE email = ?";
    
    db.query(sqlquery, [req.body.email], (err, result) => {
        if (err) {
            console.error("Error inserting into database:", err);
            return next(err);
        }
        
        if(result.length == 0)
            {
                res.send("no email found, you can browse the web normally though")
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
                req.session.userId = req.body.email;
                  res.send("password correct")
                  console.log("db comparison working")
                }
                else {
                  res.send("password incorrect")
                }
              })
          
          
        }
            })
        
    });



    router.get("/testing1", redirectLogin, (req, res) => {
        res.send("Testing session 1, you are authenticated!");
    });
    
    router.get("/testing2", redirectLogin, (req, res) => {
        res.send("Testing session 2, you are authenticated!");
    });
    
    router.get("/testing3", redirectLogin, (req, res) => {
        res.send("Testing session 3, you are authenticated!");
    });

    router.get("/testing4", (req, res) => {
        res.send("Testing session 4")
    });

    router.get("/testing5", (req, res) => {
        res.send("Testing session 5")
    });








// Export the router object so index.js can access it
module.exports = router;
