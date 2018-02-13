import React from 'react';
import phoneAppImage from '../../resources/images/phone_app.png';
import appStoreBtn from '../../resources/images/appstore_button.png';

const AppPromotion = () => (
  <div className="app-promotion">
    <div className="phone-wrapper">
      <img src={phoneAppImage} alt="Get the App" />
    </div>
    <a href="http://appstore.com" className="appstore-btn">
      <img src={appStoreBtn} alt="Download from the App Store" />
    </a>
    <div className="social-links">
      <a href="http://facebook.com" className="icn-facebook" />
      <a href="http://twitter.com"><span className="icn-twitter" /></a>
    </div>
  </div>
);

export default AppPromotion;
