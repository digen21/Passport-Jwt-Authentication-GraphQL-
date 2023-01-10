import passportJwt,{Strategy, ExtractJwt} from 'passport-jwt';
import passport from 'passport';
import ApolloError from 'apollo-server-errors';
import { registerModel } from '../types/interface';
import { RequestHandler } from 'express';




const options = {
    secretOrKey: "jwtsecret",
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
}


export default function jwtPassportAuth(app:any){
    passport.use(new Strategy(options,async (payload, done) => {
        if(!payload){
            console.log("Unauthorized....");
            return done(null, false);            
        }
        console.log({payload:payload});
        const user = await registerModel.findOne({id: payload.id});
        return done(null, user || false);
    })
    );  
    
    const handleReq : RequestHandler = (req, res, next)=>{
        const token = options.jwtFromRequest(req);
        if(token){
        passport.authenticate("jwt", {session:false})(req, res, next);
        }else{
            next();
        }
    }
    app.use(handleReq);
}