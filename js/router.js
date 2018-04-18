define(["jquery", "knockout", "loader"], function($, ko, loader) {
	return function(file, params) {
		var self = this;

		self.data = ko.observable({});
		self._html = ko.observable(null);

		self.routerLoadedDf = $.Deferred();
		self.routerLoaded = self.routerLoadedDf.promise();

		self.applyModels = function(Module, html) {
			self.data(typeof Module === "function" ? new Module(params) : Module);
			self._html(html);

			var model = self.data();
			model._html = html;

			self.data(model);
		}

		var newLoader = new loader();
		newLoader.load("/js/modules/" + file + ".js", "text!/js/templates/" + file + ".html");

		$.when(newLoader.jsLoaded, newLoader.htmlLoaded)
			.then(self.applyModels)
			.then(function(){ self.routerLoadedDf.resolve(self.data()); });
	}
});
