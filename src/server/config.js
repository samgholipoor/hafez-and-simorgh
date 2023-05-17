// This is the server configuration tree.
// Guide: https://manual.os-js.org/config/#server
// Complete config tree: https://github.com/os-js/osjs-server/blob/master/src/config.js
//

const path = require('path');
const root = path.resolve(__dirname, '../../');

module.exports = {
  root,
  port: 8003,
  public: path.resolve(root, 'dist'),
  openstackAuth: {
    endpoint_v1: 'http://monster01:8080/auth/v1.0',
    endpoint_v3: 'http://192.168.1.109:5000/v3/auth',
    storage_service_name: 'swift'
  },
  scanner: {
    username: 'ma.dorosty@gmail.com',
    password: 'AliDorosty1993?'
  },
  zDriveAdmin: {
   username : 'tester',
   password: 'testing'
  }

};
        
