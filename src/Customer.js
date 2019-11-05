import Hotel from './Hotel'

class Customer extends Hotel {
  constructor(customerData, roomsData, bookingsData, currentDate) {
    super(customerData, roomsData, bookingsData, currentDate)
    this.id = customerData.id;
    this.name = customerData.name;
    this.customerBookings = bookingsData;
  }

  getAllBookings() {
    return this.bookings
  }

  getTotalSpentOnRooms() {
    
  }

}

export default Customer;