// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    const { data } = context;

    if(data.stockID === undefined || data.stockID === null || data.stockID === ""){
      throw new Error('An order must have a stockID');
    }
    const findstockID = await context.app.service('/stock').find({
      query: {
        _id:data.stockID.toString()
      }
    });

    if(findstockID.total != 1){
    throw new Error('the provided stock does not exist in database');
    }

    if(data.supplierID === undefined || data.supplierID === null || data.supplierID === ""){
      throw new Error('A order must have a supplierID');
    }

    const findSupplier = await context.app.service('/suppliers').find({
          query: {
           _id:data.supplierID.toString()
          }
    });

    if(findSupplier.total != 1){
       throw new Error('the provided supplier does not exist in database');
    }


    if(data.quantity === undefined || data.quantity === null || data.quantity === ""){
      throw new Error('A order must have a quantity');
    }
      if(data.purchasedPrice === undefined || data.purchasedPrice === null || data.purchasedPrice === ""){
      throw new Error('A order must have a purchased Price');
    }

    

    context.data = {
      stockID: data.stockID.toString(),
      supplierID: data.supplierID.toString(),
      purchasedPrice: data.purchasedPrice.toString(),
      quantity: parseInt(data.quantity)
    }


    return context;
  };
};
