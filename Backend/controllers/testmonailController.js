const Testmonail = require('../models/Testmonails')

// get All Testmonail
const getAllTestmonail = (req,res)=>{
    Testmonail.all((err,data)=>{
        if (err) return res.status(401).json({message:"error happend ",err})
        return res.status(200).json({data})
    })
}


// Creat code
const createTestmonail = (req,res)=>{
    const data = req.body
    Testmonail.create(data,(err,data)=>{
                if (err) return res.status(401).json({message:"error happend ",err})
                return res.status(200).json({data})
            })
        
}

// delete Testmonail

const deleteTestmonail = (req,res)=>{

    const id = +req.params.id
    Testmonail.delete(id,(err,data)=>{
        if (err) return res.status(401).json({message:"error happend ",err})
        return res.status(200).json({data})
    })
}

// update Testmonail
const updateTestmonail = (req,res)=>{

    const data = req.body
    const id = +req.params.id
    Testmonail.update(data,id,(err,data)=>{
        if (err) return res.status(401).json({message:"error happend ",err})
        return res.status(200).json({data})
    })
}
// update Testmonail
const updateTestmonailByUserID = (req,res)=>{

    const data = req.body
    const id = +req.params.id
    Testmonail.updateByUserID(data,id,(err,data)=>{
        if (err) return res.status(401).json({message:"error happend ",err})
        return res.status(200).json({data})
    })
}

module.exports= {getAllTestmonail,createTestmonail,deleteTestmonail,updateTestmonail,updateTestmonailByUserID}