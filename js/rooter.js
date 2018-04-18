define(["knockout", "text"], function(ko) {
	return function(file, callback) {
		var self = this;

		self.callback = callback;
		self.data = ko.observable({});
		self.html = ko.observable(null);

        self.setVar = function(i, v) {
			var data = self.data();

			data[i] = v;
			self.data(data);
		}

		require(["/js/modules/" + file + ".js", "text!/js/templates/" + file + ".html"],
            function(Module, html) {
			    self.data(typeof Module === "function" ? new Module(self) : Module);
			    self.html(html);

			    if (self.callback && typeof self.callback === "function") {
				    self.callback(self);
                }

			    if (self.data().callback && typeof self.data().callback === "function") {
				    self.data().callback(self);
                }
		});
	}
});
