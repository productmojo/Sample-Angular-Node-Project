(function () {
  'use strict';

  angular
    .module('pm')
    .provider('Item', itemProvider);

  /* @ngInject */
  function itemProvider() {
    var endpoint = '/api/items/:id';

    function setEndpoint(val) {
      endpoint = val;
    }

    function $get($resource) {
      return $resource(endpoint, { id: '@_id' }, {
        update: {
          method: 'PUT'
        }
      });
    }

    $get.$inject = ['$resource'];

    return {
      setEndpoint: setEndpoint,
      $get: $get
    };
  }

})();

