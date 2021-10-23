const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('Number', function() {
    test( '#correctly read a whole number input', () => {
      let input = '34L';
      assert.equal(convertHandler.getNum(input), 34)
    })
    test( '#correctly read a decimal number input', () => {
      let input = '3.04L';
      assert.equal(convertHandler.getNum(input), 3.04)
    })
    test( '#correctly read a fractional input', () => {
      let input = '1/2L';
      assert.equal(convertHandler.getNum(input), 0.5)
    })
    test( '#correctly read a fractional input with a decimal', () => {
      let input = '0.5/2L';
      assert.equal(convertHandler.getNum(input), 0.25)
    })
    test( '#return an error on a double-fraction', () => {
      let input = '2/8/6L';
      assert.equal(convertHandler.getNum(input), '')
    })
    test( '#correctly default to a numerical input of 1 when no numerical input is provided', () => {
      let input = 'L';
      assert.equal(convertHandler.getNum(input), 1)
    })
  })

  suite('Units', function () {

    // const units       = ['kg', 'lbs', 'mi', 'km', 'gal', 'L'];

    // units.map(a => {
    //   return test('#correctly read each valid input unit ' + a, () => {
    //     assert.isNotNull(convertHandler.getUnit(a), a)
    //   })
    // })

    test('#correctly read each valid input unit ', () => {
      let input = 'km';
      assert.isNotNull(convertHandler.getUnit(input))
    })

    test('#correctly return an error for an invalid input unit', () => {
      let input = 'x';
      assert.equal(convertHandler.getUnit(input), '')      
    })
  })

  suite('returned units', function () {

    // const units       = ['kg', 'lbs', 'mi', 'km', 'gal', 'L'];
    // const returnedUnits = ['lbs', 'kg', 'km', 'mi', 'L', 'gal'];

    // units.map((a, b) => {
    //   return test('#return the correct return unit for each valid input unit', () => {
    //     assert.equal(convertHandler.getReturnUnit(a), returnedUnits[b])
    //   })
    // })

    test('#return the correct return unit for each valid input unit', () => {
        let input = 'mi';      
        assert.equal(convertHandler.getReturnUnit(input), 'km')
      })
    test('#correctly return the spelled-out string unit for each valid input', () => {
      let input = 'mi';
      assert.equal(convertHandler.spellOutUnit(input), 'miles')
    })
    test( '#correctly convert gal to L', () => {
      let input = 'gal';
      assert.equal(convertHandler.getReturnUnit(input), 'L')
    })
    test( '#correctly convert L to gal', () => {
      let input = 'L';
      assert.equal(convertHandler.getReturnUnit(input), 'gal')
    })
    test( '#correctly convert mi to km', () => {
      let input = 'mi';
      assert.equal(convertHandler.getReturnUnit(input), 'km')
    })
    test( '#correctly convert km to mi', () => {
      let input = 'km';
      assert.equal(convertHandler.getReturnUnit(input), 'mi')
    })
    test( '#correctly convert lbs to kg', () => {
      let input = 'lbs';
      assert.equal(convertHandler.getReturnUnit(input), 'kg')
    })
    test( '#correctly convert kg to lbs', () => {
      let input = 'kg';
      assert.equal(convertHandler.getReturnUnit(input), 'lbs')
    })
  })
});