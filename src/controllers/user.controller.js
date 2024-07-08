const userModel = require("../models/user.model");

async function getAllUsers(req, res) {
    const users = await userModel.find();
    return res.json(users);
}

async function getUser(req, res) {
    const id = req.params.id;
    const user = await userModel.findById(id);

    return res.json(user);
}

async function createUser(req, res) {
    const body = req.body;
    const user = await userModel.create({
        username: body.username,
        email: body.email,
        password: body.password,
        createdAt: new Date()
    });

    return res.status(201).json({
        message: "User Created",
        user: user
    });
}

async function updateUser(req, res) {
    const id = req.params.id;
    const body = req.body;
    
    await userModel.findByIdAndUpdate(id, {
        username: body.username,
        email: body.email,
        password: body.password
    });

    const updatedUser = await userModel.findById(id);

    return res.json({
        message: "User Updated",
        User: updatedUser
    });
}

async function deleteUser(req, res) {
    const id = req.params.id;
    const user = await userModel.findByIdAndDelete(id);

    return res.json({
        message: "User Deleted",
        user: user
    });
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};

