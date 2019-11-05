
import $ from 'jquery';
import './css/base.scss';
import Hotel from './Hotel';
import Admin from './Admin';
import Customer from './Customer';

let hotel;
let admin;
let customer;
let today = getCurrentDate();

let users;
let bookings;
let rooms;

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
  users = data[0].users
  rooms = data[1].rooms
  bookings = data[2].bookings
  hotel = new Hotel(users, rooms, bookings, today);
  admin = new Admin(users, rooms, bookings, today);
})

function generateRandomUserId() {
  let randomNumOneToFifty = (Math.random() * 50);
  return Math.ceil(randomNumOneToFifty);
}

function createCustomer() {
  const randomCustomer = generateRandomUserId()
  // filter for userRooms
  // filter for userBookings
  customer = new Customer(bookings)
  customer.getAllBookings(randomCustomer)
}

const adminView = () => (
  `
   <header>
      <h1>OL Hotel Admin Access </h1>
      <button class="home__btn">Home</button>
    </header>
    <main>
      <section>
          <nav class="section__nav">
              <ul class="nav__ul">
                <li class="ul__tab--main"><a href="#tab__main">Main</a></li>
                <li class="ul__tab--customers"><a href="#tab__customer">Customer</a></li>
                <li class="ul__tab--rooms"><a href="#tab__bookings">Bookings</a></li>
              </ul>
              <div class="tabs__stage">
                <div id="tab__main">
                  <h2 class="h2--date">Today's Date: <span id="todays__date">${today}</span></h2>
                  <h2 class="h2__rooms--available" id="label__rooms--available--js">Total Rooms Available Today: <span id="rooms__today">${admin.getTotalRoomsAvailableToday(today)}</span></p>
                  <h2 class="h2__revenue" id="label__revenue--js">Todays Revenue: $ <span id="span__revenue">${admin.getTotalRoomsAvailableToday(today)}</span></h2>
                  <h2 class="h2__rooms--taken" id="label__rooms--taken--js">Percentage of rooms occupied for today's date: <span id="span__percent--rooms">loading...</span>${admin.getPercentRoomsOccupiedByDate(today)} %</h2>
                </div>
                <div id="tab__customer">
                  <h2 class="h2__search">Search Current Customers: </h2>
                  <p class="customer__name" id="customer__name--js"></p>
                  <input class="div__input--customer" id="div__input--customer--js" placeholder="Search Customer">
                  <button class="div__btn--customer" id="div__btn--customer--js" disabled>Search</button>
                  <h2 class="h2__eneter--new--customer">Enter New Customer: </h2>
                  <p class="customer__name--new" id="customer__name--new--js"></p>
                  <input class="div__input--customer--new" id="div__input--customer--new--js" placeholder="First and Last Name">
                  <button class="div__btn--customer" id="div__btn--new--customer--js" disabled>Add Customer</button>
                </div>
                <div class="tabs__rooms" id="tab__bookings">
                  <h2 class="h2__most--popular--date" id="h2__most--popular--date--js">Most popular booking date: <span id="most__popular--day"></span> </h2>
                  <h2 class="h2__most--rooms" id="h2__most--rooms--js">The date with the most rooms available: </h2>
                </div>
              </div>
            </nav>
      </section>
    </main>
`
)

const customerView = () => (
`
<header class="header__user">
<h1 class="header">Welcome To The Overlook Hotel</h1>
<button class="home__btn">Home</button>
</header>
<main>
<section>
    <nav class="section__nav">
        <ul class="nav__ul">
          <li class="ul__tab--main"><a href="#tab__main">Main</a></li>
          <li class="ul__tab--rooms"><a href="#tab__bookings">Bookings</a></li>
        </ul>
        <div class="tabs__stage">
          <div id="tab__main">
            <h2 class="h2--date">Today's Date: <span id="todays__date"></span></h2>
            <h2 class="h2__rooms--available" id="label__rooms--available--js">Booking History: <span id="rooms__today">loading...</span></p>
            <h2 class="h2__revenue" id="label__revenue--js">Total Spent At Overlook: $ <span class="span__loading">loading...</span></h2>
          </div>
          <div class="tab__booking" id="tab__bookings">
            <button class="btn__bookings">See Your Bookings</button>
            <label class="date__picker--label" for="start">Make A Reservation:</label>
            <input class="date__picker" type="date" id="start" name="trip-start"
              value="2018-07-22"
              min="2019-11-01" max="2020-11-01">
            <button>Make New Reservation</button>
          </div>
        </div>
      </nav>
</section>
</main>
`
)

function goHome() {
  window.location = './index.html';
}

function handleTabs() {
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
}

function updateAdminPage() {
  $('.body').html(adminView())
  $('.home__btn').on('click', goHome)
  handleTabs()
}

function updateCustomerPage() {
  $('.body').html(customerView())
  $('.home__btn').on('click', goHome)
  handleTabs()
}

function getCurrentDate() {
  let today = new Date();
  let year = today.getFullYear();
  let month = String(today.getMonth() + 1).padStart(2, '0');
  let day = String(today.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`
};

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

$('.splash__btn--user').on('click', () => {
  $('.form__dropdown--user').removeClass().css('backgroundColor', 'hsl(240, 17%, 86%)');
});
  
$('.splash__btn--admin').on('click', () => {
  $('.form__dropdown--admin').removeClass().css('backgroundColor', 'hsl(240, 17%, 86%)');
});

function checkInputValueAdmin(userName, password) {
  if (userName === 'manager' && password === '123') {
    updateAdminPage()
  }
  $('.input').addClass('error').val('')
}

function checkInputValueCustomer(userName, password) {
  if (userName === 'customer50' && password === '123') {
    updateCustomerPage()
    createCustomer()
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



