import {Router} from 'express';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import { Facture, FactureModel } from '../models/facture.model';
import auth from '../middlewares/auth.mid';
import { Response } from "express"
import { IGetUserAuthInfoRequest } from "../middlewares/req.user";

const router = Router();
router.use(auth);


router.post('/create',asyncHandler(async (req:any,res:any) => {
        const requestFacture = req.body;
        const newFacture = new FactureModel({...requestFacture,user:req.user.id,});
        await newFacture.save((err)=>{
            if(err){
                res.status(500).json({ msg : "NOT WORKING ERROR" });
            }else{
                res.send(newFacture);
            }
        });
        
    }
 ))

 router.get("/",asyncHandler(async (req,res)=>{
    const factures = await FactureModel.find();
    if(factures)
        res.send(factures)
    else
        res.status(400).send("NO Facture exist");
    // res.status(200).json({ factures });
 }))


 router.get('/facture/:id',asyncHandler(async (req,res)=>{
    try{
    const {id:factureID} = req.params;
    // console.log(factureID);
    const factures = await FactureModel.findOne({_id:factureID});
    if(!factures){
        res.status(404).json({msg:`No facture with id : ${factureID}`});
        console.log({msg:`No facture with id : ${factureID}`});
        return;
    }
        res.send(factures);
    }catch(error){
        res.status(500).json({ msg : error });
    }
 }))

 

 router.get('/:email',asyncHandler(async (req:any,res:any)=>{
    // console.log("hhhhhhhh");
    try {
        // const {email:userEmail} = req.user.email;
        // console.log(req.user.email);
        const facture= await FactureModel.find({email:req.user.email});
        // console.log(facture);
        if(facture) res.send(facture);
        else res.status(400).send(`no email ${req.user.email}`);
    }catch (err) {
            console.error(err);
            res.status(500).send();
          }
 }))



router.put('/edit/:id', asyncHandler(async (req,res) =>{
    try{
        const {id : factureID} = req.params;
        const facture = await FactureModel.findOneAndUpdate({ _id:factureID },req.body,{
            new: true,
            runValidators: true,
            overwrite: true,
        })
        if(!facture) {
            res.status(404).json({msg:`No facture with id : ${factureID}`});
            console.log({msg:`No facture with id : ${factureID}`});
            return;
        }else{
            res.send(facture);
            // res.status(200).json({ facture })
        }
    }catch(error){
        res.status(500).json({ msg : error });
    }
    
}))

router.delete('/delete/:id',asyncHandler(async (req,res) => {
    try{
        const {id:factureID} = req.params;
        const facture = await FactureModel.findByIdAndRemove({_id:factureID})
        if(!facture) {
            res.status(404).json({msg:`No facture with id : ${factureID}`});
            console.log({msg:`No facture with id : ${factureID}`});
            return;
        }else{
            res.status(200).json({ facture });
            // res.status(200).json({ facture })
        }
    }catch(error){
        res.status(500).json({ msg : error })
    }
    
}))


router.patch('/update/:id', asyncHandler(async (req,res) =>{
    try{
        const {id : factureID} = req.params;
        const facture = await FactureModel.findOneAndUpdate({ _id:factureID },req.body,{
            new: true,
            runValidators: true,
        })
        
        if(!facture) {
             res.status(404).json({msg:`No facture with id : ${factureID}`});
             console.log({msg:`No facture with id : ${factureID}`});
             return;
        }else{
            res.send(facture);
            // res.status(200).json({ facture })
        }
    }catch(error){
        res.status(500).json({ msg : error })
    }
    
    
}))

router.post('/pay', asyncHandler( async (req:any, res) => {
    const facture = await getNewFactureForCurrentUser(req);
     console.log(facture);
    if(!facture){
        res.status(404).send('facture Not Found!');
        return;
    }
    facture.payer = "Payé";
    await facture.save();

    res.send(facture._id);
}))

export default router;


async function getFactureForCurrentUser(req: any) {
    return await FactureModel.findOne({ email: req.user.email});
}

async function getNewFactureForCurrentUser(req: any) {
    const {_id:factureID} = req.body;
    //  console.log(factureID);
     console.log(req.user.email);
    return await FactureModel.findOne({ email:req.user.email, payer: "Non Payer" ,_id:factureID});
}






