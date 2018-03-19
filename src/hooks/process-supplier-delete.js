// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const errors = require('feathers-errors');
module.exports = function (options = {}) {
  return async context => {

    // console.log("context id: ", context.id);
    // if (context.id === undefined || context.id === null || context.id === "")
    //   throw new Error("Please specify a supplier ID in the url parameter");

    // return context;
    return async context => {
      return new errors.Forbidden("You can not delete an order, please edit it and change its status");
    };
  };
};
