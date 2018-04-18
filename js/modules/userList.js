define(["jquery", "knockout", "rooter"], function($, ko, rooter) {
	return function() {
		var self = this;

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
            new rooter("user", function(user) {
                this.setVar("userId", item.id);
                this.setVar("app", self.app);

                self.app.mainContent(user);
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