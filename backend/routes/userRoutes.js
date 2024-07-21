const express = require('express');
const router = express.Router();
const { registerUser, authUser, updateUser, deleteUser } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', authUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);
module.exports = router;
