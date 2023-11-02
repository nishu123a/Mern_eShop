const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB"
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to update this user"
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);
    }
  );
};

exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No Order in this account"
        });
      }
      return res.json(order);
    });
};

exports.pushOrderInPurchaseList = (req, res, next) => {
  const orderData = req.body.order;

  if (!orderData || !Array.isArray(orderData.products)) {
    return res.status(400).json({
      error: "Invalid or missing order data in the request."
    });
  }

  const purchases = orderData.products.map(product => ({
    _id: product._id,
    name: product.name,
    description: product.description,
    category: product.category,
    quantity: product.quantity,
    amount: orderData.amount,
    transaction_id: orderData.transaction_id
  }))

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save purchase list"
        });
      }
      // Now, the updated user object is available as 'user'
      next();
    }
  );
};
