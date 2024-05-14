const db = require("../config/dbConn")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
// init user model 
const User = {

    all: (callback)=>{
        db.User.findAll().then((data)=>callback(null,data)).catch(e=>callback(e,null))
    },

    one : (id,callback)=>{
        db.User.findOne({where:{user_id:id}}).then(response=>{
            const type = response.dataValues.account_type
            //check if password valid
                    // generate jwt
                    const accessToken = jwt.sign({
                        user_info: {
                            id: response.dataValues.user_id,
                            user_name : response.dataValues.user_name,
                            email : response.dataValues.email,
                            password : response.dataValues.password,
                            isAdmin : response.dataValues.isAdmin,
                            account_type : response.dataValues.account_type,
                            bio : response.dataValues.bio,
                        }
                    }, process.env.ACCESS_TOKEN_SECERT);
            
                 return callback(null, { accessToken,type,response });
                
    
    
        })    },

    // get user by email

    userByEmail:(email,callback)=>{
        db.User.findOne({where:{email}}).then(data=> data== null? callback(null,null):callback(null,data)).catch(e=>callback(e,null))
    },
    create:(data,callback)=>{
      bcrypt.hash(data.password,10).then((res)=>{
            data.password = res
            db.User.create(data,{fields:Object.keys(data)}).then(()=> callback(null,true)).catch(e=>callback(e,null)) //  feilds inicate that the column that you want to add to your daabase
        })
    },

    update:(data,id,callback)=>{
        if(data.password){
            bcrypt.hash(data.password,10).then((res)=>{
                data.password = res
                db.User.update(data,{where:{user_id:id},fields:Object.keys(data)}).then(()=>{
                    return callback(null,"updated!")
                }).catch(e=>console.log("err on update",e))
            })
        }
        else{
            db.User.update(data,{where:{user_id:id},fields:Object.keys(data)}).then(()=>{
                return callback(null,"updated!")
            }).catch(e=>console.log("err on update",e))
            
            
            
        }

    },

    delete: (id,callback)=>{
        db.User.destroy({where:{user_id:id}}).then(()=>callback(null,"deleted")).catch(e=>console.log("err on delete",e))
    },

    // login
    login:(data,callback)=>{
        const {email , password} = data

        // check if email valid
        db.User.findOne({where:{email}}).then(response=>{
            const type = response.dataValues.account_type
            //check if password valid
            bcrypt.compare(password, response.dataValues.password)
            .then((result) => {
                if (result) {
                    // generate jwt
                    const accessToken = jwt.sign({
                        user_info: {
                            id: response.dataValues.user_id,
                            user_name : response.dataValues.user_name,
                            email : response.dataValues.email,
                            password : response.dataValues.password,
                            isAdmin : response.dataValues.isAdmin,
                            account_type : response.dataValues.account_type,
                            bio : response.dataValues.bio,
                        }
                    }, process.env.ACCESS_TOKEN_SECERT);
            
                    return callback(null, { accessToken, email,type ,response});
                } else {
                    // Passwords don't match
                    return callback("Invalid password", null);
                }
            })
            .catch((error) => {
                // Handle bcrypt comparison error
                return callback(error, null);
            });
        

        }).catch(e=>callback("invalid email",null))
    }
}

module.exports = User


