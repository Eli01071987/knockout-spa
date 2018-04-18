define(["jquery", "knockout", "loader"], function($, ko, loader) {
	return function(file, callback) {
		var self = this;

		self.callback = callback;
		self.data = ko.observable({});
		self._html = ko.observable(null);

		self.routerLoadedDf = $.Deferred();
		self.routerLoaded = self.routerLoadedDf.promise();

        self.setVar = function(i, v) {
			var data = self.data();

			data[i] = v;
			self.data(data);
		}

		self.applyModels = function(Module, html) {
			self.data(typeof Module === "function" ? new Module(self) : Module);
			self._html(html);

			var model = self.data();
			model._html = html;

			self.data(model);
			
/*			if (self.callback && typeof self.callback === "function") {
				self.callback(self);
			}
			
			if (self.data().callback && typeof self.data().callback === "function") {
				 self.data().callback(self);
			}*/
		}

		var newLoader = new loader();
		newLoader.load("/js/modules/" + file + ".js", "text!/js/templates/" + file + ".html");

		$.when(newLoader.jsLoaded, newLoader.htmlLoaded)
			.then(self.applyModels)
			.then(function(){ self.routerLoadedDf.resolve(self.data()); });
	}
});
