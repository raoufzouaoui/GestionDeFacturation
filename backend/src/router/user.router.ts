import {Router} from 'express';
import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler';
import { User, UserModel } from '../models/user.model';
import bcrypt from 'bcryptjs';

const router = Router();

router.post("/login",asyncHandler(
    async (req,res)=>{
        const {email,password} = req.body;
        const user = await UserModel.findOne({email});
     
        if(user && (await bcrypt.compare(password,user.password))){
         res.send(generateTokenReponse(user));
        }else{
         res.status(400).send("User name or password is not valid!");
        }
     }
 ) )
 
 router.post('/register', asyncHandler(
    async (req, res) => {
      const {name, email, password, address} = req.body;
      const user = await UserModel.findOne({email});
      if(user){
        res.status(400)
        .send('User is already exist, please login!');
        return;
      }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser:User = {
      id:'',
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      address,
      isAdmin: false
    }

    const dbUser = await UserModel.create(newUser);
    res.send(generateTokenReponse(dbUser));
  }
))


const generateTokenReponse = (user : User) => {
  const token = jwt.sign({
    id: user.id, email:user.email, isAdmin: user.isAdmin
  },process.env.JWT_SECRET!,{
    expiresIn:"30d"
  });
  
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    isAdmin: user.isAdmin,
    token: token
  };
}

 export default router;