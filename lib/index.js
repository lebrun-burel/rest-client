'use strict';

var jQuery = require('./jquery');
var Superagent = require('./superagent');
var Request = require('./request');
var Fetch = require('./fetch');
var Axios = require('./axios');
var Angular = require('./angular');
var Base = require('./base');
var AngularHttpClient = require('./angular-http-client');

var transports = {
  jquery: jQuery,
  superagent: Superagent,
  request: Request,
  fetch: Fetch,
  axios: Axios,
  angular: Angular,
  angularHttpClient: AngularHttpClient
};

function restClient() {
  var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var result = { Base: Base };

  Object.keys(transports).forEach(function (key) {
    var Service = transports[key];

    result[key] = function (connection) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!connection) {
        throw new Error(key + ' has to be provided to feathers-rest');
      }

      var defaultService = function defaultService(name) {
        return new Service({ base: base, name: name, connection: connection, options: options });
      };

      var initialize = function initialize() {
        if (typeof this.defaultService === 'function') {
          throw new Error('Only one default client provider can be configured');
        }

        this.rest = connection;
        this.defaultService = defaultService;
      };

      initialize.Service = Service;
      initialize.service = defaultService;

      return initialize;
    };
  });

  return result;
}

module.exports = restClient;
module.exports.default = restClient;