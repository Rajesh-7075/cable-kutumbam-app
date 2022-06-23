const typeString = { type: 'string' }; // since i will be using this type a lot
const typeNumber ={type:'number'};



const headerSchema = {
  type: 'object',
  required: ['token'],
  properties: {
    token: typeString,
  },
};



const loginSchema = {
  body: {
    type: 'object',
    required: ['password','email'],
    properties: {
      password: typeString,
      email:typeString
    },
  }
};




const getHeaders = {
  headers: headerSchema
};



const getIdandRev = {
  headers: headerSchema,
  params: {
    id: { type: 'string' },
    rev: { type: 'string' }
  },

};

const addBinSchema = {
  headers: headerSchema,
  body: {
    type: 'object',
    properties: {
      name: typeString,
      note: typeString
    },
  }

}

const addItemSchema = {
  headers: headerSchema,
  body: {
    type: 'object',
    properties: {
      name: typeString,
      quantity: typeNumber,
      items: typeNumber,
      binid: typeString
    },
  }

}

const getBinItemsSchema = {
  headers: headerSchema,
  params: {
    binid: { type: 'string' }
    },

};

const updateItemSchema = {
  headers: headerSchema,
  body: {
    type: 'object',
    properties: {
      quantity: typeNumber,
      id: typeString
    },
  }

}


module.exports = {
  addBinSchema,
  loginSchema,
  getHeaders,
  getIdandRev,
  addItemSchema,
  getBinItemsSchema,
  updateItemSchema






};
