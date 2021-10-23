'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app
  .route('/api/convert')
  .get((req, res) => {
    const {input} = req.query;

    const initNum         = convertHandler.getNum(input);
    const initUnit        = convertHandler.getUnit(input);
    const returnNum       = convertHandler.convert(initNum, initUnit);
    const returnUnit      = convertHandler.getReturnUnit(initUnit);
    const initUnitFull    = convertHandler.spellOutUnit(initUnit);
    const returnUnitFull  = convertHandler.spellOutUnit(returnUnit);
    const string          = convertHandler.getString(initNum, initUnitFull, returnNum, returnUnitFull);

    if (initNum && !initUnit) {
      res.send('invalid unit')
    }
    else if (!initNum && initUnit) {
      res.send('invalid number')
    }
    else if (!initNum && !initUnit) {
      res.send('invalid number and unit')
    }
    else {
      res.json({initNum, initUnit, returnNum, returnUnit, string})
    }
  })

};
