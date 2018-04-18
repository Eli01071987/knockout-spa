define(["knockout", "router"],
    function (ko, router) {
        return function (params) {
            var app = this;

            this.mainContent = ko.observable(null);

            new router("userList", function(userList) {
                this.setVar("app", app);

                app.mainContent(userList);
            });
        };
    });
