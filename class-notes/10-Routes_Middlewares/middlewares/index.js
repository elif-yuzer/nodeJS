"use strict";
/* -------------------------------------------------------
                EXPRESSJS - MIDDLEWARES
------------------------------------------------------- *

const middleFunc1 = (req, res, next) => {

    req.message1 = 'middleFunc1 started.'
    next()
}

const middleFunc2 = (req, res, next) => {
    
    req.message2 = 'middleFunc2 started.'
    next()
}

// module.exports = [ middleFunc1, middleFunc2 ]
module.exports = { middleFunc1, middleFunc2 }

/* ------------------------------------------------------ *

module.exports.middleFunc1 = (req, res, next) => {
  req.message1 = "middleFunc1 started.";
  next();
};

module.exports.middleFunc2 = (req, res, next) => {
  req.message2 = "middleFunc2 started.";
  next();
};

/* ------------------------------------------------------ */

/* module.exports = {
  middleFunc1: (req, res, next) => {
    req.message1 = "middleFunc1 started.";
    next();
  },
  middleFunc2: (req, res, next) => {
    req.message2 = "middleFunc2 started.";
    next();
  },
};
 */
// module.exports = obj

const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("bu bir middleware");
});

app.use((req, res, next) => {
  console.log("2. middleware");
  next();
});

app.get("/", (req, res) => {
  console.log("route handler");
  res.send("hello");
});

app.listen(3000, () => {
  console.log("Server çalışıyor");
});
