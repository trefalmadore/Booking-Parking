import React, {useState} from 'react';
import './BookingGrid.css';
import {db} from '../../config/firebase';
import {addDoc, collection, doc, updateDoc} from 'firebase/firestore'
import successImage from '../../assets/spec-check-1@2x.png'

function BookingGrid({
  availableSlots,
  bookedSlots,
  bookingInfo,
  setBookingInfo
}) {

  const {date, startTime, endTime, zone, selectedSlot} = bookingInfo;
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const sortedSlots = availableSlots.sort((a, b) => (a.code > b.code) ? 1 : -1);

  const handleSlotSelect = (slot) => {
    if (!date || !startTime || !endTime || !zone) {
      alert('Please fill in all booking details and select a slot.');
      return;
    }
    // Check if the selected slot is booked
    if (bookedSlots.some(b =>(b.code === slot.code))) {
      alert('This slot is already booked. Please select another slot.');
    } else {
      // Update selected slot and booking status
      setBookingInfo({...bookingInfo, selectedSlot: slot.id});
      setBookingSuccess(false);
    }
  };

  const handleBooking = async () => {
    const {selectedSlot} = bookingInfo;
    if (!selectedSlot) {
      alert('Please select a slot before booking.')
      return;
    }
    try {
      await saveBooking(selectedSlot);
      setBookingSuccess(true);
    } catch (error) {
      console.error('Error booking:', error);
      alert('Booking failed. Please try again.');
    }
  };

  const saveBooking = async (slotId) => {
    const {date, startTime, endTime, zone} = bookingInfo;

    await addDoc(collection(db, 'bookings'), {
      date,
      startTime,
      endTime,
      zone,
      slot: slotId,
    });

    // Update the status of the selected slot to "booked" in Firestore
    const slotRef = doc(db, "slots", slotId);
    await updateDoc(slotRef, {
      status: 'booked'
    });

    // Refresh the available and booked slots
    setBookingInfo({
      date: '',
      startTime: '',
      endTime: '',
      zone: '',
      selectedSlot: null,
    });
  };

  return (
      <div className="booking-grid-container">
        <h2 className="form-title-s">SEARCH RESULTS</h2>
        <div className="booking-grid">
          {sortedSlots.map((slot) => (
              <div
                  key={slot.id}
                  className={`slot ${
                      bookedSlots.some(b =>(b.code === slot.code)) ? 'booked'
                          : 'available'
                  } ${selectedSlot === slot.id ? 'selected' : ''}`}
                  onClick={() => handleSlotSelect(slot)}
              >
                {slot.name}
              </div>
          ))}

        </div>
        <button className="book-button"
                disabled={!selectedSlot} onClick={handleBooking}>
          BOOK SLOT NOW
        </button>
        {bookingSuccess &&
            <p className="success-message">
              <img src={successImage} alt="Success"/>SLOT BOOKED SUCCESSFULLY
            </p>
        }
      </div>
  );
}

export default BookingGrid;
