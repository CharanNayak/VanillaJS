
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