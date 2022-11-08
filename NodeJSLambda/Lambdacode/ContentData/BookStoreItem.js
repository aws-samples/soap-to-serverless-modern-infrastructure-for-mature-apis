// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

"use strict";

module.exports = class BookStoreItem {
  //create the private fields:
  #_productid;
  #_productname;
  #_pricevalue;
  #_productstock;

  constructor(productid, pricevalue, productname, productstock) {
    //constructor with all the information per object of the e-commerce:
    this.#_productid = productid;
    this.#_productname = productname;
    this.#_pricevalue = pricevalue;
    this.#_productstock = productstock;
  }

  //create the geters of the class:
  ProductId() {
    return this.#_productid;
  }

  ProductName() {
    return this.#_productname;
  }

  PriceValue() {
    return this.#_pricevalue;
  }

  ProductStock() {
    return this.#_productstock;
  }
};
