// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const errors = require('feathers-errors');
const { FeathersError } = require('@feathersjs/errors');

class SupplierDeleteMessage extends FeathersError {
  constructor(message, data) {
    super(message, 'Ok', 200, 'SupplierDeleteMessage', data);
  }
}

module.exports = function (options = {}) {
  return async context => {

    // console.log("context id: ", context.id);
    // if (context.id === undefined || context.id === null || context.id === "")
    //   throw new Error("Please specify a supplier ID in the url parameter");

    // return context;


  if (context.id === undefined || context.id === null || context.id === "")
      throw new errors.BadRequest("Please specify a supplier ID in the url parameter");

    const findSupplier = await context.app.service('/suppliers').find({
      query: {
        _id: context.id.toString()
      }
    });

    if (findSupplier.total != 1) {
      throw new errors.NotFound('The provided supplier does not exist in database');
    }

     const orderToDelete = await context.app.service('/suppliers').patch(context.id,{
      "status":"Inactive"
    })


    throw new SupplierDeleteMessage("Succesfully deleted",orderToDelete);

  };
};
