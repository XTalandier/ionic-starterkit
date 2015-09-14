// Ionic Starter App

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
  .config(function ($stateProvider, $urlRouterProvider) {
    console.log('CONFIGURATOR');
    $stateProvider

      .state('app', {
        url: '/app',
        templateUrl: 'menu.html',
        controller: 'AppCtrl'
      })

      .state('app.search', {
        url: '/search',
        views: {
          'menuContent': {
            templateUrl: 'search.html'
          }
        }
      })

      .state('app.browse', {
        url: '/browse',
        views: {
          'menuContent': {
            templateUrl: 'browse.html'
          }
        }
      })
      .state('app.playlists', {
        url: '/playlists',
        views: {
          'menuContent': {
            templateUrl: 'playlists.html',
            controller: 'PlaylistsCtrl'
          }
        }
      })

      .state('app.addcode', {
        url: '/addcode',
        views: {
          'menuContent': {
            templateUrl: 'addcode.html',
            controller: 'PlaylistsCtrl'
          }
        }
      })

      .state('app.single', {
        url: '/playlists/:playlistId',
        views: {
          'menuContent': {
            templateUrl: 'playlist.html',
            controller: 'PlaylistCtrl'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app');
  })
  .run(function ($ionicPlatform) {
    console.log('RUNATOR');
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  });
