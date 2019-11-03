import chai from 'chai';
const expect = chai.expect;

import Hotel from '../src/Hotel';
import sampleCustomerData from './sample-customerData';
import sampleBookingsData from './sample-bookingsData';
import sampleRoomsData from './sample-roomsData';

let hotel;

describe('Hotel', function() {

  beforeEach(() => {
    hotel = new Hotel(sampleCustomerData, sampleRoomsData, sampleBookingsData);
  });

  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  });

  it('should have information for all users', () => {
    expect(hotel.customerData).to.eql(sampleCustomerData);
  });





});
