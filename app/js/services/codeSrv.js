angular.module('starter.services', []).service('CodeService', ['$q', '$http', function ($q, $http) {
  function validateCode(code) {
    var def = $q.defer();
    setTimeout(function(){
      def.success('yes');
    }, 1000);

    return def.promise;
  }

  return {
    validateCode: validateCode
  };

}]);
