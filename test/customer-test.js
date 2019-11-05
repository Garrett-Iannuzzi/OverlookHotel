import chai from 'chai';
const expect = chai.expect;

import Customer from '../src/Customer';
import sampleRoomsData from './sample-roomsData';

let customer;
let sampleCustomer = { id: 1, name: "Leatha Ullrich" }
let sampleCustomerBookings = [
  { id: 1572293130156, userID: 1, date: "2019/11/03", roomNumber: 18, roomServiceCharges: [ ] },
  { id: 1572293130159, userID: 1, date: "2019/11/12", roomNumber: 8, roomServiceCharges: [ ] },
  { id: 1572293130159, userID: 1, date: "2019/10/29", roomNumber: 10, roomServiceCharges: [ ] },
  { id: 1572293130159, userID: 1, date: "2019/11/15", roomNumber: 4, roomServiceCharges: [ ] },
  { id: 1572293130160, userID: 1, date: "2019/13/06", roomNumber: 7, roomServiceCharges: [ ] },
  { id: 1572293130160, userID: 1, date: "2019/11/22", roomNumber: 1, roomServiceCharges: [ ] },
]

describe('Customer', function() {

  beforeEach(() => {
    customer = new Customer(sampleCustomer, sampleRoomsData, sampleCustomerBookings, '2019/11/03');
  });

  it('should be a function', function() {
    expect(Customer).to.be.a('function');
  });

  describe('Customer Properties', () => {

    it('should have a special id', () => {
      expect(customer.id).to.eql(1);
    });
  
    it('should have a name', () => {
      expect(customer.name).to.eql('Leatha Ullrich');
    });

    it('should have information on all rooms', () => {
      expect(customer.rooms).to.eql(sampleRoomsData);
    });
  
    it('should have information for all bookings', () => {
      expect(customer.bookings).to.eql(sampleCustomerBookings);
    });

    it('should have the current date', () => {
      expect(customer.date).to.equal('2019/11/03');
    });

  });

  it('should get information on customer specific bookings', () => {
    expect(customer.getAllBookings()).to.eql(sampleCustomerBookings);
  });

  it('should get total revenue spent on bookings', () => {
    expect(customer.getTotalSpentOnRooms()).to.equal(2274.61);
  })

});