// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

"use strict";
const xml2js = require("xml2js");

// Some default settings needed by xml2js. We can leave the as they are.
var options = {
  // options passed to xml2js parser
  explicitCharkey: false,
  trim: false, // trim the leading/trailing whitespace from text nodes
  normalize: false, // trim interior whitespace inside text nodes
  explicitRoot: false, // return the root node in the resulting object?
  emptyTag: null, // the default value for empty nodes
  explicitArray: true, // always put child nodes in an array
  ignoreAttrs: false, // ignore attributes, only create text nodes
  mergeAttrs: false, // merge attributes and child elements
  validator: null, // a callable validator
};

const BookStoreEngine = require("./ContentData/BookStoreSearchEngine");
var bookStoreEngine = new BookStoreEngine();

//default handler of lambda
exports.lambdaHandler = (event, context, callback) => {
  var parser = new xml2js.Parser(options);
  let xml;

  //Need to work on this with VS Context:
  try {
    if (event.headers["Context"] === "VisualStudio-Test") {
      //Structure for launch.json in the VSCode, the debugger will go for this:
      let jsonpayload = JSON.parse(event.body);
      xml = jsonpayload.body;
    } else {
      //After deployed the code the solution will go for this direction. The payload from VSCode and API Gateway are different.
      xml = event.body;
    }
  
    parser.parseString(xml, (err, result) => {
      if(err)
      {
        var resperror = {
          statusCode: 500,
          headers: {
            "Content-Type": "text/xml",
          },
          message: "Internal server error"
        };
        return callback(null, resperror);
      }
      let operationOutput;
  
      if (result["soap:Body"][0]["tns:WSBookStoreIDStockIn"] !== undefined)
        operationOutput = "WSBookStoreEngineStockOutput";
      else if (
        result["soap:Body"][0]["tns:WSBookStoreIDBookNameIn"] !== undefined
      )
        operationOutput = "WSBookStoreEngineBookNameOutput";
      else operationOutput = "WSBookStoreEnginePriceOutput";
  
      let value;
  
      switch (operationOutput) {
        case "WSBookStoreEngineStockOutput":
          value = bookStoreEngine.GetStock(
            result["soap:Body"][0]["tns:WSBookStoreIDStockIn"][0][
              "tns:parameters"
            ][0]
          );
          break;
  
        case "WSBookStoreEngineBookNameOutput":
          value = bookStoreEngine.GetName(
            result["soap:Body"][0]["tns:WSBookStoreIDBookNameIn"][0][
              "tns:parameters"
            ][0]
          );
          break;
  
        default:
          value = bookStoreEngine.GetPrice(
            result["soap:Body"][0]["tns:WSBookStoreIDPriceIn"][0][
              "tns:parameters"
            ][0]
          );
          break;
      }
        
      let xmlResponse = `
      <?xml version="1.0" encoding="utf-8"?>
          <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
              <soap:Body>
                  <${operationOutput}>
                      <parameters>${value}</parameters>
                  </${operationOutput}>
              </soap:Body>
          </soap:Envelope>`;
  
      var resp = {
        statusCode: 200,
        headers: {
          "Content-Type": "text/xml",
        },
  
        body: xmlResponse,
      };
      callback(null, resp);
    });
  } catch (error) {
    var resperror = {
      statusCode: 500,
      headers: {
        "Content-Type": "text/xml",
      },
      message: "Internal server error"
    };
    console.error(error);

    callback(null, resperror);
  }
};
