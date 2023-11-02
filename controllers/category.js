const Category  =require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err || !cate) {
      return res.status(400).json({
        error: "Category not found in DB"
      });
    }
    req.category = cate;
    next();
  }); 
};

exports.createCategory = (req, res) => {
  req.profile.updatedAt = undefined;

  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "NOT able to save category in DB"
      });
    }
    res.json({ category });
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "NO categories found"
      });
    }
    res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;

  if (!category) {
    return res.status(404).json({
      error: "Category not found",
    });
  }

  // Update the category's name if req.body.name is provided
  if (req.body.name) {
    category.name = req.body.name;
  }

  if(category.name === req.body.name){
    return res.json({
      message:"both are same",
    })
  }
  // Save the updated category
  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update category",
      });
    }


    res.json({
      message: "Category updated successfully",
      updatedCategory,
    });
  });
};


exports.removeCategory = (req, res) => {
  const category = req.category;

  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this category"
      });
    }
    res.json({
      message: "Successfull deleted"
    });
  });

};
