const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;

        if (!title) {
            return res.status(400).json({ error: 'Title is required.' });
        }

        const newTask = new Task({
            title,
            description,
            dueDate,
        });

        await newTask.save();

        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
    try {
        const taskId = req.params.id;

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { title, description, dueDate, completed } = req.body;

        // Basic validation
        if (!title) {
            return res.status(400).json({ error: 'Title is required.' });
        }

        // Check if the task exists
        const existingTask = await Task.findById(taskId);
        if (!existingTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Update other fields
        existingTask.title = title;
        existingTask.description = description;
        existingTask.dueDate = dueDate;

        // Save the updated task
        const updatedTask = await existingTask.save();

        res.status(200).json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Delete a task by ID
exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Set a task to completed
exports.completeTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        const updatedTask = await Task.findByIdAndUpdate(taskId, { completed: true }, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
