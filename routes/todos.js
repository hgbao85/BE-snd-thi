const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        
        res.status(200).json({
            data: todos.map(todo => ({
                _id: todo._id,
                title: todo.title,
                description: todo.description,
                completed: todo.completed
            }))
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve todos' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ error: 'To-Do item not found' });
        }
        res.json({ data: todo });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch todo' });
    }
});

router.post('/', async (req, res) => {
    const { title, description, completed } = req.body;

    const newTodo = new Todo({
        title,
        description,
        completed
    });

    try {
        const savedTodo = await newTodo.save();
        res.status(201).json({
            data: {
                _id: savedTodo._id,
                title: savedTodo.title,
                description: savedTodo.description,
                completed: savedTodo.completed
            }
        });
    } catch (error) {
        res.status(400).json({ error: 'Failed to create todo' });
    }
});

router.put('/:id', async (req, res) => {
    const { title, description, completed } = req.body;
    const todoId = req.params.id;

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            todoId,
            { title, description, completed },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.status(200).json({
            data: {
                _id: updatedTodo._id,
                title: updatedTodo.title,
                description: updatedTodo.description,
                completed: updatedTodo.completed
            }
        });
    } catch (error) {
        res.status(400).json({ error: 'Failed to update todo' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            return res.status(404).json({ error: 'To-Do item not found' });
        }
        res.json({ data: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete todo' });
    }
});

module.exports = router;
