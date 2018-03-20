// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const errors = require('feathers-errors');
const { FeathersError } = require('@feathersjs/errors');

//Using custom 'Success' error, since the Delete shouldn't remove the db entry, simply update the status (Soft Delete)
class OrderDeleteMessage extends FeathersError {
  constructor(message, data) {
    super(message, 'Ok', 200, 'OrderDeleteMessage', data);
  }
}

module.exports = function (options = {}) {
  return async context => {

  if (context.id === undefined || context.id === null || context.id === "")
      throw new errors.BadRequest("Please specify a supplier ID in the url parameter");

    const findOrder = await context.app.service('/orders').find({
      query: {
        _id: context.id.toString()
      }
    });

    if (findOrder.total != 1) {
      throw new errors.NotFound('The provided order does not exist in database');
    }


     const orderToDelete = await context.app.service('/orders').update(context.id,{
      "status":"Cancelled"
    })

//Throwing 'success' message to confirm that the status of the order has been changed (Soft Delete)
    throw new OrderDeleteMessage("Succesfully deleted Order: ",orderToDelete);
  };
};
