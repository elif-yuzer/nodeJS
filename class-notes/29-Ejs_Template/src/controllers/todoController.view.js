"use strict";
const Todo = require("../models/todoModel");

const PRIORITIES = {
  "-1": "Low",
  0: "Normal",
  1: "High",
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
    res.render("TodoRead", { todo,PRIORITIES });
  },

  update: async (req, res) => {
    await Todo.update(req.body, { where: { id: req.params.id } });
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
