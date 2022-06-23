const fastify = require('fastify')({logger: true, maxParamLength:400});
const port = 8080;
const host = 'localhost';
const db= require('./db')

const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
require('dotenv').config();

fastify.register(require('fastify-swagger'), {
    exposeRoute: true,
    routePrefix: '/api-docs',
    swagger: {
      info: { title: 'Fastify-api' },
    },
  });
  
fastify.register(require('fastify-formbody'))

fastify.register(require('./routes/index'));

fastify.register(require('fastify-cors'));
const remoteDatabase = new PouchDB(`${process.env.REACT_APP_COUCH_URL}/${process.env.REACT_APP_COUCH_DATABASE}`,{
    auth: {
        username: process.env.REACT_APP_COUCH_USERNAME,
        password: process.env.REACT_APP_COUCH_PASSWORD
      }
});




PouchDB.sync(db, remoteDatabase, {
    live: true,
    heartbeat: false,
    timeout: false,
    retry: true
});

const start = async() =>{
    try{
        await fastify.listen(port,host)
        fastify.log.info('Server listening on '+port);
    }
    catch(err){
        console.log(err,"error");
        fastify.log.error(err);
        process.exit(1);
    }
}



start();

