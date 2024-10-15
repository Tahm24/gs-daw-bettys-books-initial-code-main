// Create a new router
const express = require("express")
const router = express.Router()


//red
const redirectLogin = (req, res, next) => {
    if (!req.session.userId ) {
      res.redirect('../users/login') // redirect to the login page
    } else { 
        next (); // move to the next middleware function
    } 
}

// Handle our routes
router.get('/',function(req, res, next){
    res.render('index.ejs')
})

router.get('/about',function(req, res, next){
    res.render('about.ejs')
})

router.get('/logout', redirectLogin, (req,res) => {
    req.session.destroy(err => {
    if (err) {
      return res.redirect('/users/login')
    }
    res.send('you are now logged out. <a href='+'/users/login'+'>Login</a>');
    })
})

// Export the router object so index.js can access it
module.exports = router