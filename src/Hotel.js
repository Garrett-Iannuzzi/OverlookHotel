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

  bookRoom(roomNum, dateOfBooking, customerId) {
    let customer = this.getCustomerById(customerId);
    let availableRooms = this.getAvailableRoomDetailsByDate(dateOfBooking);
    let index = availableRooms.findIndex(room => room.number === roomNum)
    availableRooms.splice(index, 1);
    let booking = { userID: customer.id , date: dateOfBooking, roomNumber: roomNum };
    this.bookings.push(booking)
    return booking;
  }

  getRoomByRoomType(roomSize, date) {
    let availableRooms = this.getAvailableRoomDetailsByDate(date);
    let roomsByType = availableRooms.filter(room => room.roomType === roomSize);
    return roomsByType
  }

  errorDisplayIfRoomNotAvailable() {
    //In the event that no rooms are available for the date/roomType selected, display a message fiercely apologizing to the user and asking them to adjust their room search
  }

}

export default Hotel;