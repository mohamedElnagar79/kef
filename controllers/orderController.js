const Order = require("../models/orderSchema");
const ProductInfo = require("../models/productInfoSchema");
const Product = require("../models/productsSchema");
const User = require("../models/userSchema");

//get all orders
module.exports.getAllOrders = (req, res, next) => {
  Order.find()
    .then((Order) => {
      res.status(200).json(Order);
    })
    .catch((error) => {
      next(error);
    });
};
//get order by id
(module.exports.getOrderById = (req, res, next) => {
  Order.findOne({ _id: req.params.id })
    .then((Order) => {
      if (Order) {
        res.status(200).json(Order);
      } else {
        throw new Error("Order not found");
      }
    })
    .catch((error) => {
      next(error);
    });
}),
  //add new order
  (module.exports.addOrder = (req, res, next) => {
    let productInfoArr = req.body.productInfo;
    let prices = 50;
    for (let i = 0; i < productInfoArr.length; i++) {
      prices += productInfoArr[i].price;
      // console.log(req.body.delivery)
    }
    let OrderObj = new Order({
      user: req.body.user,
      city: req.body.city,
      street: req.body.street,
      buildingNumber: req.body.buildingNumber,
      floor: req.body.floor,
      apartment: req.body.apartment,
      notes: req.body.notes,
      products: req.body.products,
      productInfo: req.body.productInfo,
      totalPrice: prices,
      orderStatus: req.body.orderStatus,
    });

    OrderObj.save()
      .then((order) => {
        let productInfoArr = req.body.productInfo;
        // to update orders in user schema
        User.findOneAndUpdate(
          { _id: req.body.user },
          { $set: { user: req.body.user }, $push: { orders: order._id } },
          { new: true },
          function (err, user) {
            if (err) {
              console.log(err);
            }
          }
        );
        for (let i = 0; i < productInfoArr.length; i++) {
          ProductInfo.updateOne(
            { _id: req.body.productInfo[i].productInfoId },
            {
              $inc: { [productInfoArr[i].size]: -1 },
            }
          )
            .then((data) => {
              if (data.modifiedCount === 0)
                next(new Error("error in updating sizes"));
            })
            .catch((error) => {
              next(error);
            });
        }
        res.status(201).json({ order });
      })
      .catch((error) => {
        next(error);
      });
  });

//update order
module.exports.updateOrderById = (req, res, next) => {
  Order.updateOne(
    { _id: req.params.id },
    {
      $set: {
        city: req.body.city,
        street: req.body.street,
        buildingNumber: req.body.buildingNumber,
        floor: req.body.floor,
        apartment: req.body.apartment,
        notes: req.body.notes,
        orderStatus: req.body.orderStatus,
        delivery: req.body.delivery,
      },
    }
  )
    .then((data) => {
      if (data.modifiedCount == 0) {
        next(new Error("nothing to update in Order or order not found"));
      } else res.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};
//delete order
module.exports.deleteOrderById = (req, res, next) => {
  Order.deleteOne({ _id: req.params.id })
    .then((data) => {
      if (data.deletedCount === 0) next(new Error("order not found"));
      else res.status(200).json({ data: "Order deleted" });
    })
    .catch((error) => {
      nect(error);
    });
};
// get user order
module.exports.getUserOrders = (req, res, next) => {
  Order.find({
    user: req.params.id,
  })
    .select({
      user: 0,
      city: 0,
      street: 0,
      buildingNumber: 0,
      floor: 0,
      apartment: 0,
      createdAt: 0,
      updatedAt: 0,
      delivery: 0,
    })
    .populate({
      path: "products",
      select: {
        _id: 0,
        name: 1,
      },
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};
