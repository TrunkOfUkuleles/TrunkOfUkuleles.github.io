'use-strict'

var usersArray = [];
var allFeelsArray = [];
var currentUser;
var filterArray=[];
var filtered;


var logoutButton = document.getElementById('logoutButton');
var usernameField = document.getElementById('usernameField');
var emailField = document.getElementById('emailField');
var proPic = document.getElementById('profilePic');
var past = document.getElementById('yourFeels');


var FeelEntry = function (majorFeel, minorTags, thoughts, image, createdBy) {
  this.majorFeel = majorFeel;
  this.minorTags = minorTags;
  this.thoughts = thoughts;
  this.image = image;
  this.createdBy = createdBy;
  allFeelsArray.unshift(this);
}
 
//handlers


logoutButton.addEventListener('click', 
  (e) => {
    logout(e);
  });





var userInfoHandler = function(){

    var userfield = document.createElement('b');

    var mailfield = document.createElement('b');

    usernameField.textContent = 'Username: ';
    emailField.textContent = 'Email: ';
    userfield.textContent = currentUser.username;
    mailfield.textContent = currentUser.email;

    usernameField.appendChild(userfield);
    emailField.appendChild(mailfield);
    if (currentUser.profilePic){
        proPic.setAttribute('src',currentUser.profilePic )
    }

}

var renderYourCard = function (feelCard) {
  var flow = document.getElementById('yourFeels')
  var fCard = document.createElement('div');
  var imgel1 = document.createElement('img');
  var mFeel = document.createElement('p');
  var mTags = document.createElement('p');
  var thoughtel = document.createElement('p');
  var content = document.createElement('p')
  var feelsButton = document.createElement('div')
  
  fCard.setAttribute('class' ,'card')
  feelsButton.setAttribute('class', 'feelsButton')
  thoughtel.setAttribute('class', 'thoughts')
  content.setAttribute('class', 'cardText')
  mFeel.setAttribute('class', 'majorFeel');
  imgel1.setAttribute('class', 'flow-image');
  mTags.setAttribute('class', 'minorTags');
  
  imgel1.setAttribute("src", './media/profileBase.jpg');
  if (feelCard.image){
    imgel1.setAttribute("src", feelCard.image);
  }
  fCard['background-image'] = feelCard.image;

  
  mFeel.textContent = feelCard.majorFeel;
  mTags.textContent = feelCard.minorTags;
  thoughtel.textContent = feelCard.thoughts;

  past.appendChild(fCard);
  fCard.appendChild(imgel1);
  fCard.appendChild(content);
  content.appendChild(mFeel);
  content.appendChild(mTags);
  content.appendChild(thoughtel);
  console.log('i tried')

}

var renderYourFlow = function (card){
  if (localStorage.getItem('current-user') && localStorage.getItem('feels')){
    console.error(localStorage.getItem('feels').slice(0))
let end = []
    let filterMe = JSON.parse(localStorage.getItem('feels').slice(0))

    let filtered = filterMe.filter(el => {

     return (el['createdBy'] === currentUser['email'])
    });
    
    

    console.error(filtered)

    for (let i in filtered){
      renderYourCard(filtered[i])
    }

 }else{
    var empty = document.createElement('div')
    var text = document.createElement('p')

    empty.setAttribute('class', 'emptyWrap')
    text.setAttribute('class', 'emptyMessage')

    text.textContent = 'Your history is empty.';

    past.appendChild(empty);
    empty.appendChild(text);
    
  } 
}



  var logout = function(event){
    localStorage.removeItem('current-user');
    console.log('signout clicked');
    window.location.href = 'index.html';
  };





  var checkSet = function() {

    if (localStorage.getItem('users')){
      allFeelsArray = JSON.parse(localStorage.getItem('feels'));
      
      usersArray = JSON.parse(localStorage.getItem('users'));
      currentUser = JSON.parse(localStorage.getItem('current-user'));
    }
      if (!currentUser){window.location.href = 'login.html';}
    }

    
    

    

  

  var initialize = function() {
    
    checkSet();
    userInfoHandler(currentUser);
    renderYourFlow(filtered);
    


  }

  initialize();

