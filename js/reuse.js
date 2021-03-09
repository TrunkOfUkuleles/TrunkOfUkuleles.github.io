'use-strict'


var navSec = document.getElementsByClassName('nav');


var createNavBar = function(){
    let wrapper = document.createElement('div');
    let navBox = document.createElement('nav');
    let home = document.createElement('a');
    let homeIcon = document.createElement('img');
    let newF = document.createElement('a');
    let newFIcon = document.createElement('img'); 
    let about = document.createElement('a');
    let aboutIcon = document.createElement('img');
    let switcher = document.createElement('div');

    wrapper.setAttribute('class', 'navWrap');
    navBox.setAttribute('class', 'navBox' );
    home.setAttribute('href', './index.html')
    homeIcon.setAttribute('src', './media/icon-home.png');
    newF.setAttribute('href', './feel.html');
    newFIcon.setAttribute('src', './media/icon-newPost.png');
    about.setAttribute('href', './about.html');
    aboutIcon.setAttribute('src', './media/icon-about.png');
    switcher.setAttribute('id', 'profileSwitch');


    navSec.appendChild(wrapper);
    wrapper.appendChild(navBox);
    navBox.appendChild(home);
    home.appendChild(homeIcon);
    navBox.appendChild(newF);
    newF.appendChild(newFicon);
    navBox.appendChild(about);
    about.appendChild(aboutIcon);
    wrapper.appendChild(switcher);


}


var initialize = function(){
    createNavBar();
}

initialize();