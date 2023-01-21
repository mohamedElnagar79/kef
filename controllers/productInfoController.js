const ProductInfo = require("../models/productInfoSchema");
const Product = require("../models/productsSchema");
const fs = require("fs");

//find all product info
module.exports.getAllProductInfo = (req, res, next) => {
  ProductInfo.find({})
    .then((productInfo) => {
      res.status(200).json(productInfo);
    })
    .catch((error) => {
      next(error);
    });
};

//find one product info by id
module.exports.getProductInfoById = (req, res, next) => {
  ProductInfo.findOne({ _id: req.params.id })
    .then((productInfo) => {
      if (productInfo) {
        res.status(200).json(productInfo);
      } else {
        throw new Error("product info not found");
      }
    })
    .catch((error) => {
      next(error);
    });
};

// add product info
module.exports.addProductInfo = (req, res, next) => {
  let path = [];
  if (req.files) {
    if (req.files.length >= 2) {
      for (i = 0; i < req.files.length; i++) {
        path.push(`http://localhost:8081/products/${req.files[i].filename}`);
      }
    } else {
      throw new Error("minimum length for images is 2");
    }
  } else {
    path = ["https://www.w3schools.com/howto/img_avatar.png"];
  }
  let ProductInfoObject = new ProductInfo({
    productId: req.body.productId,
    colors: req.body.colors,
    images: path,
    medium: req.body.medium,
    large: req.body.large,
    xlarge: req.body.xlarge,
  });
  ProductInfoObject.save()
    .then((productInfo) => {
      Product.findOne({ _id: productInfo.productId })
        .then((product) => {
          if (product) {
            if (!product.productInfoId.includes(productInfo._id)) {
              product.productInfoId.push(productInfo._id);
              return product
                .save()
                .then(res.status(200).json({ product, productInfo }));
            } else {
              next(new Error("product info id is already added"));
            }
          } else {
            next(new Error("product id is not found"));
          }
        })
        .catch((error) => {
          next(error);
        });
    })
    .catch((error) => next(error));
};

//update product info by id
module.exports.updateProductInfoById = (req, res, next) => {
  ProductInfo.findOne({ _id: req.params.id })
    .then((productInfo) => {
      if (productInfo) {
        let bodyData = req.body;
        if (req.files) {
          if (productInfo.images.length + req.files.length > 6) {
            throw new Error(
              `maximum images to be added is ${6 - productInfo.images.length}`
            );
          } else {
            console.log(">>>>>>", req.files);
            for (i = 0; i < req.files.length; i++) {
              productInfo.images.push(
                `http://localhost:8081/products/${req.files[i].filename}`
              );
            }
          }
        }
        for (let key in bodyData) {
          if (req.body._id) {
            throw new Error("can't update ID");
          } else productInfo[key] = bodyData[key];
        }
        return productInfo
          .save()
          .then(res.status(200).json({ data: productInfo }));
      } else {
        throw new Error("productInfo not found");
      }
    })
    .catch((error) => {
      next(error);
    });
};

//delete product info by id
module.exports.deleteProductInfoById = (req, res, next) => {
  ProductInfo.findOne({ _id: req.params.id })
    .then((productInfo) => {
      if (productInfo) {
        Product.updateOne(
          { _id: productInfo.productId },
          { $pull: { productInfoId: { $eq: req.params.id } } }
        )
          .then((data) => {
            if (data.modifiedCount === 0)
              next(new Error("product info not found"));
            else {
              ProductInfo.deleteOne({ _id: req.params.id })
                .then((data) => {
                  if (data.deletedCount === 0)
                    next(new Error("product info not found"));
                  else {
                    res.status(200).json({ data: "deleted" });
                  }
                })
                .catch((error) => {
                  next(error);
                });
            }
          })
          .catch((error) => {
            next(error);
          });
      }else{next(new Error("product info not found"))}
    })
    .catch((error) => {
      next(error);
    });
};

//delete image from product info
module.exports.deleteImage = (req, res, next) => {
  let path = req.body.images.split("products")[1];
  console.log("path>>", path);
  ProductInfo.updateOne(
    { _id: req.params.id },
    { $pull: { images: { $eq: req.body.images } } }
  )
    .then((data) => {
      if (data.modifiedCount === 0) next(new Error("product not found"));
      else {
        fs.unlink("./products/" + path, (error) => {
          if (error) next(error);
          res.status(200).json({ data: "image deleted" });
        });
      }
    })
    .catch((error) => {
      next(error);
    });
};
