import {Schema, model} from 'mongoose';

export interface User{
    id:string;
    email:string;
    password: string;
    name:string;
    address:string;
    isAdmin:boolean;
}

export const UserSchema = new Schema<User>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    address: {type: String, required: true},
    isAdmin: {type: Boolean, required: true},
}, //to set virtuals to true w need to add options
    {
    timestamps: true, //set the time automatically when create or update 
    toJSON:{ //to get _id
        virtuals: true
    },
    toObject:{ // get value to work on it 
        virtuals: true
    }
});

export const UserModel = model<User>('user', UserSchema);

