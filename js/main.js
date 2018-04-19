require.config({
    waitSeconds : 0,
    paths: {
        "jquery": "vendor/jquery-2.2.4.min",
        "knockout": "vendor/knockout-3.4.2",
        "text": "vendor/text"
    }
});

require(["knockout", "router", "templateEngine"], function(ko, router) {
	var router = new router("app");

    router.routerLoaded.done(function(app) {
		ko.applyBindings(app);
	});
});
