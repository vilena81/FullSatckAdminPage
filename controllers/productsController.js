const {Product} = require('../models')

exports.addProducts = async(req, res)=>{
    try{
        const {name,price,img,quantity,categoryId} = req.body;
        const data = await Product.create({name,price,img,quantity,categoryId})
        res.status(201).json(data)
    }
    catch(err){
        res.status(500).json({error: err.message})
    } 
}

exports.getAllProducts = async(req, res) => {
    try{
        const data = await Product.findAll()
        res.status(201).json(data)
    }
    catch(err){
        res.status(500).json({error: err.message})
    } 
};

exports.getProductById = async(req, res) => {
    try{
        const id = req.params;
        const data = await Product.findOne({where: {id},})
        res.status(201).json(data)
    }
    catch(err){
        res.status(500).json({error: err.message})
    } 
};

exports.updateProductById = async(req, res) => {
    try{
        const id = req.params;
        const data = await Product.update(req.body, {where: id})
        res.status(201).json(data)
    }
    catch(err){
        res.status(500).json({error: err.message})
    } 
};

exports.deleteProductById = async(req, res) => {
    try{
        const id = req.params;
        const data = await Product.destroy({where: id})
        res.status(201).json(data)
    }
    catch(err){
        res.status(500).json({error: err.message})
    } 
};







