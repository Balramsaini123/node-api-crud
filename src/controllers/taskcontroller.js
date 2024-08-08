const Tasks = require('../models/task');

async function taskCreate(req, res) {
    const tasks = new Tasks(req.body);

    try {
        await tasks.save();
        res.status(201).send(tasks);
    } catch (e) {
        res.status(400).send(e);
    }
}

async function tasksGet(req, res) {
    try {
        const tasks = await Tasks.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send(e);
    }
}

async function taskGet(req, res) {
    const _id = req.params.id;

    try {
        const task = await Tasks.findById(_id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
}

async function taskUpdate(req, res) {
    const id = req.params.taskId;

    try {
        const task = await Tasks.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true } // Add runValidators to validate the update operation
        );

        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }

        res.status(200).send({ message: 'Task updated successfully', task });
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
}

async function taskDelete(req, res) {
    const id = req.params.taskId;

    try {
        const task = await Tasks.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }

        res.status(200).send({ message: 'Task deleted successfully' });
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
}

module.exports = {
    taskCreate, tasksGet, taskGet, taskUpdate, taskDelete
};
