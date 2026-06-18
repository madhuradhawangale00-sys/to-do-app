const Task = require('../models/taskModel');

const getTasks = async(req,res)=>{
    const tasks = await Task.find().sort({createdAt:-1});
    res.status(200).json(tasks);
};

const createTask = async(req,res)=>{
    try{
        const task = await Task.create(req.body);
        res.status(201).json(task);
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
};

const updateTask = async(req,res)=>{
    const task = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );

    res.status(200).json(task);
};

const deleteTask = async(req,res)=>{
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({message:'Task Deleted'});
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};