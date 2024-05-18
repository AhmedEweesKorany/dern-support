const db = require("../config/dbConn")
const Order = {

    all: (callback)=>{
        db.Order.findAll().then((data)=>callback(null,data)).catch(e=>callback(e,null))
    },

    one : (email,callback)=>{
        db.Order.findAll({where:{user_email:email}}).then(response=>{ 
            return callback(null, response);
        })    },


    create:(data,callback)=>{

     db.Order.create(data,{fields:Object.keys(data)}).then(()=> callback(null,true)).catch(e=>callback(e,null)) //  feilds inicate that the column that you want to add to your daabase
    },

    // find all completed requestes 
    completed:(callback)=>{
        db.Order.findAll({where:{status:"done"},limit:10}).then((data)=>{
            return callback(null,data)
        }).catch((e)=>{ 
            return callback(e,null)
        })
    },

    update:(data,id,callback)=>{
            db.Order.update(data,{where:{id:id},fields:Object.keys(data)}).then(()=>{
                return callback(null,"updated!")
            }).catch(e=>console.log("err on update",e))
    },

    delete: (id,callback)=>{
        db.Order.findOne({where:{id}}).then(data =>{
            db.Order.destroy({where:{id:id}}).then(()=>callback(null,"deleted")).catch(e=>console.log("err on delete",e))
        })
    }
}

module.exports = Order

