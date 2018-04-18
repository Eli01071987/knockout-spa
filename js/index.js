$(function(){
    var Task = function(userId, id, title, completed) {
        var self = this;

        this.userId = userId;
        this.id = id;
        this.title = title;
        this.completed = ko.observable(completed);

        this.toggleCompleteStatus = function() {
            self.completed(!self.completed.peek());
        }

        this.buttonText = ko.pureComputed(function() {
            return self.completed() ? "MOVE TO OPEN" : "MOVE TO DONE";
        })

        this.isCompleted = function() {
            return self.completed.peek();
        }
    }

    var TaskList = function() {
        this.taskList = ko.observableArray();

        this.addToList = function (item) {
            this.taskList.push(item);
        }

        this.removeFromList = function (item) {
            this.taskList.remove(item);
        }

        this.init = function(taskArray) {
            this.taskList(taskArray);
        }

        this.getList = function() {
            return this.taskList;
        }
    }
    
    var ViewModel = function() {
        var self = this;

        self.toDoList = new TaskList([]);
        self.completeList = new TaskList([]);

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

        self.moveTo = function(item) {
            item.toggleCompleteStatus();

            item.isCompleted()
                ? self.moveToDone(item)
                : self.moveToOpen(item)
            
        };

        self.moveToDone = function(item) {
            this.toDoList.removeFromList(item);
            this.completeList.addToList(item);
        }

        self.moveToOpen = function(item) {
            this.completeList.removeFromList(item);
            this.toDoList.addToList(item);
        }

        self.handleResponse = function(response) {
            var doneTasks = response.filter(function(item) {
                return item.completed;
            }).map(function(item) {
                return new Task(item.userId, item.id, item.title, item.completed);
            });

            var activeTasks = response.filter(function(item) {
                return !item.completed;
            }).map(function(item) {
                return new Task(item.userId, item.id, item.title, item.completed);
            });

            self.toDoList.init(activeTasks);
            self.completeList.init(doneTasks);
        }

        self.loadData();
     };
    
    ko.applyBindings(new ViewModel()); 
});
