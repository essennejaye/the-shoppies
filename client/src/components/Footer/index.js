import React from 'react';

const Footer = () => {
  let currentDate = new Date().getFullYear();
  return (
    <section className='footer'>
      <div className="name-date">
        <p>
          Essennejaye &copy; {currentDate}
        </p>
      </div>
      <div className="icon-img">
        <a href="https://github.com/essennejaye"><img src="../images1/github-32px.png" alt="github icon" /></a>
        <a href="https://www.linkedin.com/in/satalia-n-jefferson"><img src="../images1/linkedin-32px.png" alt="linkedin icon" /></a>
      </div>
    </section>
      )
  }
export default Footer;
