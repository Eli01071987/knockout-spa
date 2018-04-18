define(["knockout", "router"],
    function (ko, router) {
        return function (params) {
            var app = this;

            app.mainContent = ko.observable(null);

            var router = new router("userList");

            router.routerLoaded.done(function(userList){
                 app.mainContent(userList);
            })
        };
    });
