const Task = require('../models/task');

exports.getAllTasks = async (req, res)=>{
    try {   
        const tasks = await Task.find();
        res.json(tasks)
    } catch (err) {
        res.status(500).json({massege:err.massege});
    }
}

exports.getTaskByUserId = async (req, res)=>{
    try {
        const userId = req.params.userId
        const task = await Task.find({userId})
        res.json(task)
    } catch (error) {
        res.status(500).json({massege:error.massege})
    }
}
exports.getTaskByCategory = async (req, res)=>{
    try {
        const task = await Task.find({categoryId:req.body.categoryId})
        res.json(task)
    } catch (error) {
        res.status(500).json({massege:error.massege})
    }
}


exports.createTask = async (req,res)=>{
    const task = new Task({
        ...req.body,
      // userId:req.user._id
    })

    try {
     await task.save()
     res.status(201).send(task)    
    } catch (error) {
         res.status(400).send(error)
    }
}

exports.deleteTaskById  = async(req, res)=>{
    try {
        
        await Task.findOneAndDelete({_id:req.params._id})
        res.json('deleted successfully!')
    } catch (err) {
        res.status(404).json({massege:err.massege})   
    }
}

exports.populate = async (req,res)=>{
    
    try {
        // Extract task data from the request body
        const {name, userId } = req.body;

        // Create a new task document and associate it with the user ID
        const task = await Task.create({name, userId });

        // Respond with the newly created task
        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.populateGet = async (req,res)=>{
    
    try {
        // Fetch all tasks from the database
        const tasks = await Task.find();

        // Populate user details for each task
        await Task.populate(tasks, { path: 'userId', select: 'username email' });

        // Respond with the tasks including associated user details
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.editTask = async (req, res) => {
    try {
        const filter  = {_id : req.params._id}
        const update = {description : req.body.newDescription}
        newUser =  await Task.findOneAndUpdate(filter, update, {new:true})
        res.status(201).send(newUser)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}