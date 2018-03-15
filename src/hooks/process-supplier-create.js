// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    const { data } = context;

    if(data.name === undefined || data.name === null || data.name === ""){
      throw new Error('A supplier must have a name');
    }
    if(data.city === undefined || data.city === null || data.city === ""){
      throw new Error('A supplier must have a city');
    }
    if(data.reference === undefined || data.reference === null || data.reference === ""){
      throw new Error('A supplier must have a reference');
    }

    context.data = {
      name: data.name.toString(),
      city: data.city.toString(),
      reference: data.reference.toString(),
    }


    return context;
  };
};
