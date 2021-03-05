'use-strict';

var allFeelsArray = [];
var emotionEntryArray = [];
var usersArray = [];
var feelingsArray = ['Happy', 'Sad', 'Hurt', 'Confidence', 'Anxiety', 'Tired', 'Depression', 'Frustration',
                     'Pessimism', 'Optimism', 'Love', 'Jealousy', 'Rejection', 'Relaxed', 'Motivation', 'Creative', 
                     'Fear', 'Annoyance', 'Furious', 'Bitter', 'Bored', 'Acceptance', 'Appreciation'];

var currentUser;

var feelButton = document.getElementById('feel-submit');
var feelField = document.getElementById('feel-form');
var dropper = document.getElementById('majorFeel');


var FeelEntry = function (majorFeel, minorTags, thoughts, image, feels) {
    this.majorFeel = majorFeel;
    this.minorTags = minorTags;
    this.thoughts = thoughts;
    this.image = image;
    this.feels= feels;
    this.createdBy = currentUser.username;

    emotionEntryArray.unshift(this);
    

}

feelButton.addEventListener('click' , (e) => {

    localStorageCheck();
    var majorFeel = feelField.majorFeel.value;
    var minorFeel = feelField.minorTags.value;
    var thoughts = feelField.thoughts.value;
    var image = feelField.image.value;
    var created = new Date();

    var newFeel = new FeelEntry(majorFeel, minorFeel, thoughts, image, created);
    allFeelsArray.unshift(newFeel);
    localStorage.setItem('feels', JSON.stringify(allFeelsArray));
    window.location.href = 'index.html';
})


//localStorage

var localStorageCheck = function(){
    if (localStorage.getItem('feels')){
     allFeelsArray = JSON.parse(localStorage.getItem('feels'));
    }
  };

  var dropdownElement = function(el){
    var opt = document.createElement('option');

    opt.setAttribute('value', el);
    opt.textContent = el;

    dropper.appendChild(opt);
  }

  var dropMenu= function (arr) {
      for (let i in arr){
          dropdownElement(arr[i])
      }
  }



  var checkSet = function() {
    if (localStorage.getItem('users')) {
        usersArray = JSON.parse(localStorage.getItem('users'));

        if (localStorage.getItem('current-user')) {
            currentUser = JSON.parse(localStorage.getItem('current-user'));
        }
    }
    if (!currentUser){
        window.location.href = 'login.html'
    }
};

var buttonSwitch = function(){
    if (currentUser){
      var linker = document.createElement('a');
      var profileSwitch = document.getElementById('profileSwitch');
      linker.setAttribute('class', 'profileButton');
      linker.setAttribute('href', './profile.html');
      linker.textContent = 'Profile';

      profileSwitch.appendChild(linker);


    }
    else if (!currentUser){
        var newLink = document.createElement('a');
        var profileSwitch = document.getElementById('profileSwitch');
        newLink.setAttribute('href', './login.html');
        newLink.setAttribute('class', 'loginButton');
        newLink.textContent = 'Login';
        profileSwitch.appendChild(newLink)
    }
}

var initialize = function() {
  localStorageCheck();
  checkSet();
  buttonSwitch();
  dropMenu(feelingsArray);


}

initialize();