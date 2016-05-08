(function () {
  'use strict';

  angular
    .module('pm')
    .directive('items', items);

  items.$inject = [];

  /* @ngInject */
  function items() {
    return {
      templateUrl: 'app/components/items/items.html',
      bindToController: true,
      controller: ItemsController,
      controllerAs: 'vm',
      link: link,
      restrict: 'E',
      scope: {
      }
    };

    function link(scope, element, attrs) {

    }
  }

  ItemsController.$inject = ['$timeout', '$document', '$log', 'Item'];

  /* @ngInject */
  function ItemsController($timeout, $document, $log, Item) {
    var vm = this;

    (function loadItems() {
      Item.query().$promise
        .then(function (items) {
          vm.data = {
            rows: items
          };
      });
    })();

    vm.addRow = function () {
      var newItem = new Item();
      newItem.title = vm.data.newRow;
      newItem.$save()
        .then(function (item) {
          $log.log(item);
          vm.data.rows.push(item);
          vm.data.newRow = '';
        })
        .catch(function (err) {
          $log.error(err);
        });
    };

    vm.editRow = function (r) {
      r.editMode = true;
      $timeout(function() {
        var sel = 'input[row-id=":id"]'.replace(':id', r.id);
        $document[0].querySelector(sel).focus();
      });
    };

    vm.submitRow = function (r) {
      r.editMode = false;

      var editableItem = new Item();
      editableItem.id = r.id;
      editableItem.title = r.title;
      editableItem.$update()
        .then(function (item) {
          $log.log(item);
        })
        .catch(function (err) {
          $log.error(err);
        });

/*      Item.get({ id: r.id }).$promise
        .then(function (item) {
          item.title = r.title;
          return item.$update();
        })
        .then(function (item) {
          $log.log(item);
        })
        .catch(function (err) {
          $log.error(err);
        });*/
    };

    vm.removeRow = function (r) {
      var removableItem = new Item();
      removableItem.$delete({id: r.id})
        .then(function () {
          var idx = vm.data.rows.indexOf(r);
          $log.log(idx);
          if(idx !== -1) {
            vm.data.rows.splice(idx, 1);
          }
        })
        .catch(function (err) {
          $log.error(err);
        });

/*      Item.get({ id: r.id }).$promise
        .then(function (item) {
          return item.$delete({id: item.id});
        })
        .then(function (item) {
          var idx = vm.data.rows.indexOf(r);
          $log.log(idx);
          if(idx !== -1) {
            vm.data.rows.splice(idx, 1);
          }
        })
        .catch(function (err) {
          $log.error(err);
        });*/
    };
  }

})();

