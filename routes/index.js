
//User Controller

const usersController = require("../controllers/usersController");
const verifyToken = require('../controllers/auth/verifyToken')
const {
  loginSchema,
  getHeaders,
  getIdandRev,
  addBinSchema,
  addItemSchema,
  getBinItemsSchema,
  updateItemSchema



} = require('../controllers/schemas/users.js');

const login = {
  schema: loginSchema,
  handler: usersController.login,
};



const addbin={
  schema:addBinSchema,
  handler:usersController.addbin
}

const additem={
  schema:addItemSchema,
  handler:usersController.additem
}


const getbins={
  schema:getHeaders,
  handler:usersController.getbins
}

const getBinItems={
  schema:getBinItemsSchema,
  handler:usersController.getbinitems
}

const updateItem={
  schema:updateItemSchema,
  handler:usersController.updateitem
}

const deleteBinItem={
  schema:getIdandRev,
  handler:usersController.deleteitem
}



async function routes (fastify, options,done) {

    fastify.register(require('fastify-multipart'), { attachFieldsToBody: true })
    fastify.post('/api/user', usersController.addUser);
    fastify.post('/api/login',usersController.login);

  fastify.register(require('fastify-auth')).after(() => privateRoutes(fastify));

  done();
   
   



}

async function privateRoutes (fastify, options) {
  fastify.get('/api/getuserdata:id',usersController.getUserdata)
 
}
module.exports = routes;