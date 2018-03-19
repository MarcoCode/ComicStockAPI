// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    console.log("result ", context.result)

    var Arr = context.result.data.filter(function (supplier) {
      supplier.status !== 'Inactive'
    });
    context.result.total = Arr.length;
    context.result.data = Arr;
    
    return context;
  };
};
