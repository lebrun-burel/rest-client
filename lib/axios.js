'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Base = require('./base');

var AxiosService = function (_Base) {
  _inherits(AxiosService, _Base);

  function AxiosService() {
    _classCallCheck(this, AxiosService);

    return _possibleConstructorReturn(this, (AxiosService.__proto__ || Object.getPrototypeOf(AxiosService)).apply(this, arguments));
  }

  _createClass(AxiosService, [{
    key: 'request',
    value: function request(options) {
      var config = {
        url: options.url,
        method: options.method,
        data: options.body,
        headers: Object.assign({
          Accept: 'application/json'
        }, this.options.headers, options.headers)
      };

      return this.connection.request(config).then(function (res) {
        return res.data;
      }).catch(function (error) {
        var response = error.response || error;

        throw response instanceof Error ? response : response.data || response;
      });
    }
  }]);

  return AxiosService;
}(Base);

module.exports = AxiosService;