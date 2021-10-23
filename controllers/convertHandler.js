const math = require('mathjs')

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;

    let number = input.match(/[^a-z]+/ig) || ['1'];
        number = number.join('');

    if (number.match(/\/+/g)) {
      if(number.match(/\/+/g).length > 1) {
        result = '';
        return result;
      }
    }

    try {
      result = math.evaluate(number);
      return result;
    } catch(e) {
      result = '';
      return result;
    }
  };
  
  this.getUnit = function(input) {
    let result;

    const allowedUnits = {
      kg  : 'kg',
      lbs : 'lbs', 
      mi  : 'mi', 
      km  : 'km', 
      gal : 'gal', 
      l   : 'L'
    };

    let unit    = input.match(/[a-z]+/ig) || [''];
    let string  = unit.join('').replace(/\s+/g, '').toLowerCase('');
        result  = allowedUnits[string] || '';

    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;

    switch(initUnit) {
      case 'gal':
        result = 'L';
        break;
      case 'L':
        result = 'gal';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      default:
        result = '';
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    const fullForm = {
      mi  : 'miles',
      km  : 'kilometers',
      lbs : 'pounds',
      kg  : 'kilograms',
      gal : 'gallons',
      L   : 'liters'
    }

    result = fullForm[unit];

    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL  = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm  = 1.60934;
    let result = 0;

    switch(initUnit) {
      case 'gal':
        result = parseFloat(initNum * galToL).toFixed(5);
        break;
      case 'L':
        result = parseFloat(initNum / galToL).toFixed(5);
        break;
      case 'lbs':
        result = parseFloat(initNum * lbsToKg).toFixed(5);
        break;
      case 'kg':
        result = parseFloat(initNum / lbsToKg).toFixed(5);
        break;
      case 'mi':
        result = parseFloat(initNum * miToKm).toFixed(5);
        break;
      case 'km':
        result = parseFloat(initNum / miToKm).toFixed(5);
        break;
      default:
        result = 0;
    }

    result = Number(result);
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
  };
  
}

module.exports = ConvertHandler;
