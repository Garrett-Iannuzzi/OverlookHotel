
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
let availableRooms;

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

function sendPostRequest(bookingData) {
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings',
  {
    method: 'POST',
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify(bookingData)
  })
  .then(response => console.log('Booking Sent', response))
  .catch(error => console.log('Error'))
}

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
      <button class="home__btn" role="Home Screen">Home</button>
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
                  <h2 class="h2--date" tabindex="0">Today's Date: <span id="todays__date">${today}</span></h2>
                  <h2 class="h2__rooms--available" id="label__rooms--available--js" tabindex="0">Total Rooms Available Today: <span id="rooms__today">${admin.getTotalRoomsAvailableToday(today)}</span></p>
                  <h2 class="h2__revenue" id="label__revenue--js" tabindex="0">Todays Revenue: $ <span id="span__revenue">${admin.getTotalRoomsAvailableToday(today)}</span></h2>
                  <h2 class="h2__rooms--taken" id="label__rooms--taken--js" tabindex="0">Percentage of rooms occupied for today's date: <span id="span__percent--rooms"></span>${admin.getPercentRoomsOccupiedByDate(today)} %</h2>
                </div>
                <div id="tab__customer">
                  <h2 class="h2__search">Search Current Customers: </h2>
                  <p class="customer__name" id="customer__name--js"></p>
                  <input class="div__input--customer" id="div__input--customer--js" placeholder="Search Customer" role="Enter current customer name">
                  <button class="div__btn--customer" id="div__btn--customer--js" role="Search current customer">Search</button>
                  <section class="search__customer--section">
                    <h5>Name: <span class="customer__name--new" id="customer__name--new"></span></h5>
                    <select class="admin__search--rooms" id="admin__search--rooms--js">
                      <option class="list__admin--rooms">Booking History</option>
                    </select>
                    <button class="delete__booking" id="delete__booking--js">Delete Booking</button>
                    <h5 class="booking__error--admin">Can't Cancel Past Bookings</h5>
                    <h5>Customer Revenue: $<span id="customer__revenue"></span></h5>
                  </section>
                  <h2 class="h2__most--popular--date">Add New Booking For Current Customer:</h2>
                  <input class="date__picker--admin" id="date__picker--admin--js" placeholder="yyyy/mm/dd" role="Choose date">
                  <button class="btn__reservation--admin" id="btn__reservation--admin--js" role="See room list">See Available Rooms</button>
                  <select class="available__rooms--admin" id="available__rooms--admin--js" tabindex="0">
                    <option class="list__available--rooms--admin" tabindex="0">Select A Room</option>
                  </select>
                  <button class="btn__reservation--admin--final" id="btn__reservation--admin--final--js" role="See room list">Make Reservation</button>
                  <h6 class="all__done">Booking Has Been Made!</h6>
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
      <button class="home__btn" role="Home Screen">Home</button>
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
            <h2 class="welcome__message" tabindex="0">Welcome ${admin.getCustomerFirstName(randomCustomer)}</h2>
            <h2 class="h2--date" tabindex="0">Today's Date: <span id="todays__date">${today}</span></h2>
            <h2 class="h2__rooms--available" id="label__rooms--available--js" tabindex="0">Booking History: <span id="rooms__today">See Bookings Tab</span></p>
            <h2 class="h2__revenue" id="label__revenue--js" tabindex="0">Total Spent At Overlook: $ <span id="span__total--spent"></span></h2>
            </div>
            <div class="tab__booking" id="tab__bookings">
            <button class="btn__bookings" id="btn__bookings--js" role="See bookings">See Your Bookings</button>
            <ul class="list__guest--bookings"></ul>
            <section class="section__make--booking">
            <label class="date__picker--label">Make A Reservation:</label>
            <input class="date__picker" id="date__picker--js" placeholder="yyyy/mm/dd" role="Choose date">
            <select id="room__types">
            <option tabindex="0">Select a room type</option>
            <option value="single room">Single Room</option>
            <option value="suite">Suite</option>
            <option value="junior suite">Junior Suite</option>
            <option value="residential suite">Residential Suite</option>
            </select>
            <select class="available__rooms" id="available__rooms--js" tabindex="0">
            <option class="list__available--rooms" tabindex="0">Select A Room</option>
            </select>
            <button class="btn__reservation" id="btn__reservation--js" role="Make reservation">Make New Reservation</button>
            <h6 class="all__done">Booking Has Been Made!</h6>
            <p class="no__room--p">No Matching Rooms, Sorry!</p>
            </section>
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
  $('.body').html(adminView());
  $('.home__btn').on('click', goHome);
  $('#btn__reservation--admin--js').on('click', adminBooking);
  $('#btn__reservation--admin--final--js').on('click', makeAdminRoomBooking)
  handleTabs()
  adminHandler()
}

function updateCustomerPage() {
  $('.body').html(customerView())
  $('.home__btn').on('click', goHome)
  $('#btn__bookings--js').on('click', displayGuestBookings)
  $('#btn__bookings--js').on('click', function() {
    $('.list__guest--bookings').show().css('display','block')
  });
  $('#btn__available--rooms--js').on('click', function() {
    $('.list__available--rooms').show().css('display','block')
  });
  customerBookinghandler()
}

function adminHandler() {
  $('#div__btn--customer--js').on('click', searchCustomer);
  $('#delete__booking--js').on('click', deleteBooking);
}

function customerBookinghandler() {
  $('#date__picker--js').on('keyup', customerBooking);
  $('#room__types').on('change', filterRoomType);
  $('.btn__reservation').on('click', makeRoomBooking);
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
  if (userName === 'm' && password === '1') {
    updateAdminPage()
  }
  $('.input').addClass('error').val('')
}

function checkInputValueCustomer(userName, password) {
  if (userName === 'c' && password === '1') {
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
    let bookingsList = $(`<li><h6>BookingDate: ${booking.date}<br> Room Number: ${booking.roomNumber}</h6></li>`);
    $('.list__guest--bookings').append(bookingsList);
  });
}

function filterRoomType() {
    let type = $('#room__types').find(':selected').val();
    let filteredRooms = availableRooms.filter(room => room.roomType === type);
    $('#available__rooms--js').html('');
    filteredRooms.forEach(room => {
      const roomsItem = $(`<option><h6>Room Number: ${room.number}<br> Room Type: ${room.roomType}<br> Bidet: ${room.bidet}<br> Bed: ${room.bedSize}<br> Number of Beds: ${room.numBeds}<br> Cost: ${room.costPerNight}</h6></option>`);
      $('#available__rooms--js').append(roomsItem);
    });
} 

function customerBooking() {
    const dateValue = $('#date__picker--js').val()
    $('#available__rooms--js').on('click', () => {
      availableRooms = hotel.getAvailableRoomDetailsByDate(dateValue)
      $('#available__rooms--js').html('');
      availableRooms.forEach(room => {
       const roomsList = $(`<option data-room="${room.number}">Room Number: ${room.number}<br> Room Type: ${room.roomType}<br> Bidet: ${room.bidet}<br> Bed: ${room.bedSize}<br> Number of Beds: ${room.numBeds}<br> Cost: ${room.costPerNight}</option>`);
        $('#available__rooms--js').append(roomsList);
      });
    })
}

function makeRoomBooking() {
  const dateValue = $('#date__picker--js').val();
  const customerId = customer.id;
  const roomNumber = $('#available__rooms--js').children('option:selected').data('room');
  let booking = hotel.bookRoom(roomNumber, dateValue, customerId);
  sendPostRequest(booking)
  $('.all__done').show()
}

function searchCustomer() {
  let customerInputValue = $('#div__input--customer--js').val();
  let matchedCustomer = admin.getCustomerByName(customerInputValue);
  if (matchedCustomer) {
    let customerBookings = admin.getCustomerBookingsDetails(matchedCustomer.id);
    $('.search__customer--section').show();
    $('#customer__name--new').text(matchedCustomer.name);
    customerBookings.forEach(booking => {
      let bookingsList = $(`<option data-id="${booking.id}" data-date="${booking.date}">Booking ID: ${booking.id}<br> Date: ${booking.date}<br> Room Number: ${booking.roomNumber}</option>`);
      $('#admin__search--rooms--js').append(bookingsList);
    });
    $('#customer__revenue').text(admin.getCustomerRevenue(matchedCustomer.id))
  } else {
    $('#div__input--customer--js').addClass('error').val('')
  }
}

function adminBooking() {
  let bookingDate = $('#date__picker--admin--js').val();
  availableRooms = hotel.getAvailableRoomDetailsByDate(bookingDate);
  availableRooms.forEach(room => {
    const roomsList = $(`<option data-room="${room.number}">Room Number: ${room.number}<br> Room Type: ${room.roomType}<br> Bidet: ${room.bidet}<br> Bed: ${room.bedSize}<br> Number of Beds: ${room.numBeds}<br> Cost: ${room.costPerNight}</option>`);
      $('#available__rooms--admin--js').append(roomsList);
  });
}

function makeAdminRoomBooking() {
  let customerName = $('#div__input--customer--js').val();
  let matchedCustomer = admin.getCustomerByName(customerName)
  let bookingDate = $('#date__picker--admin--js').val();
  const roomNumber = $('#available__rooms--admin--js').children('option:selected').data('room')
  let booking = admin.bookRoom(roomNumber, bookingDate, matchedCustomer.id);
  sendPostRequest(booking);
  $('.all__done').show()
}

function deleteBookingPost(id) {
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: id,
    })
  })
  .then(response => response)
  .then(data => console.log(data))
  .catch(err => console.log(err))
}

function deleteBooking() {
  let bookingIdDelete = $('#admin__search--rooms--js').children('option:selected').data('id');
  let dateOfBookingToDelete = $('#admin__search--rooms--js').children('option:selected').data('date');
  let todayTimeStamp = new Date(today).getTime();
  let bookingTimeStamp = new Date(dateOfBookingToDelete).getTime();
  if (bookingTimeStamp >= todayTimeStamp) {
    deleteBookingPost(bookingIdDelete)
  } else {
    $('.booking__error--admin').show()
  }
}

function displayNoRoomError() {

}





