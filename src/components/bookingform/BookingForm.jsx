import React from 'react';
import './BookingForm.css'

function BookingForm({bookingInfo, setBookingInfo, handleBookingSubmit}) {
  const { date, startTime, endTime } = bookingInfo;
   const bookingZoneOptions = ['Library', 'Admin'];

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setBookingInfo({...bookingInfo, [name]: value});
  };

  const isDateValid = new Date(date) >= new Date();
  const isStartTimeValid = new Date(`${date}T${startTime}`) >= new Date();
  const isEndTimeValid = new Date(`${date}T${endTime}`) > new Date();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isDateValid) {
      alert('Please select a date in the present or future.');
      return;
    }

    if (!isStartTimeValid) {
      alert('Please select a start time in the present or future.');
      return;
    }

    if (!isEndTimeValid) {
      alert('Please select an end time in the future.');
      return;
    }


    handleBookingSubmit();
  };


  return (
      <div id="book-a-slot" className="book-a-slot-section">
        <div className="booking-form-container">
          <h2 className="form-title">BOOK A SLOT</h2>
          <form className="booking-form">
            <div className="left-column">
              <label>Select Date:</label>
              <input
                  type="date"
                  name="date"
                  value={bookingInfo.date}
                  onChange={handleInputChange}
                  required
              />

              <label>End Time:</label>
              <input
                  type="time"
                  name="endTime"
                  value={bookingInfo.endTime}
                  onChange={handleInputChange}
                  required
              />
            </div>
            <div className="right-column">
              <label>Start Time:</label>
              <input
                  type="time"
                  name="startTime"
                  value={bookingInfo.startTime}
                  onChange={handleInputChange}
                  required
              />

              <label>Select Parking Zone:</label>
              <select
                  name="zone"
                  value={bookingInfo.zone}
                  onChange={handleInputChange}
                  required
              >
                <option value="">Select Parking Zone</option>
                {bookingZoneOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                ))}
              </select>
            </div>
          </form>
          <div>
            <button onClick={handleSubmit} className="button-container">Search Parking
              Zone
            </button>
          </div>
        </div>
      </div>
  );
}

export default BookingForm;
