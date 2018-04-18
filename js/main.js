require.config({
    paths: {
        "jquery": "/js/vendor/jquery-2.2.4.min",
        "knockout": "/js/vendor/knockout-3.4.2",
        "text": "/js/vendor/text"
    }
});

require(["knockout", "rooter", "templateEngine"], function(ko, rooter) {
	new rooter("index", function(root) {
		ko.applyBindings(root);
	});
});