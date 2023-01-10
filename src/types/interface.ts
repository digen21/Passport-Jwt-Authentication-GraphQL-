import mongoose,{model, Schema} from 'mongoose';

export interface IUser{
    name:string;
    email:string;
    password:string;
    token:string;
}


export interface ILogin{
    email:string;
    password:string;
}


const registerSchema : Schema = new mongoose.Schema({
    name:{type:"string", required:true},
    email:{type:"string", required:true},
    password:{type:"string", required:true},
});

export const registerModel = model<IUser>('Users', registerSchema);