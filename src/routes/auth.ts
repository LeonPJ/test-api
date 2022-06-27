import { Router, Request, Response } from 'express';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// import User from '../models/User';
// import { registerValidation, loginValidation } from '../middleware/validation';

import { register, login } from '../controller/Auth';



export const router = Router();


router.post('/register', register);

router.post('/login', login);


// router.post('/register', async (req: Request, res: Response) => {
//     // validate the data
//     const { error } = registerValidation(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const { name, email, password } = req.body;

//     // check if user is already in the database
//     const emailExit = await User.findOne({ email });
//     if (emailExit) return res.status(400).end('email already exists');

//     // hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // create a new user
//     const user = new User({
//         name: name,
//         email: email,
//         password: hashedPassword
//     });


//     try {
//         const saveUser = await user.save();
//         res.send(saveUser);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     // validate the data
//     const { error } = loginValidation(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     // check if email is already in the database
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).end('email is not found');

//     // password is correct
//     const validPass = await bcrypt.compare(password, user.password);
//     console.log(user.password);
//     if (!validPass) return res.status(400).send('invalid password');

//     // create a token
//     const token = jwt.sign({ name: user.name }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
//     res.header('auth-token', token).send(token);

//     // res.send('logged in')
// });