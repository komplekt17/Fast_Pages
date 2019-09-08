import React from 'react';
import $ from "jquery";
import Flickity from 'react-flickity-component'
import {ERROR_TEXT} from '../constants';

import '../styles/NavigationPanel.css'
import '../styles/customFlickity.css'

const flickityOptions = {
   // groupCells: '80%',
   autoPlay: 3000,
   wrapAround: true
}

const NavigationPanel = ({ auth, categories, handlerFilter }) => {

  // change is-checked class on NavigationPanel
  $('.site-header').each( function( i, navGroup ) {
    var $navGroup = $( navGroup );
    $navGroup.on( 'click', '.carousel-cell', function() {
      $navGroup.find('.is-checked').removeClass('is-checked');
      $( this ).addClass('is-checked');
    });
  });

  let navList = ERROR_TEXT;
  if(categories.length !== 0){
    navList = categories.map((item, index)=>{
      return(
        <div key={index} className="carousel-cell d-flex justify-content-center">
          <span 
            className="pt-1"
            onClick={()=>handlerFilter(item.catClass)}>
            {item.catName}
          </span>
        </div>
      )
    });
  }

	return(
    <nav className="site-header sticky-top py-1">
    {
      auth ?
         <Flickity className="carousel" options={flickityOptions}>
          <div className="carousel-cell is-checked d-flex justify-content-center">
            <span className="pt-1" onClick={()=>handlerFilter('all')}>
              Show All
            </span>
          </div>
          {navList}
        </Flickity>
      : ''
    }
    </nav>
	);
} 

export default NavigationPanel;