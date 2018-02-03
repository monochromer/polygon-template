let combinerObj = require('stream-combiner2').obj;

function combiner() {
  return combinerObj.apply(combinerObj, arguments);
};

module.exports = combiner;
