define(["knockout"], function(ko) {
    ko.templateSources.stringTemplate = function(element, html) {
        this.domElement = element;
        this.html = ko.utils.unwrapObservable(html);
    }

    ko.templateSources.stringTemplate.prototype.text = function() {
        if (arguments.length == 0){
            return this.html;
        }
            
        this.html = ko.utils.unwrapObservable(arguments[0]);
    }

    ko.templateSources.stringTemplate.prototype.data = function(key) {
        if (arguments.length == 1) {
            return ko.utils.domData.get(this.domElement, "templateSourceData_" + key);
        }
        else {
            ko.utils.domData.set(this.domElement, "templateSourceData_" + key, arguments[1]);
        }
    }

    var engine = new ko.nativeTemplateEngine();

    engine.renderTemplate = function(template,bindingContext,options,templateDocument) {
        var templateSource = this.makeTemplateSource(template, templateDocument, bindingContext, options);

        return this.renderTemplateSource(templateSource, bindingContext, options);
    }

    engine.makeTemplateSource = function(template, templateDocument, bindingContext, options) {
        if (typeof template == "string") {
            templateDocument = templateDocument || document;

            var elem = templateDocument.getElementById(template);

            if (!elem){
                throw new Error("Cannot find template with ID " + template);
            }
                
            return new ko.templateSources.domElement(elem);
        }

        else if (options && options.html) {
            return new ko.templateSources.stringTemplate(template,options.html);
        }
        else if ((template.nodeType == 1) || (template.nodeType == 8)) {
            return new ko.templateSources.anonymousTemplate(template);
        }
        else
            throw new Error("Unknown template type: " + template);
    }

    ko.setTemplateEngine(engine);
});
