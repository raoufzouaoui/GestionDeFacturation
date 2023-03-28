import {Schema, model, Types} from 'mongoose';

export interface Facture{
    id:number;
    email:string;
    name:string;
    address:string;
    reference:string;
    prix:number;
    quantity:string;
    dateD:Date;
    dateF:Date;
    payer:string;
    user: Types.ObjectId;
}

export const FactureSchema = new Schema<Facture>(
    {
        email: {type: String, required:true},
        name: {type: String, required:true},
        address: {type: String, required:true},
        reference: {type: String, required:true},
        prix: {type: Number, required:true},
        quantity: {type: String, required:true},
        dateD: {type: Date, required:true},
        dateF: {type: Date, required:true},
        payer: {type: String, default: "Non Payer"},
        user: {type: Schema.Types.ObjectId, required: true},
    },{
        toJSON:{
            virtuals: true
        },
        toObject:{
            virtuals: true
        },
        timestamps:true
    }
);

export const FactureModel = model<Facture>('facture', FactureSchema);