import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

PouchDB.plugin(PouchDBFind);
const localDB = new PouchDB(process.env.REACT_APP_COUCH_DATABASE);
const remoteDB = new PouchDB('http://localhost:5984/inventoryapp',{
  auth: {
      username: process.env.REACT_APP_COUCH_USERNAME,
      password: process.env.REACT_APP_COUCH_PASSWORD
    }
});

const dbHelpers = {
  localDB: localDB,
  remoteDB: remoteDB,

  // getBins: function () {
  //   localDB.sync(remoteDB, {retry: true, live: true}).on('complete', function (e) {
  //      console.log('sync success', e)
  //  }).on('error', function (err) {
  //      console.log('Failed to sync', err);
  //    });

  //   return localDB.find({
  //     selector: {
  //         tableName:"bins"
  //     }
  //   })
  //     .then(function(response){
  //       return response.rows;
  //     })
  //     .catch(function (err) {
  //       console.warn('Failed to getUsers', err)
  //     });
  // },

  // addUser: function (doc) {
  //   return localDB.put(doc, function(err, response) {
  //     if (err) {
  //       return console.log(err);
  //     } else {
  //       /*localDB.sync(remoteDB, {retry: true, live: true}).on('complete', function (e) {
  //         console.log('sync success', e)
  //       }).on('error', function (err) {
  //         console.log('Failed to sync', err);
  //       });*/
  //       console.log("Document created Successfully");
  //     }
  //   });
  // },


  addBin: function (doc) {
    return localDB.post(doc, function(err, response) {
      if (err) {
        return console.log(err);
      } else {
        localDB.sync(remoteDB, {retry: true, live: true}).on('complete', function (e) {
          console.log('sync success', e)
        }).on('error', function (err) {
          console.log('Failed to sync', err);
        });
        console.log("Document created Successfully");
      }
    });
  },


  docToJSON: function (doc) {
    return {
      name:doc.name,
      note:doc.note,
      createdDate: doc.date,
      tableName: doc.tableName,
  
    }
  }
  
};

export default dbHelpers;