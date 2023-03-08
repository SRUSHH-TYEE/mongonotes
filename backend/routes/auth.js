const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "HEySrushhh";
const fetchuser = require("../middleware/fetchuser");

//ROUTE1: create a user using "/api/auth/craeteuser". 
router.post('/createuser',
    [body('name', "Enter a valid name").isLength({ min: 3 }),
    body('password', "Enter a valid password").isLength({ min: 8 }),
    body('email', "Enter a valid email").isEmail()]
    , async (req, res) => {

        // In case of errors, rerurn bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };
        try {
            // check whether the user with  the same email already exists
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "A user with this email id already exists!" })
            }

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt)

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            });

            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET)
            res.json({ authToken })
        }

        catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured");
        }
    });


//ROUTE2: authenticate a user using POST "/api/auth/login"
router.post('/login', [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists()
],
    async (req, res) => {

        // In case of errors, rerurn bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json("Please try to login with correct credentials!")
            }

            const comparePassword = bcrypt.compare(password, user.password);
            if (!comparePassword) {
                return res.status(400).json("Please try to login with correct credentials!")

            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET)
            res.json({ authToken })

        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error")
        }
    }
)

//ROUTE3: getting userdata using "/api/auth/getuser" Login required

router.post("/getuser",fetchuser, async(req,res)=>{
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password"); //select all fields except password
        res.send(user);


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router