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

  getTotalRevenueToday(date) {
    let bookingsByDate = this.bookings.filter(booking => booking.date === date);
    let totalRev = bookingsByDate.reduce((acc, room) => {
      this.rooms.forEach(item => {
        if(item.number === room.roomNumber)
          acc += item.costPerNight
        })
        return acc
    }, 0);
    return Number(totalRev.toFixed(2))
  }

  getPercentRoomsOccupiedByDate(date) {
    let bookingsByDate = this.bookings.filter(booking => booking.date === date);
    let percentOccupied = Number((bookingsByDate.length / 50).toFixed(2))
    return percentOccupied
  }

  getCustomerFirstName(customerId) {
    let customer = this.customer.find(customer => customer.id === customerId);
    let firstName = customer.name.split(' ')[0];
    return firstName
  }

  getCustomerBookingsDetails(customerId) {
    return this.bookings.filter(booking => booking.userID === customerId);
  }

  getCustomerRevenue(customerId) {
    let customerBookings = this.getCustomerBookingsDetails(customerId);
    let totalRevenue = customerBookings.reduce((total, booking) => {
      this.rooms.forEach(room => {
        if (room.number === booking.roomNumber) {
          total += room.costPerNight
        }
      })
      return total
    }, 0)
    return Number(totalRevenue)
  }

  addBookingForCustomer() {

  }

  removeBookingForCustomer() {

  }

}

export default Admin;