
import $ from 'jquery';
import './css/base.scss';
import Hotel from './Hotel';
import Admin from './Admin';
import Customer from './Customer';


let hotel;
let admin;
let customer;
let today = getCurrentDate();


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
  hotel = new Hotel(data[0], data[1], data[2], today);
  admin = new Admin(data[0], data[1], data[2], today);
  updatePage()
  console.log(hotel)
  console.log(admin)
})

function updatePage() {
  $('#todays__date').text(today);
}

function getCurrentDate() {
  let today = new Date();
  let year = today.getFullYear();
  let month = String(today.getMonth() + 1).padStart(2, '0');
  let day = String(today.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`
};

// $('#rooms__today').text(admin.getTotalRoomsAvailableToday(today));
//   $('#span__revenue').text(admin.getTotalRevenueToday(today));
//   $('#span__percent--rooms').text(admin.getPercentRoomsOccupiedByDate(today));

$('#submit__login--customer--js').on('click', (e) => {
  e.preventDefault();
  let $userName = $('#ul__dropdown--customer--js input').val()
  let $password = $('#submit__login--customer--js').prev().val()
  checkInputValueCustomer($userName, $password)
});

$('#submit__login--admin--js').on('click', (e) => {
  e.preventDefault();
  let $userName = $('#ul__dropdown--admin--js input').val()
  let $password = $('#submit__login--admin--js').prev().val()
  checkInputValueAdmin($userName, $password)
});

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

$('.home__btn').on('click', () => {
  window.location = './index.html';
})

function checkInputValueAdmin(userName, password) {
  if (userName === 'manager' && password === 'overlook2019') {
    window.location = './admin.html';
  }
  $('.input').addClass('error').val('')
}

function checkInputValueCustomer(userName, password) {
  if (userName === 'customer50' && password === 'overlook2019') {
    window.location = './customer.html';
  }
  $('.input').addClass('error').val('')
}

// function searchCustomers() {
//   let $customerSearch = $('#div__input--customer--js').val();
//   if ($customerSearch === !'') {
//     //filter through customers to see if customer exisits
//     //if they do fire a function that displays their into
//   } else {
//     //if they dont then append error message 
//   }
// }



