var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'pm'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://root:yourpassword@localhost:3306/pm-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'pm'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://localhost/pm-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'pm'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://localhost/pm-production'
  }
};

module.exports = config[env];
