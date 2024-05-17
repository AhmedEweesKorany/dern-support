const db = require("../config/dbConn")
const Testmonail = {

    all: (callback)=>{
        db.Testmonail.findAll().then((data)=>callback(null,data)).catch(e=>callback(e,null))
    },

    one : (id,callback)=>{
        db.Testmonail.findOne({where:{id:id}}).then(response=>{ 
            return callback(null, response);
        })    },



    create:(data,callback)=>{

     db.Testmonail.create(data,{fields:Object.keys(data)}).then(()=> callback(null,true)).catch(e=>callback(e,null)) //  feilds inicate that the column that you want to add to your daabase
    },

    update:(data,id,callback)=>{
            db.Testmonail.update(data,{where:{id:id},fields:Object.keys(data)}).then(()=>{
                return callback(null,"updated!")
            }).catch(e=>console.log("err on update",e))
    },

    updateByUserID:(data,userId,callback)=>{
        db.Testmonail.update(data,{where:{user_id:userId},fields:Object.keys(data)}).then(()=>{
            return callback(null,"updated!")
        }).catch(e=>console.log("err on update",e))
    },

    delete: (id,callback)=>{
        db.Testmonail.destroy({where:{id:id}}).then(()=>callback(null,"deleted")).catch(e=>console.log("err on delete",e))
    }
}

module.exports = Testmonail

