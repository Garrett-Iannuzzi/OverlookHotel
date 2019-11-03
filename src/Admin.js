import Hotel from './Hotel'

class Admin extends Hotel {
  constructor(customerData, roomsData, bookingsData, currentDate) {
    super(customerData, roomsData, bookingsData)
    this.customer = customerData;
    this.rooms = roomsData;
    this.bookings = bookingsData;
    this.date = currentDate;
  }

  getTotalRoomsAvailableToday() {

  }

  getTotalRevenueToday() {

  }

  getPercentRoomsOccupiedToday() {

  }

  getCustomerName() {

  }

  getCustomerBookingsDetails() {

  }

  getCustomerRevenue() {

  }

  addBookingForCustomer() {

  }

  removeBookingForCustomer() {
    
  }

}

export default Admin;