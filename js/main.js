require.config({
    paths: {
        "jquery": "/js/vendor/jquery-2.2.4.min",
        "knockout": "/js/vendor/knockout-3.4.2",
        "text": "/js/vendor/text"
    }
});

require(["knockout", "router", "templateEngine"], function(ko, router) {
	new router("app", function(app) {
		ko.applyBindings(app);
	});
});
