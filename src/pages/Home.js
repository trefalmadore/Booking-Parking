import React, {useEffect, useState} from "react";
import {Navbar} from "../components/navbar/navbar";
import {Footer} from "../components/footer/footer";
import BookingForm from "../components/bookingform/BookingForm";
import BookingGrid from "../components/bookinggrid/BookingGrid";
import bannerImg from "../assets/bannercar-1@2x.png"
import sideImage from "../assets/ellipse-9.png"
import { db } from '../config/firebase';
import {collection, query, orderBy, where, getDocs} from 'firebase/firestore'
import "./banner.css"
import "./utils.css"

export const Home = () => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [bookingInfo, setBookingInfo] = useState({
    date: '',
    startTime: '',
    endTime: '',
    zone: '',
    selectedSlot: null,
  });

  useEffect(() => {
    // Fetch available and booked slots from Firestore
    const fetchSlots = async () => {
      const allSlots =
          query(collection(db,'slots'), orderBy('code'));
      const availableSlotsSnapshot =
          await getDocs(allSlots);
      const slotsBooked = query(collection(db,'slots'),
          where('status', '==', 'booked'), orderBy('code'));
      const bookedSlotsSnapshot =
          await getDocs(slotsBooked);
      const allSlotsData = availableSlotsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const bookedSlotsData = bookedSlotsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAvailableSlots(allSlotsData);
      setBookedSlots(bookedSlotsData);
    };

    fetchSlots().then(r =>
        console.log(r));
  }, []);

  const handleBookingSubmit = async () => {

    const { date, startTime, endTime, zone } = bookingInfo;

    if (!date || !startTime || !endTime || !zone) {
      alert('Please fill in all booking details and select a slot.');
      return;
    }
    const zoneSlots =
        query(collection(db,'slots'), where('zone', '==', bookingInfo.zone));
    const zoneSlotsSnapshot =
        await getDocs(zoneSlots);

    const zoneSlotsData = zoneSlotsSnapshot.docs
    .map((doc) =>({
      id: doc.id,
      ...doc.data(),
    }));

    setAvailableSlots(zoneSlotsData);

    setBookingInfo({...bookingInfo, selectedSlot: null});

  };
  return (
      <div className="container">
        <Navbar/>
        <main>
          <div className="banner">
            <div className="side-img"><img src={sideImage} alt="" /></div>
            <div className="banner-desc">

              <h1 className="text-thin-1">
                Get the best
              </h1>
              <h1 className="text-thin">
                <strong>Parking Services
                  In Campus</strong>
              </h1>
              <p className="text-thin-2">
                The Perfect Web App
              </p>

            </div>
            <div className="banner-img"><img src={bannerImg} alt="" /></div>
          </div>
          <section className="booking-form-section">
            <BookingForm
            bookingInfo={bookingInfo}
            setBookingInfo={setBookingInfo}
            handleBookingSubmit={handleBookingSubmit}
            />
          </section>
          <section className="booking-grid-section">
            <BookingGrid
            availableSlots={availableSlots}
            bookedSlots={bookedSlots}
            bookingInfo={bookingInfo}
            setBookingInfo={setBookingInfo}
            />
          </section>
        </main>
        <Footer/>
      </div>
  );
};