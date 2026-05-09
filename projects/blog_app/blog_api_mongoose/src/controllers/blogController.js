const { Category } = require("../models/blogModel");

module.exports = {
  create: async (req, res) => {
    const result = await Category.create(req.body);
    res.status(201).send({
      error: false,
      data: result,
    });
  },

  list: async (req, res) => {
    const result = await Category.find();

    res.status(200).send({
      error: false,
      data: result,
    });
  },
  //
  listOne: async (req, res) => {
    const result = await Category.findOne({ name: req.params.name });
    res.status(200).send({
      error: false,
      data: result,
    });
  },

  listById: async (req, res) => {
    const result = await Category.findById(req.params.id);
    res.status(201).send({
      error: false,
      data: result,
    });
  },

  update: async (req, res) => {
    const result = await Category.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).send({
      error: false,
      data: result,
    });
  },

/*   delete: async (req, res) => {
    const { deleted } = await Category.deleteOne({ _id: req.params.id });

    if (!deleted) {
      res.errStatusCode = 406;
      throw new Error("data is not found or already deleted");
    }

    res.sendStatus(204);
  },
};
 */

delete: async (req, res) => {
  const result = await Category.deleteOne({ _id: req.params.id });

  if (result.deletedCount === 0) {
    return res.status(404).json({
      error: true,
      message: "Category not found or already deleted"
    });
  }

  res.sendStatus(204);
}

}