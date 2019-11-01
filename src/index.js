// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import { userInfo } from 'os';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)

$(document).ready(() => {
})

$('#submit__login--admin--js').on('click', (e) => {
  e.preventDefault();
  let $userName = $('#ul__dropdown--admin--js input').val()
  let $password = $('#submit__login--admin--js').prev().val()
    console.log($userName)
    console.log($password)
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

