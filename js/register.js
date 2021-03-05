'use-strict'

const registerButton = document.getElementById("submit-register");
const registerField = document.getElementById("register-form");
var usersArray = [];
var currentUser;

var trickySpot = document.getElementById('profileSwitch');



var UserProfile = function (username, email, password, profilePic='./media/profileBase.jpg'){
    this.username = username;
    this.email = email;
    this.password = password;
    this.profilePic = profilePic;
    this.created = new Date();

    usersArray.push(this);
}              
  new UserProfile('user1', 'testaccount@me.com', 'password');
  new UserProfile('user2', 'testaccount2@me.com', 'password');
//handlers

registerButton.addEventListener('click', (e) => {
  var username = registerField.username.value;
  var email = registerField.email.value;
  var password = registerField.password.value;
  var newUser = new UserProfile(username, email, password)
  usersArray.push(newUser);
  currentUser = newUser;
  localStorage.setItem('users', JSON.stringify(usersArray));
  localStorage.setItem('current-user', JSON.stringify(currentUser));
  window.location.href = 'index.html';
});


  var checkSet = function() {
      if (localStorage.getItem('users')) {
        usersArray = JSON.parse(localStorage.getItem('users'));
      }
      if (localStorage.getItem('current-user')) {
        currentUser = JSON.parse(localStorage.getItem('current-user'))
      }
  };

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
    else if (!currentUser){
      var newLink = document.createElement('a');
      var wrapper = document.createElement('div')

      wrapper.setAttribute('class', 'proWrap')
      newLink.setAttribute('href', './login.html');
      newLink.setAttribute('class', 'profileButton');
      newLink.textContent = 'Login';

      profileSwitch.appendChild(wrapper);
      wrapper.appendChild(newLink);
    }
}

  var initialize = function() {
    checkSet();
    buttonSwitch();
    console.log(usersArray);
    localStorage.setItem('users', JSON.stringify(usersArray));
    console.log(localStorage);
    console.log('current user: ' + currentUser)



  }

  initialize();

