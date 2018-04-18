define(["jquery", "knockout"], function($, ko) {
	return function(params) {
		var self = this;

        var router = require("router");

		self.users = ko.observableArray([]);

		var User = function (userId) {
			this.id = userId;
		}

        self.loadData = function() {
            $.ajax({
                type: 'GET',
                url: 'https://jsonplaceholder.typicode.com/todos/',
                success: function(result) {
                    self.handleResponse(result);
                },
                dataType: 'json'
            });
        }

        self.handleResponse = function(response) {
            var users = response
				.map(function(item) {
                	return new User(item.userId);
            	});

			self.users(removeDupplicates(users));
        }

        self.handleClick = function(item) {
            new router("user", { userId: item.id, app: params.app }).routerLoaded
                .done(function(user) {
                    params.app.mainContent(user);
                });
        }

        self.loadData();

        function removeDupplicates(array) {
            var hash = {};

            array.forEach(function(item){
                hash[item.id] = item;
            });

            return Object.values(hash);
        }
	}
});
