'use-strict'

const loginButton = document.getElementById("submit-login");
const loginField = document.getElementById("login-form");
var usersArray = [];
var currentUser;
var profileSwitch = document.getElementById('profileSwitch');


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

var createNewUserHandler = function(e){
  var username = e.target.username.value;
  var email = e.target.email.value;
  var password = e.target.password.value;
  var profilePic = e.target.profilePic.value;
  

  var newUser = new UserProfile(username, email, password, profilePic)
  console.log(newUser);
  usersArray.push(newUser);
  currentUser = newUser;
  localStorage.setItem('users', JSON.stringify(usersArray));
  localStorage.setItem('current-user', JSON.stringify(currentUser));
  window.location.href = 'index.html';
};

loginButton.addEventListener('click', (e) => {
  //  e.preventDefault();

    var email = loginField.email.value;
    var password = loginField.password.value;
    console.log('email: '+ email + ' pass: ' + password);
    if (localStorage.getItem('users')){
        for (let i in usersArray){
            console.log('array #' + usersArray[i]);
            if (email === usersArray[i].email && password === usersArray[i].password){
                alert("You have successfully logged in.");
                currentUser = usersArray[i];
                console.log(usersArray[i]);
                console.log(currentUser);
                localStorage.setItem('current-user', JSON.stringify(currentUser));
              //  location.reload();
            } else{
                console.log('error')
                userNotFound();
            }
        }
    } else {
        userNotFound();
    }

});

var userNotFound = function(){
    var errorMsg = document.getElementById('error-message');
    errorMsg.setAttribute('class', 'login-required')
    errorMsg.textContent = 'email and/or password incorrect. Please login, or register!';
  };

  var checkSet = function() {
      if (localStorage.getItem('users')) {
        usersArray = JSON.parse(localStorage.getItem('users'));
      }

      if (localStorage.getItem('current-user')) {
        window.location.href = 'profile.html';       
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
    localStorage.setItem('users', JSON.stringify(usersArray));
    console.log(localStorage);
    console.log('current user: ' + currentUser)



  }

  initialize();

