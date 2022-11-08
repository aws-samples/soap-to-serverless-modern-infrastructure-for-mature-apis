// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

"use strict";

//import the class for the object
var BookStoreItem = require("./BookStoreItem");
const jsonlistofproducts = require("./featureddata.json");

module.exports = class InventoryOfFeaturedProducts {
  //private fields
  #_allbooksdata;

  constructor() {
    this.#_allbooksdata = [];

    this.#_allbooksdata = jsonlistofproducts.featureddata.map(
      (product) =>
        new BookStoreItem(
          product.productid,
          product.pricevalue,
          product.productname,
          product.productstock
        )
    );
  }

  GetStock(id) {
    return this.#_allbooksdata
      .find((book) => book.ProductId() === id)
      .ProductStock();
  }

  GetPrice(id) {
    return this.#_allbooksdata
      .find((book) => book.ProductId() === id)
      .PriceValue();
  }

  GetName(id) {
    return this.#_allbooksdata
      .find((book) => book.ProductId() === id)
      .ProductName();
  }
};
