// import Admin from './Admin';

class Hotel {
  constructor(userData, roomsData, bookingsData, currentDate) {
    this.customerData = userData || [];
    this.rooms = roomsData;
    this.bookings = bookingsData;
    this.date = currentDate;
  }

  getCustomerById() {

  }

  bookRoom() {

  }

  getRoomDetailsByDate() {
  //Upon selecting a date, I should be shown a list of room details for only rooms that are available on that date
  }

  getDateForBooking() {
    //I should be able to select a date for which I’d like to book a room for myself
  }

  getRoomByType() {
    //I should be able to filter the list of available rooms by their roomType property
  }

  errorDisplayIfRoomNotAvailable() {
    //In the event that no rooms are available for the date/roomType selected, display a message fiercely apologizing to the user and asking them to adjust their room search
  }



  
}

export default Hotel;