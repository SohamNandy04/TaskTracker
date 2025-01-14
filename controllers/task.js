import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";


export const newTask = async (req,res) => {

    try {
        const { title, description } = req.body;

        await Task.create({
            title,
            description,
            user: req.User,
        })

        res.status(201).json({
            success: true,
            message: "Task Created Successfully"
        })
    } catch (error) {
        next(error)
    }

}

export const getMyTask = async (req,res) => {

    try{
        const userid = req.User._id;
        const tasks = await Task.find({user: userid});

        res.status(200).json({
            success: true,
            tasks
        })
    }catch (error) {
        next(error)
    }

}

export const updateTask = async (req,res) => {

    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        if(!task) 
            return next(new ErrorHandler(404, "Task Not Found"))

        task.isCompleted = !task.isCompleted;
        await task.save(); 

        res.status(200).json({
            success: true,
            message: "Task Updated"
        })
    } catch (error) {
        next(error)
    }

}

export const deleteTask = async (req,res) => {

    try{
        const task = await Task.findById(req.params.id);

        if(!task) 
            return next(new ErrorHandler(404, "Task Not Found"))

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task Deleted"
        })
    } catch(error) {
        next(error)
    }

}