angular
    .module('CafeApp')
    .factory('UsersService', function ($http, $location, $mdToast) {
        let curUsr;
        let profiles = ['Клиент', 'Повар']
        // console.log('usersService');
        function toast(text, delay) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(text)
                    .position('top right')
                    .hideDelay(delay)
            );
        };
        function signin(user) {
            // console.log('usserv signin', user);
            return new Promise((resolve, reject) => {
                if (user.name && user.email && user.profile) {
                    let path = 'users/' + user.email
                    $http.post('users/', user)
                        .then(res => {
                            // console.log(res);
                            if (res.data) {
                                user = res.data;
                                user.loaded = true
                                toast('Привет, пользователь ' + user.name, 2000);
                                $location.path(path);
                                curUsr = user;
                                resolve(user);
                            } else {
                                toast('Nothing found by this email ' + user.email, 2000);
                            }
                        })
                        .catch(err => {
                            toast(err, 2000);
                        });
                } else {
                    toast('Required fields are empty', 2000);
                }
            });
        };
        return { curUsr, signin, toast, profiles };
    });