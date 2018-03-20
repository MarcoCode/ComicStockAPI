// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    //Filtering the Inactive Suppliers, only returns 'Active' Ssuppliers
    var Arr = context.result.data.filter(filterSupplier);

    function filterSupplier(supplier){
      return supplier.status === "Active";
    }
    context.result.total = Arr.length;
    context.result.data = Arr;
    
    return context;
  };
};