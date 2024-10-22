const User = require('../models/user')

exports.getAllUsers = async (req, res)=>{
    try{
        const users = await User.find();
        res.json(users);
         
        
    } catch(err){
        res.status(500).json({massege:err.massege});
    }
}

exports.createUser = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await User.create(userData); // Await User.create()
        const data = req.params.id
        const users = await User.find();
        res.json({users,data });
    } catch (err) {
        if(err.code === 11000){
            const field = Object.keys(err.keyValue)[0]
            const errorMassege = `${field.charAt(0).toUpperCase() + field.slice(1)} already taken`
            res.status(400).json({massege:errorMassege})
        }else{
        res.status(500).json({ message: err.message });
        }
    }
};

exports.getUserById = async(req,res)=>{
    try {
        const userID = req.params.id;
        const foundUsers = await User.find({_id:userID})
        if(foundUsers == 0){
            res.send('User is not Found!!!')
        }else{
            res.json(foundUsers)
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
exports.getUserByUsername = async(req,res)=>{
    try {
        const userName=req.query.username 
        foundUser = await User.find({username: userName})
        if(foundUser == 0){
            res.send(userName )

        }else{
            res.json(userName)
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
exports.deleteUserById = async(req,res)=>{
    try {
        const userId = req.body.id;
        const deleted = await User.deleteMany({id:userId})
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.update = async(req, res)=>{
    try {
        const updates = Object.keys(req.body)
        const allowUpdates = ['name', 'email', 'username', 'password']
        const isValidOperation = updates.every((update)=>allowUpdates.includes(update))

        if(!isValidOperation){
            return res.status(400).send({error:'Invalid Updates!'})
        }
        try {
            const user = await User.findById(req.params.id)
            updates.forEach((update)=>user[update] = req.body[update])
            //await user.save();
           
            res.json(user);

        } catch (err) {
        res.status(500).json({ message: err.message });
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
exports.login = async(req, res)=>{
    try {   
        const user = await User.findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}