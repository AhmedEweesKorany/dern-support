const db = require("../config/dbConn")
const Service = {

    all: (callback)=>{
        db.Service.findAll().then((data)=>callback(null,data)).catch(e=>callback(e,null))
    },

    one : (id,callback)=>{
        db.Service.findOne({where:{service_id:id}}).then(response=>{ 
            return callback(null, response);
        })    },

    // find Service by name

      serviceByName:(name,callback)=>{
        db.Service.findOne({where:{service_name:name}}).then(data=> data== null? callback(null,null):callback(null,data)).catch(e=>callback(e,null))
    },

    create:(data,callback)=>{

     db.Service.create(data,{fields:Object.keys(data)}).then(()=> callback(null,true)).catch(e=>callback(e,null)) //  feilds inicate that the column that you want to add to your daabase
    },

    update:(data,id,callback)=>{
            db.Service.update(data,{where:{service_id:id},fields:Object.keys(data)}).then(()=>{
                return callback(null,"updated!")
            }).catch(e=>console.log("err on update",e))
    },

    delete: (id,callback)=>{
        db.Service.destroy({where:{service_id:id}}).then(()=>callback(null,"deleted")).catch(e=>console.log("err on delete",e))
    }
}

module.exports = Service

