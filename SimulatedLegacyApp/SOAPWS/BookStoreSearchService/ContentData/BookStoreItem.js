// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

"use strict";

module.exports = class BookStoreItem {
  #_productid;
  #_productname;
  #_pricevalue;
  #_productstock;

  constructor(productid, pricevalue, productname, productstock) {
    this.#_productid = productid;
    this.#_productname = productname;
    this.#_pricevalue = pricevalue;
    this.#_productstock = productstock;
  }

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
