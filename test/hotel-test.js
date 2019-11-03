import chai from 'chai';
const expect = chai.expect;

import Hotel from '../src/Hotel';
import sampleCustomerData from './sample-customerData';
import sampleBookingsData from './sample-bookingsData';
import sampleRoomsData from './sample-roomsData';

let hotel;

describe('Hotel', function() {

  beforeEach(() => {
    hotel = new Hotel(sampleCustomerData, sampleRoomsData, sampleBookingsData, '2019/11/03');
  });

  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  });

  describe('Hotel Properties', () => {
    it('should have information for all users', () => {
      expect(hotel.customerData).to.eql(sampleCustomerData);
    });
  
    it('should have information for all rooms', () => {
      expect(hotel.rooms).to.eql(sampleRoomsData);
    });
  
    it('should have information for all bookings', () => {
      expect(hotel.bookings).to.eql(sampleBookingsData);
    });

    it('should have the current date', () => {
      expect(hotel.date).to.equal('2019/11/03')
    });
  });

  it('should be able to locate a customer by their ID', () => {
    expect(hotel.getCustomerById(1)).to.eql({
      id: 1, name: "Leatha Ullrich"
    });
  });

  it('should be able to select a date', () => {
    expect(hotel.getDateForBooking('2019/11/03')).to.equal('2019/11/03')
  });

  it('should be able to get available rooms by date', () => {
    expect(hotel.getAvailableRoomDetailsByDate('2019/11/03')).to.eql([
      {
        number: 1,
        roomType: "residential suite",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 358.4
        },
        {
        number: 2,
        roomType: "suite",
        bidet: false,
        bedSize: "full",
        numBeds: 2,
        costPerNight: 477.38
        },
        {
        number: 3,
        roomType: "single room",
        bidet: false,
        bedSize: "king",
        numBeds: 1,
        costPerNight: 491.14
        },
        {
        number: 4,
        roomType: "single room",
        bidet: false,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 429.44
        },
        {
        number: 5,
        roomType: "single room",
        bidet: true,
        bedSize: "queen",
        numBeds: 2,
        costPerNight: 340.17
        },
        {
        number: 6,
        roomType: "junior suite",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 397.02
        },
        {
        number: 7,
        roomType: "single room",
        bidet: false,
        bedSize: "queen",
        numBeds: 2,
        costPerNight: 231.46
        },
        {
        number: 8,
        roomType: "junior suite",
        bidet: false,
        bedSize: "king",
        numBeds: 1,
        costPerNight: 261.26
        },
        {
        number: 9,
        roomType: "single room",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 200.39
        },
        {
        number: 10,
        roomType: "suite",
        bidet: false,
        bedSize: "twin",
        numBeds: 1,
        costPerNight: 497.64
        },
        {
        number: 11,
        roomType: "single room",
        bidet: true,
        bedSize: "twin",
        numBeds: 2,
        costPerNight: 207.24
        },
        {
        number: 12,
        roomType: "single room",
        bidet: false,
        bedSize: "twin",
        numBeds: 2,
        costPerNight: 172.09
        },
        {
        number: 13,
        roomType: "single room",
        bidet: false,
        bedSize: "queen",
        numBeds: 2,
        costPerNight: 423.92
        },
        {
        number: 15,
        roomType: "residential suite",
        bidet: false,
        bedSize: "full",
        numBeds: 1,
        costPerNight: 294.56
        },
        {
        number: 16,
        roomType: "single room",
        bidet: false,
        bedSize: "full",
        numBeds: 2,
        costPerNight: 325.6
        },
        {
        number: 17,
        roomType: "junior suite",
        bidet: false,
        bedSize: "twin",
        numBeds: 2,
        costPerNight: 328.15
        },
        {
        number: 19,
        roomType: "single room",
        bidet: false,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 374.67
        },
        {
        number: 20,
        roomType: "residential suite",
        bidet: false,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 343.95
        },
        {
        number: 21,
        roomType: "single room",
        bidet: false,
        bedSize: "full",
        numBeds: 2,
        costPerNight: 429.32
        },
        {
        number: 22,
        roomType: "single room",
        bidet: false,
        bedSize: "full",
        numBeds: 2,
        costPerNight: 350.31
        },
        {
        number: 23,
        roomType: "residential suite",
        bidet: false,
        bedSize: "queen",
        numBeds: 2,
        costPerNight: 176.36
        },
        {
        number: 24,
        roomType: "suite",
        bidet: false,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 327.24
        },
        {
        number: 25,
        roomType: "single room",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 305.85
        }
    ]);
  });
  
  // it ('should be able to book a room', () => {
  //   expect(hotel.bookRoom(25, '2019/11/03', 2)).to.eql({
  //     userID: 2,
  //     date: '2019/11/17',
  //     roomNumber: 25,
  //     })
  // });

  it('should be able to filter by room feature', () => {
    expect(hotel.getRoomByRoomType('residential suite', '2019/11/03')).to.eql([
      {
        number: 1,
        roomType: 'residential suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 358.4
      },
      {
        number: 15,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'full',
        numBeds: 1,
        costPerNight: 294.56
      },
      {
        number: 20,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 343.95
      },
      {
        number: 23,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 176.36
      },
    ]);
  });


});
