const db = require("../config/dbConn")
const Category = {

    all: (callback)=>{
        db.Category.findAll().then((data)=>callback(null,data)).catch(e=>callback(e,null))
    },

    one : (id,callback)=>{
        db.Category.findOne({where:{category_id:id}}).then(response=>{ 
            return callback(null, response);
        })    },

    // find category by name

      categoryByName:(name,callback)=>{
        db.Category.findOne({where:{category_name:name}}).then(data=> data== null? callback(null,null):callback(null,data)).catch(e=>callback(e,null))
    },

    create:(data,callback)=>{

     db.Category.create(data,{fields:Object.keys(data)}).then(()=> callback(null,true)).catch(e=>callback(e,null)) //  feilds inicate that the column that you want to add to your daabase
    },

    update:(data,id,callback)=>{
            db.Category.update(data,{where:{category_id:id},fields:Object.keys(data)}).then(()=>{
                return callback(null,"updated!")
            }).catch(e=>console.log("err on update",e))
    },

    delete: (id,callback)=>{
        db.Category.destroy({where:{category_id:id}}).then(()=>callback(null,"deleted")).catch(e=>console.log("err on delete",e))
    }
}

module.exports = Category

