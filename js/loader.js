define(["jquery", "text"], function($) {
	return function(file, callback) {
		var self = this;

        self.jsLoadedDef = $.Deferred();
        self.htmlLoadedDef = $.Deferred();

        self.jsLoaded = self.jsLoadedDef.promise();
        self.htmlLoaded = self.htmlLoadedDef.promise();

        self.load = function(js, html) {

            require([js], self.jsLoadedDef.resolve);

            require([html], self.htmlLoadedDef.resolve);
        }
	}
});
