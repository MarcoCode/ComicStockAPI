// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    var modifiedStocks = [];
    const { data } = context;
    //checking if the stock data was provided
    if(data.stocks === undefined || data.stocks === null || data.stocks === "" || data.stocks.constructor != Array || data.stocks.constructor.length === 0 ){
      throw new Error('An order must have an array of stocks');
    }

    //checking if supplier data was provided
    if(data.supplierID === undefined || data.supplierID === null || data.supplierID === ""){

      throw new Error('An order must have a supplierID');

    }

    //checking if supplier exists in dtabase
    const findSupplier = await context.app.service('/suppliers').find({
          query: {
           _id:data.supplierID.toString()
          }
    });

    //throwing an error because supplier is not in database
    if(findSupplier.total != 1){
       throw new Error('the provided supplier does not exist in database');
    }

    //checking if purchasedPrice was provided
    if(data.status === undefined || data.status === null || data.status === ""){
      throw new Error('an order must have a status');
    }



    //validating each stock with the array of stocks
    for(var i = 0 ; i < data.stocks.length; i++){   
        
        

        //checking if the stock ID was specified
        if(data.stocks[i].stockID === undefined || data.stocks[i].stockID === null|| data.stocks[i].stockID === "" )
          throw new Error(`the provided stock at position ${i} does not include a stock id`);

         

        //checking if the purchased price was specified
        if(data.stocks[i].purchasedPrice === undefined || data.stocks[i].purchasedPrice === null|| data.stocks[i].purchasedPrice === "" )
          throw new Error(`the provided stock at position ${i} does not include a purchased price`);   

        //checking if the quantity was specified
        if(data.stocks[i].quantity === undefined || data.stocks[i].quantity === null|| data.stocks[i].quantity === "" )
          throw new Error(`the provided stock at position ${i} does not include a quantity`);
        
        //converting variable to right data type to avoid injection attacks
        data.stocks[i].quantity = parseInt(data.stocks[i].quantity.toString());
        data.stocks[i].stockID = data.stocks[i].stockID.toString();
        data.stocks[i].purchasedPrice = parseFloat(data.stocks[i].purchasedPrice.toString());

        //checking if the stock exists in db      
        const findstockID = await context.app.service('/stock').find({
          query: {
            _id:data.stocks[i].stockID.toString()
          }
        });

        modifiedStocks[modifiedStocks.length] = findstockID.data[0];

         //throwing an error if stock does not exist
        if(findstockID.total != 1)
          throw new Error(`the provided stock ID ${data.stocks[i].stockID} does not exist in database`);

         //throwing an error if stock does not exist

         debugger;
         
        if( parseInt(findstockID.data[0].stockAvailable) < data.stocks[i].quantity )
          throw new Error(`the quantity requested for the stock ${data.stocks[i].stockID} is greater than the quantity available in database`);         
         
    }    
    
    //reducing the quatitu in each stock where the order was made
    
    for(var i = 0 ; i < data.stocks.length; i++){   

        modifiedStocks[i].stockAvailable -=  data.stocks[i].quantity;
        
          context.app.service('/stock').update(data.stocks[i].stockID, modifiedStocks[i]);
    }
    


   





    context.data = {
      stocks : data.stocks,
      supplierID: data.supplierID.toString(),
      status: data.status.toString()
    }


    return context;
  };
};
