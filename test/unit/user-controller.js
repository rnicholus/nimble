describe("User controller", function() {
    var controller, q, scope, timeout;

    beforeEach(function() {
        module("nimble");
        inject(function($rootScope, $controller, $q, $timeout) {
            scope = $rootScope.$new();
            controller = $controller;
            q = $q;
            timeout = $timeout;
        });
    });

    it("should not attempt get user info if the user is not logged in", function() {
        var userController = controller("userController", {
            $scope: scope,
            user: {
                isLoggedIn: function() {return false;},
                getInfo: function() {
                    throw new Error("Should not be calling getInfo!");
                }
            }
        });
    });

    it("should set the user's avatar if the user is logged in", function() {
        var userController = controller("userController", {
            $scope: scope,
            user: {
                isLoggedIn: function() {return true;},
                getInfo: function() {
                    var deferred = q.defer();
                    deferred.resolve({avatar_url: "http://garstasio.com"});
                    return deferred.promise;
                }
            }
        });

        scope.$root.$digest();
        expect(scope.avatarUrl).toEqual("http://garstasio.com");
    });

    it("should properly attempt to logout the user", function() {
        var userController = controller("userController", {
            $scope: scope,
            user: {
                isLoggedIn: function() {return true;},
                getInfo: function() {
                    var deferred = q.defer();
                    deferred.resolve({avatar_url: "http://garstasio.com"});
                    return deferred.promise;
                },
                logout: function() {
                    var deferred = q.defer();
                    deferred.resolve();
                    return deferred.promise;
                }
            }
        });

        scope.logout();
        scope.$root.$digest();
        expect(scope.loggedIn).toBe(false);
    });
});