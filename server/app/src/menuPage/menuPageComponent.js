CafeApp.component('menuPage', {
    controller: function menuCtrl($http) {
        const ctrl = this;
        console.log('menuCtrl', this);
        $http.get('public/menu.json')
            .then(function (res) {
                ctrl.menu = res.data;
            });
    },
    templateUrl: 'src/menuPage/menuPage.html'
})