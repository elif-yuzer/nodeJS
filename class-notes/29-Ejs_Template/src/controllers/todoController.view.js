"use strict";
const Todo = require("../models/todoModel");

const PRIORITIES = {
  "-1": "Low",
  0: "Normal",
  1: "High",
};

const hasValue = (value) => {
  return value !== undefined && value !== null && String(value).trim() !== "";
};

module.exports = {
  list: async (req, res) => {
    const todos = await Todo.findAndCountAll();
    res.render("index", {
      count: todos.count,
      todolar: todos.rows,
      PRIORITIES,
    });
  },

  create: async (req, res) => {
    await Todo.create(req.body);
    res.redirect("/view");
  },

  read: async (req, res) => {
    const todo = await Todo.findByPk(req.params.id);
    res.render("todoRead", { todo, PRIORITIES });
  },

  edit: async (req, res) => {
    const todo = await Todo.findByPk(req.params.id);

    if (!todo) {
      res.errStatusCode = 404;
      throw new Error("Todo is not found.");
    }

    res.render("todoEdit", { todo, PRIORITIES });
  },

  update: async (req, res) => {
    const todo = await Todo.findByPk(req.params.id);

    if (!todo) {
      res.errStatusCode = 404;
      throw new Error("Todo is not found.");
    }

    const priority = Number(req.body.priority);

    const updateData = {
      title: hasValue(req.body.title) ? req.body.title.trim() : todo.title,
      description: hasValue(req.body.description)
        ? req.body.description.trim()
        : todo.description,
      priority:
        hasValue(req.body.priority) && !Number.isNaN(priority)
          ? priority
          : todo.priority,
      isDone:
        req.body.isDone === undefined || req.body.isDone === ""
          ? todo.isDone
          : req.body.isDone === true || req.body.isDone === "true" || req.body.isDone === "on",
    };

    await todo.update(updateData);
    res.redirect("/view");
  },

  delete: async (req, res) => {
    await Todo.destroy({ where: { id: req.params.id } });
    res.redirect("/view");
  },

  toggle: async (req, res) => {
    const todo = await Todo.findByPk(req.params.id);
    await Todo.update(
      { isDone: !todo.isDone },
      { where: { id: req.params.id } },
    );
    res.redirect("/view");
  },
};
