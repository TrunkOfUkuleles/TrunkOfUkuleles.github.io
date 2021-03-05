'use-strict'


var allFeelsArray = [];
var usersArray = [];
var feelingsArray = ['Happy', 'Sad', 'Hurt', 'Confidence', 'Anxiety', 'Tired', 'Depression', 'Frustration',
                     'Pessimism', 'Optimism', 'Love', 'Jealousy', 'Rejection', 'Relaxed', 'Motivation', 'Creative', 
                     'Fear', 'Annoyance', 'Furious', 'Bitter', 'Bored', 'Acceptance', 'Appreciation'];

var currentUser;

var feelingsView = document.getElementById('feel-flow');
var profileSwitch = document.getElementById('profileSwitch');



//constructors

var FeelEntry = function (majorFeel, minorTags, thoughts, image, createdBy) {
    this.majorFeel = majorFeel;
    this.minorTags = minorTags;
    this.thoughts = thoughts;
    this.image = image;
    this.createdBy = createdBy;
    allFeelsArray.unshift(this);

}

var UserProfile = function (username, email, password, pic){
    this.username = username;
    this.email = email;
    this.password = password;
    this.profilePic = pic;
    this.created = new Date();
    usersArray.push(this);
}              

//handlers

  var createNewUserHandler = function(e){
  var username = e.target.username.value;
  var email = e.target.email.value;
  var password = e.target.password.value;
  var profilePic = e.target.profilePic.value;

  var newUser = new UserProfile(username, email, password, profilePic)
  currentUser = newUser;
  localStorage.setItem('users', JSON.stringify(usersArray));
  localStorage.setItem('current-user', JSON.stringify(currentUser));
  window.location.href = 'index.html';
};

  var renderFeelCard = function (feelCard) {
    var fCard = document.createElement('div');
    var background = document.createElement('img');
    var mFeel = document.createElement('p');
    var mTags = document.createElement('p');
    var thoughtel = document.createElement('text');
    var content = document.createElement('div')
    var feelsButton = document.createElement('div')
 
    fCard.setAttribute('class' ,'card')
    feelsButton.setAttribute('class', 'feelsButton')
    thoughtel.setAttribute('class', 'thoughts')
    content.setAttribute('class', 'cardText')
    mFeel.setAttribute('class', 'majorFeel');
    background.setAttribute('class', 'flow-image');
    background.setAttribute('src', feelCard.image)
    mTags.setAttribute('class', 'minorTags');
    if(!feelCard.image || feelCard.image==='EMPTY'){
        background.setAttribute('src', './media/404.jpg')
    }
    
    mFeel.textContent = feelCard.majorFeel;
    mTags.textContent = feelCard.minorTags;
    thoughtel.textContent = feelCard.thoughts;

    feelingsView.appendChild(fCard);
    fCard.appendChild(background);
    fCard.appendChild(content);
    content.appendChild(mFeel);
    content.appendChild(mTags);
    content.appendChild(thoughtel);
  }

  var renderFeelFlow = function (card){
      for (let i in card){
          renderFeelCard(card[i]);
      }
      
  }


  var buttonSwitch = function(){
      if (currentUser){
        var wrapper = document.createElement('div')
        var linker = document.createElement('a');

        wrapper.setAttribute('class', 'proWrap')
        linker.setAttribute('class', 'profileButton');
        linker.setAttribute('href', './profile.html');
        linker.textContent = 'Profile';

        profileSwitch.appendChild(wrapper);
        wrapper.appendChild(linker);
      }
     if (!currentUser)
      {
        var newLink = document.createElement('a');
        var wrapper = document.createElement('div')

        wrapper.setAttribute('class', 'proWrap')
        newLink.setAttribute('href', './login.html');
        newLink.setAttribute('class', 'profileButton');
        newLink.textContent = 'Login';

        profileSwitch.appendChild(wrapper);
        wrapper.appendChild(newLink);
      }
  };


  //test fields for to get the local storage loaded
  new FeelEntry('happy', 'stressed, excited', 'Brand new day...', './media/404.jpg', 'bob@me.com');
  new FeelEntry('sad', 'tired, anxious', 'Still getting worse', './media/emotional.jpg', 'jen@me.com');
  new FeelEntry('tired', 'frustrated', 'a time when I had more energy', './media/sunset.jpg', 'devon@me.com');
  new FeelEntry('angry', 'empty', 'stubbed my toe', './media/boatRight.png', 'bob@me.com');
  new FeelEntry('happy', 'joyous', 'long time no see', './media/emotional.jpg', 'steve@me.com');
  new FeelEntry('confused', 'hopeful', 'see if this works','./media/city.jpg' , 'bob@me.com');

  new UserProfile('bob', 'bob@me.com', 'pass', './media/profile1.jpg');
  new UserProfile('steve', 'steve@me.com', 'pass','./media/profile2.jpg');
  new UserProfile('jen', 'jen@me.com', 'pass','./media/profile3.jpg');
  new UserProfile('devon', 'devon@me.com', 'pass','./media/profile4.jpg');
  new UserProfile('admin','admin@me.com','pass','./media/staff1.jpg');

  localStorage.setItem('users', JSON.stringify(usersArray))
  localStorage.setItem('feels', JSON.stringify(allFeelsArray))


  var checkSet = function() {
    if (localStorage.getItem('users')) {
      usersArray = JSON.parse(localStorage.getItem('users'));
    }
    if (localStorage.getItem('current-user')) {
      currentUser = JSON.parse(localStorage.getItem('current-user')); 
    }   
    if (localStorage.getItem('feels')){
       allFeelsArray = JSON.parse(localStorage.getItem('feels'))
    }
  };

  var initialize = function() {
    checkSet();
    buttonSwitch();
    console.log(usersArray);
    renderFeelFlow(allFeelsArray);
  }

  initialize();

