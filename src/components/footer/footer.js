import React from "react";
import "./footer.css";
// export const Footer = () => {
//     return (
//         <footer>
//           <p>Contact us:</p>
//           <p>Email: info@solent.ac.uk</p>
//           <p>Phone: +44 2380 336 890</p>
//         </footer>
//     );
// }
//
// import React from 'react';

export const Footer = () => {
  return (
      <footer>
        <div className="contact-details">
          <h3>CONTACT US</h3>
          <p><b>EMAIL</b>: info@solentapp.com</p>
          <p><b>TEL</b>: 023 888 747474</p>
        </div>
        <div className="copyright">
          <p>Solent Parking App. &copy;{new Date().getFullYear()} All Rights Reserved.</p>
        </div>
      </footer>
  );
}

