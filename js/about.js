'use-strict'

var usersArray = [];
var currentUser;
var staff= [];

var staffCards = document.getElementById('staff-flow');
var profileSwitch = document.getElementById('profileSwitch');

var TeamCard = function (name, position, notes, picture) {
    this.name = name,
    this.position = position,
    this.notes = notes,
    this.picture = picture

    staff.push(this)
}

new TeamCard('Julien Edwards','Team Lead', 'Going from Marketing and sales to Tech', './media/staff1.jpg');

//handlers

var renderStaffCard = function(staffer){
    var card = document.createElement('div');
    var aPic = document.createElement('img');
    var name = document.createElement('h1');
    var position = document.createElement('h2');
    var notes = document.createElement('p');
    var textboxes = document.createElement('div')
    
    card.setAttribute('class', 'staff-card')
    aPic.setAttribute('src', staffer.picture);
    aPic.setAttribute('alt', `${staffer.name}'s picture`)
    aPic.setAttribute('class', 'staffer-pic');
    position.setAttribute('class', 'staffer-text');
    name.setAttribute('class', 'staffer-text');
    notes.setAttribute('class', 'staffer-text');
    textboxes.setAttribute('class', 'staffcard-text')

    name.textContent = staffer.name;
    position.textContent = staffer.position
    notes.textContent = staffer.notes;

    staffCards.appendChild(card);
    card.appendChild(aPic);
    card.appendChild(textboxes);
    textboxes.appendChild(name);
    textboxes.appendChild(position);
    textboxes.appendChild(notes);
}


var allTheStaff = function(card){
    for (let i in staff){
        renderStaffCard(card[i])
    }
}




  var checkSet = function() {
      if (localStorage.getItem('users')) {
          usersArray = JSON.parse(localStorage.getItem('users'));
      }
      if (localStorage.getItem('current-user')) {
              currentUser = JSON.parse(localStorage.getItem('current-user'));
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
    allTheStaff(staff);



  }

  initialize();

