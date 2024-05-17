const Service = require('../models/Service')

// get All Services
const getAllServices = (req,res)=>{
    Service.all((err,data)=>{
        if (err) return res.status(401).json({message:"error happend ",err})
        return res.status(200).json({data})
    })
}


// Creat code
const createService = (req,res)=>{
    const data = req.body
    Service.serviceByName(data.service_name,(err,val)=>{ 
        if(val){
            return res.status(409).json({message:"category already exist"})
        }
        else{
            Service.create(data,(err,data)=>{
                if (err) return res.status(401).json({message:"error happend ",err})
                return res.status(200).json({data})
            })
        }
    })

}

// delete Service

const deleteService = (req,res)=>{

    const id = +req.params.id
    Service.delete(id,(err,data)=>{
        if (err) return res.status(401).json({message:"error happend ",err})
        return res.status(200).json({data})
    })
}

// update Service
const updateService = (req,res)=>{

    const data = req.body
    const id = +req.params.id
    Service.update(data,id,(err,data)=>{
        if (err) return res.status(401).json({message:"error happend ",err})
        return res.status(200).json({data})
    })
}


module.exports= {getAllServices,createService,deleteService,updateService}