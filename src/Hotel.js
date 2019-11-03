import User from "./User";

class Hotel {
  constructor(userData, roomsData, bookingsData) {
    this.user = userData;
    this.rooms = roomsData;
    this.bookings = bookingsData;
  }

  findUserById(id) {
    return this.user.find(user => user.id === id)
  }
}

export default Hotel;