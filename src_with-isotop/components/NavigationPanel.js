import React from 'react';
import Flickity from 'react-flickity-component'
import {ERROR_TEXT} from '../constants';

import '../styles/NavigationPanel.css'
import '../styles/customFlickity.css'

const flickityOptions = {
   // groupCells: '80%',
   autoPlay: 3000,
   wrapAround: true
}

const NavigationPanel = ({cathegories}) => {

  let navList = ERROR_TEXT;
  if(cathegories.length !== 0){
    navList = cathegories.map((item, index)=>{
      return(
        <div key={index} className="carousel-cell d-flex justify-content-center">
          <span className="pt-1" data-filter={"."+item.cathClass}>{item.cathName}</span>
        </div>
      )
    });
  }

	return(
    <nav id="filters" className="site-header sticky-top py-1">
       <Flickity className="carousel" options={flickityOptions}>
        <div className="carousel-cell is-checked d-flex justify-content-center">
          <span className="pt-1" data-filter="*">Show All</span>
        </div>
        {navList}
      </Flickity>
    </nav>
	);
} 

export default NavigationPanel;