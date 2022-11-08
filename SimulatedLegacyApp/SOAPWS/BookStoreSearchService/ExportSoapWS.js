// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

"use strict";

const soap = require("soap");
const http = require("http");
const fs = require("fs");

const BookStoreEngine = require("./ContentData/BookStoreSearchEngine");
const bookStoreEngine = new BookStoreEngine();

fs.readFile(
  "./wsdl_file/WSBookStoreEngine.wsdl",
  (err, wsBookStoreDefinition) => {
    //Define the SOAP data return
    var wsBookStoreEngineDefinition = {
      WSBookStoreEngine: {
        GetBooksData: {
          GetBookPrice: (args) => ({
            parameters: bookStoreEngine.GetPrice(args.parameters),
          }),
          GetBookStock: (args) => ({
            parameters: bookStoreEngine.GetStock(args.parameters),
          }),
          GetBookName: (args) => ({
            parameters: bookStoreEngine.GetName(args.parameters),
          }),
        },
      },
    };

    var server = http.createServer(function (request, response) {
      response.end("404: Not Found: " + request.url);
    });

    //Expose server with the WSDL file + the object with the functionality
    server.listen(8080);
    soap.listen(
      server,
      "/WSBookStoreEngine",
      wsBookStoreEngineDefinition,
      wsBookStoreDefinition.toString()
    );
  }
);
