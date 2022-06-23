const db = require('../db');
const ERROR_MESSAGE = require('../errorMessage.json');
const SUCCESS_MESSAGE = require("../successMessage.json");
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const fastify = require('fastify')()
fastify.register(require('fastify-multipart'), { attachFieldsToBody: true })
const fs = require('fs-extra')
const path = require('path');
fastify.addContentTypeParser('*', function (request, payload, done) {
  done()
})

//funtion to get userdata
exports.getUserdata=async(req,res)=>{


  db.find({
      selector: {
        _id:req.params.id,
        tableName: "users"
      }
    })
    .then(function (result) {
      res.send({
        status: 200,
        rows: result.docs
      })
    }).catch(function (err) {
      console.log(err, "get users error");
    });

}

//Function to add user
exports.addUser = async (req, res) => {

    db.find({
        selector: {
            phoneNumber: req.body.phoneNumber.value
        },
      }).then((getresult) =>{
          if(getresult.docs.length !==0){
            res.send({
                status: 400,
                message: ERROR_MESSAGE.ERROR_MESSAGE.USER_EXISTS
            })  
          }
          else{
            let fileContents = '';
            let currentFolder = '';
            let filename = '';
            let dprofilePic = '';
            let  doc = {
              userName: req.body.userName.value,
              nwName: req.body.nwName.value,
              village: req.body.village.value,
              mandal: req.body.mandal.value,
              district: req.body.district.value,
              email: req.body.email.value,
              phoneNumber: req.body.phoneNumber.value,
              mgo: req.body.mgo.value,
              lco: req.body.lco.value,
              ospecify: req.body.ospecify.value,
              technician: req.body.technician.value,
              cs: req.body.cs.value,
              is: req.body.is.value,
              bothcsis: req.body.bothcsis.value,
              others: req.body.others.value,
             password:req.body.phoneNumber.value,
              userStatus: 'active',
              isDeleted:0,
              tableName:"users",
        profilePic:dprofilePic
          }
        
            if (req.body.profilePic.filename !== undefined) {
              fileContents = new Buffer(req.body.profilePic._buf, 'base64');
              currentFolder = process.cwd() + '/public';
              //  let online='/var/www/html/build'; 
              filename = Date.now() + path.extname(req.body.profilePic.filename);
              // fs.writeFile('/var/www/html/build/static/img/patients/' + filename, fileContents, (err) => {
              fs.writeFile(currentFolder + '/static/img/users/' + filename, fileContents, (err) => {
                if (err) return console.error(err, "loo")
                console.log('file saved')
              })
              dprofilePic = 'img/users/' + filename
          
            } else {
              dprofilePic = "img/users/user.png";
            }
            bcrypt.hash(doc.password, 10, (err, hash) => {
                if (err) throw err;
                doc.password = hash;
                doc.profilePic=dprofilePic
                console.log(doc,"data");

                db.post(doc).then(result => {
                  
                    db.find({
                        selector: {
                          _id: result.id,
                        },
                     
                      })
                        .then((userdata) => {

                          res.send({
                            status: 200,
                          message: SUCCESS_MESSAGE.SUCCESS_MESSAGE.USER_LOGGEDIN,
                          data: userdata.docs[0],
                          
                        })
                  
                        })
                })
                    .catch(err => {
                      console.log(err,"error");
                        res.send({
                            status: 400,
                            message: ERROR_MESSAGE.ERROR_MESSAGE.USER_NOT_ADDED
                        })
                    })
        
            })
          }

      })
}

//User Login
exports.login = (req, res) => {
    let password = req.body.password;

    db.find(
      {
        selector: {
          phoneNumber: req.body.phoneNumber
      },

      }).then((result) =>{
        console.log(result,"dfkjdfk");
        if(result.docs.length === 0){
          res.send({
              status: 400,
              message: ERROR_MESSAGE.ERROR_MESSAGE.USER_NOT_EXISTS
          })  
        }
        else{
            $res = bcrypt.compare(password, result.docs[0].password)

            .then(isVerified => {
                if (isVerified) {
                  res.send({
                    status: 200,
                    message:"User Logged In Sucessfully",
                    data:result.docs[0],
                   
                })
                  // jwt.sign(
                  //   { id: result.docs[0]._id },
                  //   process.env.REACT_APP_JWT_SECRET,
                  //   { expiresIn: 3 * 86400 },
                  //   (err, token) => {
                  //     if (err) throw err;
              
                  
                  //   }
                  // );
              
                  
                }
                else {
                    res.send({
                        status: 401,
                        message: ERROR_MESSAGE.ERROR_MESSAGE.PASSWORD_INCORRECT,
                        password: 0
                    })
                }

            })
            .catch(err => console.log(err))
    }

        
    })
}



