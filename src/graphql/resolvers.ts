import { IUser } from "../types/interface";
import {userTypes} from '../graphql/typeDefs';
import jwt from "jsonwebtoken";
import {ApolloError} from 'apollo-server-errors'
import bcrypt = require("bcrypt");

import { registerModel } from "../types/interface";

export const resolvers = {
    Query:{
        users:async (_:any, {input}:{input:IUser}) => {
            
        }
    },
    
    Mutation:{
        register:async(_:any,{input}:{input:IUser})=>{
            const { name, email, password} = input;
            
            const user = await registerModel.findOne({email});
            if(user){
                return new ApolloError("User Already Exists...");
            }
            
            const hashPass = await bcrypt.hash(password, 10);
            
            const newUser = await new registerModel({
                ...input, password:hashPass            
            });
            
            const token = jwt.sign({user:newUser.id}, "jwtsecret", {expiresIn: "1y"});
            
            newUser.token = token;
            
            const result = await newUser.save();
            return result;
        },
        
        login:async(_:any,{input}:{input:IUser})=>{
            const {email, password} = input;
                
            const user = await registerModel.findOne({email});
            
            if(user){
                const match = await bcrypt.compare(password, user.password);
                if(!match) return new ApolloError("Invalid Credentials...")
                else{
                    const token = jwt.sign({user:user._id}, "jwtsecret", {expiresIn: "1y"});
                    console.log(token);
                    
                    return {
                        user, token
                    };
                }
            }
        }
    }

}