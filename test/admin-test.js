import chai from 'chai';
const expect = chai.expect;

import Hotel from '../src/Hotel';
import Admin from '../src/Admin';
import sampleCustomerData from './sample-customerData';
import sampleBookingsData from './sample-bookingsData';
import sampleRoomsData from './sample-roomsData';

let hotel;
let admin;

describe('Admin', function() {

  beforeEach(() => {
    hotel = new Hotel(sampleCustomerData, sampleRoomsData, sampleBookingsData, '2019/11/03');
    admin = new Admin(sampleCustomerData, sampleRoomsData, sampleBookingsData, '2019/11/03');
  });

  it('should be a function', function() {
    expect(Admin).to.be.a('function');
  });

  describe('Admin Properties', () => {
    it('should have information for all users', () => {
      expect(admin.customerData).to.eql(sampleCustomerData);
    });
  
    it('should have information for all rooms', () => {
      expect(admin.rooms).to.eql(sampleRoomsData);
    });
  
    it('should have information for all bookings', () => {
      expect(admin.bookings).to.eql(sampleBookingsData);
    });

    it('should have the current date', () => {
      expect(admin.date).to.equal('2019/11/03');
    });
  });

  it('should be able to get total rooms available by current date', () => {
    expect(admin.getTotalRoomsAvailableToday('2019/11/03')).to.equal(23);
  });

  it('should be able to get total percent of occupied rooms by current date', () => {
    expect(admin.getPercentRoomsOccupiedByDate('2019/11/03')).to.equal(.04);
  });

  it('should be able to get total revenue by current date', () => {
    expect(admin.getTotalRevenueToday('2019/11/03')).to.equal(954.29);
  });

  it('should be able to get a customers first name', () => {
    expect(admin.getCustomerFirstName(1)).to.equal('Leatha');
  });

  it('should be able to get bookings for a customer', () => {
    expect(admin.getCustomerBookingsDetails(1)).to.eql([
      {
        id: 1572293130156,
        userID: 1,
        date: "2019/11/03",
        roomNumber: 18,
        roomServiceCharges: [ ]
        },
        {
        id: 1572293130159,
        userID: 1,
        date: "2019/11/12",
        roomNumber: 8,
        roomServiceCharges: [ ]
        },
        {
        id: 1572293130159,
        userID: 1,
        date: "2019/10/29",
        roomNumber: 10,
        roomServiceCharges: [ ]
        },
        {
        id: 1572293130159,
        userID: 1,
        date: "2019/11/15",
        roomNumber: 4,
        roomServiceCharges: [ ]
        },
        {
        id: 1572293130160,
        userID: 1,
        date: "2019/13/06",
        roomNumber: 7,
        roomServiceCharges: [ ]
        },
        {
        id: 1572293130160,
        userID: 1,
        date: "2019/11/22",
        roomNumber: 1,
        roomServiceCharges: [ ]
        }
    ]);
  });

  it('should be able to get a customers revenue', () => {
    expect(admin.getCustomerRevenue(1)).to.equal(2274.61)
  });

});
