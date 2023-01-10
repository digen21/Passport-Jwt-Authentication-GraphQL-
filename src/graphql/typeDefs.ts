export const userTypes = `#graphql
    
    type User{
        id:ID
        name:String
        email:String
        password:String
        token:String
    }
    
    type Login{
        email:String
        password:String
        token:String
        
    }

    input UserInput{
        id:ID
        name:String
        email:String
        password:String
    }
    
    input LoginInput{
        email:String
        password:String
    }
    
    
    type Query{
        users:[User]
    }
    
    type Mutation{
        register(input:UserInput):User
        login(input:LoginInput):User
    }

`;

