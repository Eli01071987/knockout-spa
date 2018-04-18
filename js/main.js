require.config({
    paths: {
        "jquery": "/js/vendor/jquery-2.2.4.min",
        "knockout": "/js/vendor/knockout-3.4.2",
        "text": "/js/vendor/text",
        "router": "/js/router"
    }
});

require(["knockout", "router", "templateEngine"], function(ko, router) {
	var router = new router("app");

    router.routerLoaded.done(function(app) {
		ko.applyBindings(app);
	});
});
