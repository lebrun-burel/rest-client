'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Base = require('./base');

var SuperagentService = function (_Base) {
  _inherits(SuperagentService, _Base);

  function SuperagentService() {
    _classCallCheck(this, SuperagentService);

    return _possibleConstructorReturn(this, (SuperagentService.__proto__ || Object.getPrototypeOf(SuperagentService)).apply(this, arguments));
  }

  _createClass(SuperagentService, [{
    key: 'request',
    value: function request(options) {
      var superagent = this.connection(options.method, options.url).set(this.options.headers || {}).set('Accept', 'application/json').set(options.headers || {}).type(options.type || 'json');

      return new Promise(function (resolve, reject) {
        superagent.set(options.headers);

        if (options.body) {
          superagent.send(options.body);
        }

        superagent.end(function (error, res) {
          if (error) {
            try {
              var response = error.response;
              error = JSON.parse(error.response.text);
              error.response = response;
            } catch (e) {}

            return reject(error);
          }

          resolve(res && res.body);
        });
      });
    }
  }]);

  return SuperagentService;
}(Base);

module.exports = SuperagentService;