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


/*
    Structural Design Pattern
*/

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

//Facade Pattern

var TerribleUserService = function (name, age, health, isRunnable) {
    var saveAge = function() {
        console.log('age saved as ' + age);
    }

    var saveName = function() {
        console.log('name saved as ' + name);
    }

    var saveHealth = function() {
        console.log('health saved as ' + health);
    }

    var saveIsRunnable = function() {
        console.log('isRunnable saved as ' + isRunnable);
    }

    return {
        saveAge : saveAge,
        saveName : saveName,
        saveHealth : saveHealth,
        saveIsRunnable : saveIsRunnable
    }
}

var myTerribleUserService = new TerribleUserService('Antonio', 45, 70, true);


var UserServciceWrapper = function() {

    var saveUser = function(myTerribleUserService) {
        myTerribleUserService.saveAge();
        myTerribleUserService.saveHealth();
        myTerribleUserService.saveIsRunnable();
        myTerribleUserService.saveName();
    }

    return {
        saveUser : saveUser
    }
}();

UserServciceWrapper.saveUser(myTerribleUserService);


//Flyweight Pattern

var User = function(data) {
    this.name = data.name;
    this.FlyWeight = FlyWeightFactory.getUser(data.age, data.color, data.isRun, data.hobby);
    // this.age = data.age;
    // this.color = data.color;
    // this.isRun = data.isRun;
    // this.hobby = data.hobby;
}

var UserCollection = function() {
    var users = {};
    var count = 0;

    var addUser = function(data) {
        users[data.name] = new User(data);
        count++;
    }

    var getUser = function(name) {
        return users[name];
    }

    var getCount = function() {
        return count;
    }

    return {
        addUser : addUser,
        getUser : getUser,
        getCount : getCount
    }
}();

var FlyWeight = function(age, color, isRun, hobby) {
    this.age = age;
    this.color = color;
    this.isRun = isRun;
    this.hobby = hobby;
}

var FlyWeightFactory = function() {
    var flyWeights = {};

    var getUser = function(age, color, isRun, hobby) {
        if(!flyWeights[age + color + isRun + hobby]) {
            flyWeights[age + color + isRun + hobby] = new FlyWeight(age, color, isRun, hobby);
        }
        return flyWeights[age + color + isRun + hobby];
    }

    var getCount  = function() {
        var count = 0;
        for(var key in flyWeights) {
            count++;
        }

        return count;
    }
    return {
        getUser : getUser,
        getCount : getCount
    }
}();

var ageArray = [1, 2, 3, 4];
var colorArray = ['yellow', 'brown', 'black', 'white'];
var isRunArray = [true, false];
var hobbyArray = ['Cricket', 'Music', 'Football', 'Code', 'Guitar'];

var initialMemory = process.memoryUsage().heapUsed;

//for (var i=0; i<1000000; i++) {
for (var i=0; i<10000; i++) {
    UserCollection.addUser(
        {
            name : 'username ' + i,
            age : ageArray[Math.floor((Math.random() * 4))],
            color : colorArray[Math.floor((Math.random() * 4))],
            hobby : hobbyArray[Math.floor((Math.random() * 5))],
            isRun : isRunArray[Math.floor((Math.random() * 2))],
        }
    )
}

var afterMemory = process.memoryUsage().heapUsed;

console.log('used memory ' + (afterMemory - initialMemory) / 1000000);

console.log('task count ' + UserCollection.getCount());
console.log('flyWeight count ' + FlyWeightFactory.getCount());

/*
    Behavioural Design Pattern
*/

//Observer Pattern

var Event = function(data) {
    this.name = data.name;
    this.description = data.description;
}

Event.prototype.save = function() {
    console.log('saving event ' + this.name + ' with description ' + this.description);
}

Event.prototype.complete = function() {
    console.log('completing event ' + this.name + ' with description ' + this.description);
}

var NotificationService = function() {
    var message = 'Notify ';
    this.update = function(event) {
        console.log(message + event.name + ' with description ' + event.description);
    }
}

var LoggingService = function() {
    var message = 'Logging ';
    this.update = function(event) {
        console.log(message + event.name + ' with description ' + event.description);
    }
}

var AuditService = function() {
    var message = 'Audit ';
    this.update = function(event) {
        console.log(message + event.name + ' with description ' + event.description);
    }
}

function Observer() {
    this.observerList = [];
}

Observer.prototype.addObserver = function(observer) {
    this.observerList.push(observer);
}

Observer.prototype.getObserver = function(index) {
    return this.observerList[index];
}

Observer.prototype.getCount = function() {
    return this.observerList.length;
}

var EventSubject = function(data) {
    Event.call(this, data);
    this.observers = new Observer();
}

EventSubject.prototype.addObserver = function(observer) {
    this.observers.addObserver(observer);
}

EventSubject.prototype.notify = function(context) {
    var observerCount = this.observers.getCount();
    for(var i=0; i<observerCount; i++) {
        this.observers.getObserver(i)(context);
    }
}

EventSubject.prototype.save = function() {
    this.notify(this);    
    Event.prototype.save.call(this);
}

var myEvent = new EventSubject({name : 'ReceivedText', description : 'Payload received from publisher'})

var notificationService = new NotificationService();
var loggingService = new LoggingService();
var auditService = new AuditService();

myEvent.addObserver(notificationService.update);
myEvent.addObserver(loggingService.update);
myEvent.addObserver(auditService.update);

myEvent.save();


//Mediator Pattern

var Mediator = (function() {
    var channels = {};

    var subscribe = function(channel, context, func) {
        if(!this.channels[channel]) {
            this.channels[channel] = [];
        }

        this.channels[channel].push({
            context : context,
            func : func
        });
    }

    var publish = function(channel) {
        if(!this.channels[channel]) {
            false;
        }

        var args = Array.prototype.splice.call(arguments, 1);

        for(var i=0; i<this.channels[channel].length; i++) {
            var sub = this.channels[channel][i];

            sub.func.apply(sub.context, args);
        }
    }

    return {
        channels : {},
        subscribe : subscribe,
        publish : publish
    }
})();

var myMediatorEvent = new EventSubject({name : 'ReceivedMediatorText', description : 'Payload received from Mediator publisher'})

Mediator.subscribe('complete', notificationService, notificationService.update);
Mediator.subscribe('complete', loggingService, loggingService.update);
Mediator.subscribe('complete', auditService, auditService.update);

myMediatorEvent.complete = function() {
    Mediator.publish('complete', this);
    Event.prototype.complete.call(this);
}

myMediatorEvent.complete();