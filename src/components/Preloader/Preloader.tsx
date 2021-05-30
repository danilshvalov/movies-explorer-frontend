import React from 'react';

import './Preloader.css';

/** Компонент-заглушка во время загрузки данных */
const Preloader = () => (
  <div className="preloader">
    <div className="preloader__container">
      <span className='preloader__round'/>
    </div>
  </div>
);

export default Preloader;
