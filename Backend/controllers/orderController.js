const Order = require('../models/Order')

// get All Order
const getAllOrder = (req,res)=>{
Order.all((err,data)=>{
        if (err) return res.status(401).json({message:"error happend ",err})
        return res.status(200).json({data})
    })
}


// Creat code
const createOrder = (req,res)=>{
    const data = req.body
      
    Order.create(data,(err,data)=>{
                if (err) return res.status(401).json({message:"error happend ",err})
                return res.status(200).json({data})
            })
  

}

// delete Order

const deleteOrder = (req,res)=>{

    const id = +req.params.id
    Order.delete(id,(err,data)=>{
        if (err) return res.status(401).json({message:"error happend ",err})
        return res.status(200).json({data})
    })
}

// update Order
const updateOrder = (req,res)=>{

    const data = req.body
    const id = +req.params.id
    Order.update(data,id,(err,data)=>{
        if (err) return res.status(401).json({message:"error happend ",err})
        return res.status(200).json({data})
    })
}


// update completed order

const updateCompletedOrder = (req,res)=>{
    const id = +req.params.id
    Order.update({status:"done"},id,(err,data)=>{
        if (err) return res.status(401).json({message:"error happend ",err})
        return res.status(200).json({data:true})
    })
}

// update Canceld order

const updateCanceldOrder = (req,res)=>{
    const id = +req.params.id
    Order.update({status:"canceled"},id,(err,data)=>{
        if (err) return res.status(401).json({message:"error happend ",err})
        return res.status(200).json({data:true})
    })
}



module.exports= {getAllOrder,createOrder,deleteOrder,updateOrder,updateCompletedOrder,updateCanceldOrder}