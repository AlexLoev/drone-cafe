angular
    .module('CafeApp')
    .factory('UsersService', function ($http, $mdToast) {
        var user = [];
        var profiles = ['Клиент', 'Повар']
        function toast(text, delay) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(text || 'no text')
                    .position('end')
                    .hideDelay(delay || 5000)
            );
        };
        return {
            user,
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
                                    // console.log(res.data);
                                    // newuser = res.data;
                                    console.log('UsersService loaduser resolve', user);
                                    user.push(res.data);
                                    toast('С возвращением ' + user[0].name, 2000);
                                    resolve(user)
                                } else {
                                    reject('Can not find user by ID '+userId)
                                }
                            })
                            .catch(err => { reject(err) });
                    } else {
                        reject('userID undifined')
                    }
                });
            },
            getmoney() {
                return new Promise((resolve, reject) => {
                    if (user[0]._id) {
                        $http.put('/users/'+user[0]._id+'/balance', {moneyCount: 100})
                            .then(res => { 
                                user[0].balance = res.data.balance;
                                toast('Ваш баланс успешно пополнен', 3000);
                                resolve(user[0]);
                            })
                            .catch(err => reject(err));
                    } else {
                        toast('Required fields are empty', 2000);
                        reject('Required fields are empty');
                    }
                });
            }
        }
    });