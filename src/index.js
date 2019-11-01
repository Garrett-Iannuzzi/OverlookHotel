
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import Hotel from './Hotel';
import Admin from './Admin';
import User from './User';


let hotel;

Promise.all([
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
    .then(data => data.json())
    .catch(error => console.error('NO DATA')),
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
    .then(data => data.json())
    .catch(error => console.error('NO DATA')),
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
    .then(data => data.json())
    .catch(error => console.error('NO DATA')),
]).then(data => {
  hotel = new Hotel(data[0], data[1], data[2]);
  console.log(hotel)
})

$(document).ready(() => {
})

$('#submit__login--admin--js').on('click', (e) => {
  e.preventDefault();
  let $userName = $('#ul__dropdown--admin--js input').val()
  let $password = $('#submit__login--admin--js').prev().val()
  checkInputValue($userName, $password)
})

$('.tabs__stage div').hide();
$('.tabs__stage div:first').show();
$('.nav__ul li:first').addClass('tab__active');

$('.nav__ul a').on('click', function(event){
event.preventDefault();
$('.nav__ul li').removeClass('tab__active');
$(this).parent().addClass('tab__active');
$('.tabs__stage div').hide();
$($(this).attr('href')).show();
});

$('.splash__btn--user').on('click', () => {
  $('.form__dropdown--user').removeClass().css('backgroundColor', 'hsl(240, 17%, 86%)');
});
  
$('.splash__btn--admin').on('click', () => {
  $('.form__dropdown--admin').removeClass().css('backgroundColor', 'hsl(240, 17%, 86%)');
});

function checkInputValue(userName, password) {
  userName === 'manager' && password === 'overlook2019' ? 
    window.location = './admin.html' : window.location = './index.html'
}

