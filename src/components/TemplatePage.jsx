// este seria el componente para renderizar los componentes que comparten todas las paginas

import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';

const TemplatePage = children => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

TemplatePage.propTypes = {};

export default TemplatePage;