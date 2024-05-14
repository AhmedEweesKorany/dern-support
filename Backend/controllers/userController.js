const User = require('../models/User')

// get allusers
const getAllUsers = (req,res)=>{
    User.all((err,data)=>{
        if (err) return res.status(401).json({message:"error happend ",err})
        return res.status(200).json({data})
    })
}

// show single user by id
const getOneUser = (req,res)=>{

    const id = +req.params.id
    User.one(id,(err,data)=>{
        if (err) return res.status(401).json({message:"error happend ",err})
        return res.status(200).json({data})
    })
}

// Registeration code
const createUser = (req,res)=>{
    const data = req.body
    User.userByEmail(data.email,(err,val)=>{ 
        if(val){
            return res.status(409).json({message:"email already exist"})
        }
        else{
            User.create(data,(err,data)=>{
                if (err) return res.status(401).json({message:"error happend ",err})
                return res.status(200).json({data})
            })
        }
    })

}

// update user
const updateUser = (req,res)=>{

    const data = req.body
    const id = +req.params.id
    User.update(data,id,(err,data)=>{
        if (err) return res.status(401).json({message:"error happend ",err})
        return res.status(200).json({data})
    })
}

// delete user
const deleteUser = (req,res)=>{

    const id = +req.params.id
    User.delete(id,(err,data)=>{
        if (err) return res.status(401).json({message:"error happend ",err})
        return res.status(200).json({data})
    })
}


// create user login
const userLogin= (req,res)=>{
    const data = req.body

    User.login(data,(err,data)=>{
        if(err) return res.status(401).json({message:err})

        return res.status(200).json({message:"Logged In Successfuly",data})
    })
}
module.exports= {getAllUsers,getOneUser,createUser,updateUser,deleteUser,userLogin}