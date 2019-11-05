import Hotel from './Hotel'

class Customer extends Hotel {
  constructor(customerData, roomsData, bookingsData, currentDate) {
    super(customerData, roomsData, bookingsData, currentDate)
    this.id = customerData.id;
    this.name = customerData.name;
    this.rooms = roomsData;
    this.customerBookings = bookingsData;
    this.date = currentDate;
  }

  getAllBookings() {
    return this.bookings
  }

  getTotalSpentOnRooms() {
    let totalRev = this.customerBookings.reduce((acc, room) => {
      this.rooms.forEach(item => {
        if(item.number === room.roomNumber)
          acc += item.costPerNight
        })
        return acc
    }, 0);
    return Number(totalRev.toFixed(2))
  }

}

export default Customer;