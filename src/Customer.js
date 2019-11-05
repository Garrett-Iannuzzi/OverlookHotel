import Hotel from './Hotel'

class Customer extends Hotel {
  constructor(customerData, roomsData, bookingsData, currentDate) {
    super(customerData, roomsData, bookingsData, currentDate)
    
  }

  getAllBookings(id) {
    // filter for user id 5
    console.log(this)
  }

  getTotalSpentOnRooms() {
    
  }

}

export default Customer;