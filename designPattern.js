/*
    Creational Design Patterns
*/

//Module Pattern
var repo = function() {

  var fetch = function(id) {
    console.log('fetching from DB for id ' + id);
  }

  var save = function(data) {
    console.log('saving to DB for object ' + JSON.stringify(data));
  }

  return {
    fetch: fetch,
    save: save
  }
}

var myRepo = new repo();

myRepo.fetch(1);
myRepo.save({
  name: 'Charan',
  age: 26
});


//Factory Pattern

var orderRepo = function () {
   var fetch = function() {
      console.log('Fetching Orders...');
   }
   
   return {
     fetch : fetch
   }
}

var userRepo = function () {
   var fetch = function() {
      console.log('Fetching Users...');
   }
   
   return {
     fetch : fetch
   }
}

var taskRepo = function () {
   var fetch = function() {
      console.log('Fetching Tasks...');
   }
   
   return {
     fetch : fetch
   }
}

var repoFactory = function() {
   var repos = this;
   
   var repoList = [
                    {name : 'order', source : new orderRepo()},
                    {name : 'user', source : new userRepo()},
                    {name : 'task', source : new taskRepo()}
                  ];
                  
    repoList.forEach(ele => {
      repos[ele.name] = ele.source;
    });
    
    return repos;
}

var myRepoFactory = new repoFactory();

myRepoFactory.order.fetch();
myRepoFactory.user.fetch();
myRepoFactory.task.fetch();

//Singleton Pattern

var httpService = {

    name : 'myname',
    age : 27,
    getName : function() {
        return this.name;
    },

    getAge : function() {
        return this.age;
    }
}

var clientSingletonService = function() {
    var myHttpService = null;

    var getHttpService = function() {
        if(myHttpService == null) {
            myHttpService = httpService;
            console.log('httpService created');
            return myHttpService;
        }
        console.log('httpService reused');
        return this.myHttpService;
    }

    return {
        getHttpService : getHttpService
    }
}

var myClientSingletonService = new clientSingletonService();
myClientSingletonService.getHttpService();
myClientSingletonService.getHttpService();
myClientSingletonService.getHttpService();


//Decorator Pattern

var Task = function(name) {
    this.name = name;
    this.completed = false;
}

Task.prototype.getStatus = function() {
    console.log('Fetching Status for task ' + this.name);
}

var myTask = new Task('Copy');
myTask.getStatus();

var UrgentTask = function(name, priority) {
    Task.call(this, name);
    this.priority = priority;
}
UrgentTask.prototype = Object.create(Task.prototype);
UrgentTask.prototype.getStatus = function() {
    Task.prototype.getStatus.call(this);
    console.log('included Urgent status for task ' + this.name);
}

var myUrgentTask = new UrgentTask('CopyImmediate', 1);
myUrgentTask.getStatus();