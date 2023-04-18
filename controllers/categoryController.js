const {Category} = require('../models')

exports.addCategory = async(req, res)=>{
    try{
        const name = req.body;
        const data = await Category.create(name)
        res.status(201).json(data)
    }
    catch(err){
        res.status(500).json({error: err.message})
    } 
};

exports.getAllCategory = async(req, res) => {
    try{
        const data = await Category.findAll()
        res.status(201).json(data)
    }
    catch(err){
        res.status(500).json({error: err.message})
    } 
};

exports.getCategoryById = async(req, res) => {
    try{
        const id = req.params;
        const data = await Category.findOne({where: id})
        res.status(201).json(data)
    }
    catch(err){
        res.status(500).json({error: err.message})
    } 
};

exports.updateCategoryById = async(req, res) => {
    try{
        const id = req.params;
        const data = await Category.update(req.body, {where: id})
        res.status(201).json(data)
    }
    catch(err){
        res.status(500).json({error: err.message})
    } 
};

exports.deleteCategoryById = async(req, res) => {
    try{
        const id = req.params;
        const data = await Category.destroy({where: id})
        res.status(201).json(data)
    }
    catch(err){
        res.status(500).json({error: err.message})
    } 
};
