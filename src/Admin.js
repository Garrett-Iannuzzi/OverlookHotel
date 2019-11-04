import Hotel from './Hotel'

class Admin extends Hotel {
  constructor(customerData, roomsData, bookingsData, currentDate) {
    super(customerData, roomsData, bookingsData, currentDate)
    this.customer = customerData;
    this.rooms = roomsData;
    this.bookings = bookingsData;
    this.date = currentDate;
  }

  getTotalRoomsAvailableToday(date) {
    let roomsWithCustomers = this.bookings.reduce((acc, room) => {
      if (date === room.date) {
        acc.push(room);
      }
      return acc;
    }, []).length;
    return Number(this.rooms.length - roomsWithCustomers)
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