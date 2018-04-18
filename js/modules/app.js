define(["knockout"],
    function (ko) {
        return function () {
            var app = this;

            var router = require("router");

            app.mainContent = ko.observable(null);

            new router("userList", { app: app }).routerLoaded
                .done(function(userList){
                    app.mainContent(userList);
                });
        };
    });
