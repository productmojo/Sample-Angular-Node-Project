(function() {
  'use strict';

  angular
    .module('pm')
    .controller('MainController', MainController);

  MainController.$inject = ['$timeout'];

  /** @ngInject */
  function MainController($timeout) {
    var vm = this;

    vm.rows = [{
        id: 1,
        title: 'test1'
      }, {
        id: 2,
        title: 'test2'
      }
    ];
  }
})();
