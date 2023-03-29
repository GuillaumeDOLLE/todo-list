const { Task } = require('../models');

const taskController = {

    listTasks: async function (req, res) {
        try {
            // Récupérer la liste des taches
            const tasks = await Task.findAll();

            // Renvoyer la liste des taches en json
            res.json(tasks);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },

    addOneTask: async function (req, res) {
        const infos = req.body;
        const newTask = new Task(infos);

        try {  
            const savedTask = await newTask.save();

            res.json(savedTask);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },
    
    updateOneTask: async function (req, res) {
        const id = parseInt(req.params.id);
        if(isNaN(id)) {
            return res.status(404).json({error: 'Invalid task id'});
        }

        try {
            const task = await Task.findByPk(id);

            if(!task) {
                return res.status(404).json({ status: 'task not found'});
            }

            const { name } = req.body;

            if(name) {
                task.name = name;
            }

            await task.save();
            res.json(task);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },

    deleteOneTask: async function (req, res) {
        const id = parseInt(req.params.id);
        if(isNaN(id)) {
            return res.status(404).json({ error: 'Invalid task id' });
        }

        try {

            const task = await Task.findByPk(id);

            await task.destroy();

            res.status(204).json();

        } catch (error) {
            console.error(error);
            res.status(500).json({error: error.message});
        }


    }
};

module.exports = taskController;
