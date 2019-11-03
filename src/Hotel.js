// import Admin from './Admin';

class Hotel {
  constructor(userData, roomsData, bookingsData, currentDate) {
    this.customerData = userData || [];
    this.rooms = roomsData;
    this.bookings = bookingsData;
    this.date = currentDate;
  }

  getCustomerById(id) {
    let customer = this.customerData.find(customer => customer.id === id);
    return customer
  }

  getDateForBooking(date) {
    let bookingdate = this.bookings.find(booking => booking.date === date)
    return String(bookingdate.date);
    //I should be able to select a date for which I’d like to book a room for myself
  }

  getAvailableRoomDetailsByDate(date) {
    let availableRooms = this.rooms.reduce((acc, room) => {
      let bookingsByRoom = this.bookings.filter(booking =>
        booking.roomNumber === room.number);
      if (!bookingsByRoom.some(booking => booking.date === date)) {
        acc.push(room);
      }
        return acc;
    }, [])
    return availableRooms;
  }

  // bookRoom(roomNum, dateOfBooking, customerId) {
  //   let customer = this.getCustomerById(customerId);
  //   let availableRoomsDate = this.getAvailableRoomDetailsByDate(dateOfBooking)
  //   if (availableRoomsDate.includes(dateOfBooking)) {
  //     console.log(availableRoomsDate);

  //   }
  //   // let newBooking = availableRooms.find(room => room.number === roomNum);
  //   // this.bookings.push({ userId: customer.id , date: dateOfBooking, roomNumber: roomNum });
  // }

  getRoomByRoomType(roomSize, date) {
    let availableRooms = this.getAvailableRoomDetailsByDate(date);
    let roomsByType = availableRooms.filter(room => room.roomType === roomSize);
    return roomsByType
    //I should be able to filter the list of available rooms by their roomType property
  }

  errorDisplayIfRoomNotAvailable() {
    //In the event that no rooms are available for the date/roomType selected, display a message fiercely apologizing to the user and asking them to adjust their room search
  }



  
}

export default Hotel;