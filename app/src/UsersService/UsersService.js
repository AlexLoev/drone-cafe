angular
    .module('CafeApp')
    .factory('UsersService', function ($http, $mdToast) {
        let curUsr;
        let profiles = ['Клиент', 'Повар']

        function toast(text, delay) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(text || 'no text')
                    .position('bottom right')
                    .hideDelay(delay || 5000)
            );
        };
        // console.log('usersService');
        return {
            curUsr,
            profiles,
            toast,
            signin(user) {
                // console.log('usserv signin', user);
                return new Promise((resolve, reject) => {
                    if (user.name && user.email && user.profile) {
                        let path = 'users/' + user.email
                        $http.post('users/', user)
                            .then(res => {
                                if (res.data) {
                                    user = res.data;
                                    user.loaded = true
                                    console.log('UsersService signin resolve user loaded', user);

                                    toast('Привет, пользователь ' + user.name, 2000);
                                    curUsr = user;
                                    resolve(user);
                                } else {
                                    toast('Nothing found by this email ' + user.email, 2000);
                                }
                            })
                            .catch(err => { toast(err, 2000) });
                    } else {
                        toast('Required fields are empty', 2000);
                    }
                });
            },
            loaduser(userId) {
                console.log('UsersService loaduser', userId);
                return new Promise((resolve, reject) => {
                    if (userId) {
                        $http.get('users/' + userId)
                            .then(res => {
                                if (res.data) {
                                    console.log(res.data);
                                    user = res.data;
                                    user.loaded = true
                                    console.log('UsersService loaduser resolve', user);
                                    toast('С возвращением ' + user.name, 2000);
                                    curUsr = user;
                                    resolve(user)
                                } else {
                                    resolve('Can not find user by ID '+userId)
                                }
                            })
                            .catch(err => { reject(err) });
                    } else {
                        reject('userID undifined')
                    }
                });
            }
        }
    });