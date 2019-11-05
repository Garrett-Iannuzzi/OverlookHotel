
import $ from 'jquery';
import './css/base.scss';
import Hotel from './Hotel';
import Admin from './Admin';
import Customer from './Customer';

let hotel;
let admin;
let customer;
let today = getCurrentDate();
let randomCustomer = generateRandomUserId();

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
  const userInfo = users.find(person => person.id === randomCustomer)
  let customerBookings = bookings.filter(booking => booking.userID === randomCustomer)
  customer = new Customer(userInfo, rooms, customerBookings, today)
  $('#span__total--spent').text(customer.getTotalSpentOnRooms())
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
                  <h2 class="h2__rooms--taken" id="label__rooms--taken--js">Percentage of rooms occupied for today's date: <span id="span__percent--rooms"></span>${admin.getPercentRoomsOccupiedByDate(today)} %</h2>
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
              <h2 class="welcome__message">Welcome ${admin.getCustomerFirstName(randomCustomer)}</h2>
              <h2 class="h2--date">Today's Date: <span id="todays__date">${today}</span></h2>
              <h2 class="h2__rooms--available" id="label__rooms--available--js">Booking History: <span id="rooms__today">See Bookings Tab</span></p>
              <h2 class="h2__revenue" id="label__revenue--js">Total Spent At Overlook: $ <span id="span__total--spent"></span></h2>
            </div>
            <div class="tab__booking" id="tab__bookings">
              <button class="btn__bookings" id="btn__bookings--js">See Your Bookings</button>
              <ul class="list__guest--bookings"></ul>
              <label class="date__picker--label" for="start">Make A Reservation:</label>
              <input class="date__picker" id="date__picker--js" placeholder="yyyy/mm/dd">
              <button class="btn__avalible--rooms" id="btn__avalible--rooms--js">See Available Rooms</button>
              <ul class="list__avalible--rooms"></ul>
              <button class="btn__reservation" id="btn__reservation--js">Make New Reservation</button>
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
  $('#btn__bookings--js').on('click', displayGuestBookings)
  $('#btn__bookings--js').on('click', function() {
    $('.list__guest--bookings').show().css('display','block')
  });
  handleTabs()
  handleCustomerBooking()
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

function displayGuestBookings() {
  $('.list__display--bookings').show()
  let guestBookings = customer.getAllBookings()
  $('.list__guest--bookings').html('');
  guestBookings.forEach(booking => {
    let bookingsList = $(`<li><h6>Date: ${booking.date}<br> Room Number: ${booking.roomNumber}</h6></li>`);
    $('.list__guest--bookings').append(bookingsList);
  });
}

function handleCustomerBooking(e) {
  $('#date__picker--js').on('keyup', (e) => {
    let dateValue = $('#date__picker--js').val()
    console.log(dateValue)
    $('#btn__avalible--rooms--js').on('click', () => {
      let avalibleRooms = hotel.getAvailableRoomDetailsByDate(dateValue)
      $('.list__avalible--rooms').html('');
      avalibleRooms.forEach(room => {
        let roomsList = $(`<li><h6>Room Number: ${room.number}<br> Room Type: ${room.roomType}<br> Bidet: ${room.bidet}<br> Bed: ${room.bedSize}<br> Number of Beds: ${room.numBeds}<br> Cost: ${room.costPerNight}</h6></li>`);
        $('.list__avalible--rooms').append(roomsList);
      });
    })
  })

}
  


