CafeApp.component('authPage', {
    controller: function authCtrl($location, $http, $mdToast, UsersService) {
        console.log(UsersService);
        const ctrl = this;
        ctrl.user = {
            name: "Alex",
            email: "alexloev@gmail.com",
            loaded: false
        };
        UsersService.curUsr = ctrl.user;
        // console.log('authCtrl', this);
        ctrl.signin = () => {
            UsersService.signin(this.user)
            .then(user => ctrl.user = user);
        } 
    },
    templateUrl: 'src/authPage/authPage.html'
})