const express = require('express');
const router = express.Router();

const productRouter = require('./product.route');
const userRouter = require('./user.route');

router.use('/products', productRouter);
router.use('/users', userRouter);

module.exports = router;

