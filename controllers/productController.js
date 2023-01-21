const Product = require("../models/productsSchema");

//get all products
module.exports.getAllProducts = (req, res, next) => {
  Product.find({})
    .populate({
      path: "productInfoId",
      select: {
        _id: 0,
        colors: 1,
        images: 1,
      },
    })
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((error) => {
      next(error);
    });
};

//get product by id
module.exports.getProductById = (req, res, next) => {
  Product.findOne({ _id: req.params.id })
    .populate({
      path: "productInfoId",
      select: {
        colors: 1,
        images: 1,
        medium: 1,
        large: 1,
        xlarge: 1,
      },
    })
    .then((product) => {
      if (product) {
        res.status(200).json(product);
      } else {
        throw new Error("product not found");
      }
    })
    .catch((error) => {
      next(error);
    });
};

//add new product
module.exports.addNewProduct = (req, res, next) => {
  let ProductObj = new Product({
    name: req.body.name,
    category: req.body.category,
    gender: req.body.gender,
    sale: req.body.sale,
    salePrice: req.body.salePrice,
    price: req.body.price,
    newCollection: req.body.newCollection,
  });
  ProductObj.save()
    .then((product) => {
      res.status(201).json({ product });
    })
    .catch((error) => {
      next(error);
    });
};

//update product by id
module.exports.updateProductById = (req, res, next) => {
  Product.updateOne(
    { _id: req.params.id },
    {
      name: req.body.name,
      category: req.body.category,
      gender: req.body.gender,
      sale: req.body.sale,
      salePrice: req.body.salePrice,
      price: req.body.price,
      newCollection: req.body.newCollection,
    }
  )
    .then((product) => {
      if (req.body.productInfoId) {
        next(new Error("product info id can't be updated"));
      } else if (product.modifiedCount === 0)
        next(new Error("product dosent change or not found"));
      else res.status(200).json({ product });
    })
    .catch((error) => {
      next(error);
    });
};

//delete product
module.exports.deleteProductById = (req, res, next) => {
  Product.deleteOne({ _id: req.params.id })
    .then((data) => {
      if (data.deletedCount === 0) next(new Error("product not found"));
      else res.status(200).json({ data: "deleted" });
    })
    .catch((error) => {
      next(error);
    });
};
