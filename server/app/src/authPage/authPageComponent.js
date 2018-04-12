CafeApp.component('authPage', {
    controller: function authCtrl($location, $http) {
        const ctrl = this;
        ctrl.user = {
            loaded: false
        };
        // console.log('authCtrl', this);
        ctrl.signin = () => {
            console.log(ctrl.user);
            if (ctrl.user.name && ctrl.user.email) {
                let path = 'users/'+ctrl.user.email
                $http.get(path)
                .then(res => {
                    console.log(res);
                    if (res.data) {
                        ctrl.user = res.data;
                        ctrl.user.loaded = true
                        $location.path(path);
                    } else {
                        alert('Nothing found by this email');
                    }
                })
                .catch(err => {
                    alert(err);
                });
            } else {
                alert('Required field are empty');
            }
        };
    },
    templateUrl: 'src/authPage/authPage.html'
})