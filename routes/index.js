const router =require('express').Router();

const productsController = require('../controllers/productsController');
const categoryController = require('../controllers/categoryController');
const userController = require('../controllers/userController');
const { authenticateToken } = require('../function/authenticateToken');


exports.routers = (router) =>{
router.get('/products', productsController.getAllProducts);
router.get('/products/:id',productsController.getProductById);
router.post('/products',productsController.addProducts);
router.put('/products/:id',productsController.updateProductById);
router.delete('/products/:id',productsController.deleteProductById);

router.get('/category',categoryController.getAllCategory);    
router.get('/category/:id',categoryController.getCategoryById);
router.post('/category',categoryController.addCategory);
router.put('/category/:id',categoryController.updateCategoryById);
router.delete('/category/:id',categoryController.deleteCategoryById);


router.get('/user', userController.getAllUsers);
router.get('/user/:id', userController.getUsersById);
router.post('/register', userController.register ); 
router.post('/login', userController.login ); 
router.get('/verified/:token', userController.verified ); 
router.put('/user/:id', userController.update);
router.delete('/user/:id', userController.deleteUser);
 
}

