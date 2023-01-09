import passportJwt from 'passport-jwt';
import passport from 'passport';
import ApolloError from 'apollo-server-errors';
import { registerModel } from '../types/interface';
import { RequestHandler } from 'express';

const {Strategy, ExtractJwt} = passportJwt;


const options = {
    secretOrKey: "jwtsecret",
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
}


const jwtPassportAuth  = async(passport: any)=>{
    passport.use(new Strategy(options, async function(payload, done){
            await registerModel.findOne({id: payload._id}, function(err : any, user:string){
                if(err){
                    return done(err, false);
                }
                
                if(user){
                    return done(null, user)
                }else{
                return done(null, false);
                }
            });
    }))
}




export default jwtPassportAuth;