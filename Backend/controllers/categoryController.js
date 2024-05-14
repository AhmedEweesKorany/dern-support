const Category = require('../models/Category')

// get AllCategories
const getAllCategories = (req,res)=>{
    Category.all((err,data)=>{
        if (err) return res.status(401).json({message:"error happend ",err})
        return res.status(200).json({data})
    })
}


// Creat code
const createCategory = (req,res)=>{
    const data = req.body
    Category.categoryByName(data.category_name,(err,val)=>{ 
        if(val){
            return res.status(409).json({message:"category already exist"})
        }
        else{
            Category.create(data,(err,data)=>{
                if (err) return res.status(401).json({message:"error happend ",err})
                return res.status(200).json({data})
            })
        }
    })

}

// delete category

const deleteCategory = (req,res)=>{

    const id = +req.params.id
    Category.delete(id,(err,data)=>{
        if (err) return res.status(401).json({message:"error happend ",err})
        return res.status(200).json({data})
    })
}



module.exports= {getAllCategories,createCategory,deleteCategory}