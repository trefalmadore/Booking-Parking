import React, {useEffect, useState} from "react";
import { auth, provider } from '../../config/firebase';
import { signOut, signInWithPopup} from 'firebase/auth'
import logoImage from '../../assets/image-6@2x.png'
import topbarImg from '../../assets/ellipse-10.png'
import "./navbar.css";


export const Navbar = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    });
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error logging in:', error)
    }
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error logging in:', error)
    }
  };

  const handleFindParkingSpaceClick = () => {
    const bookASlotSection = document.getElementById('book-a-slot');
    if (bookASlotSection) {
      bookASlotSection.scrollIntoView({behavior: 'smooth'})
    }
  }

  return (
      <div className="navbar-container">
        <nav className="navbar">
          <div className="navbar-left">
            <img src={logoImage} alt="Logo" className="logo"/>
          </div>
          <div className="navbar-center">
            <img src={topbarImg} alt="" className="topbar-img"/>
            <a href="/" className="home">Home</a>
            <a href="/#book-a-slot" onClick={handleFindParkingSpaceClick}
               className="find-parking-space">Find parking Space</a>
          </div>
          <div className="navbar-right">
            {user ? (
                <>
                  <p className="display-name">Hi, {user.displayName}!</p>
                  <button className="logout-button"
                          onClick={handleLogout}> Logout
                  </button>
                </>
            ) : (
                <>
                  <button className="login-button"
                          onClick={handleLogin}> Login
                  </button>
                </>

            )}
          </div>
        </nav>
      </div>
  );
};
