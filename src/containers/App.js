import React from 'react';
import $ from "jquery";
import jQueryBridget from 'jquery-bridget';
import Isotope from "isotope-layout";

import "bootswatch/dist/superhero/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import {
  BrowserRouter as Router
} from "react-router-dom";
import { connect } from "react-redux";
import {
  handlerInputsValueAction,
  getNameModalAction,
  statusLogInAction,
  getEditablePageAction,
  updateEditPageAction, } from '../actions/actions';

import Header from '../components/Header';
import NavigationPanel from '../components/NavigationPanel';
import SearchPanel  from '../components/SearchPanel';
import ListPages from '../components/ListPages';
import { 
	AlertMessage, 
	SuccessMessage, 
	EditPageModal,
	AddNewUser } from "../components/ModalMessages";

import "../styles/App.css";

class App extends React.Component {

	componentDidMount = () => {

		jQueryBridget( 'isotope', Isotope, $ );

		// init Isotope
		var $grid = $('.grid').isotope({
		  itemSelector: '.grid-item',
		  getSortData: {
		    name: '.name',
		    symbol: '.symbol',
		    number: '.number parseInt',
		    category: '[data-category]'
		  }
		});

		// filter functions
		var filterFns = {
		  // show if number is greater than 50
		  numberGreaterThan50: function() {
		    var number = $(this).find('.number').text();
		    return parseInt( number, 10 ) > 50;
		  },
		  // show if name ends with -ium
		  ium: function() {
		    var name = $(this).find('.name').text();
		    return name.match( /ium$/ );
		  }
		};

		// bind filter span click
		$('#filters').on( 'click', 'span', function() {
		  var filterValue = $( this ).attr('data-filter');
		  // use filterFn if matches value
		  filterValue = filterFns[ filterValue ] || filterValue;
		  $grid.isotope({ filter: filterValue });
		});

		// bind sort button click
		$('#sorts').on( 'click', 'button', function() {
		  var sortByValue = $(this).attr('data-sort-by');
		  $grid.isotope({ sortBy: sortByValue });
		});

		// change is-checked class on buttons
		$('.site-header').each( function( i, buttonGroup ) {
		  var $buttonGroup = $( buttonGroup );
		  $buttonGroup.on( 'click', '.carousel-cell', function() {
		    $buttonGroup.find('.is-checked').removeClass('is-checked');
		    $( this ).addClass('is-checked');
		  });
		});
		

		/* обработка фона селекта поиска*/
		$('#selectSearch').on('change', function(){
		  var name = $(this).val();
		  
		   $('#selectSearch').removeClass().addClass(name+" form-control");
			// очищаем от текста поле селекта после клика по option 
		   $('#selectSearch').val('');
		});

		// очищаем от текста поле селекта после монтирования 
		$('#selectSearch').val('');
  };

	render(){

		const {
			store,
			handlerInputsValueToApp,
			getNameModalToApp,
			statusLogInToApp,
			getEditablePageToApp,
			updateEditPageToApp, } = this.props;

		const { 
			pageDetails,
			userProfile,
			auth,
			nameModal,
			cathegories,
			pages,
			search } = store;

		console.log(store);

	  	return (
		    <Router>
				<NavigationPanel cathegories={cathegories} />
		    	<Header 
		    		auth={auth} 
		    		user={userProfile}
		    		getNameModal={getNameModalToApp}
		    		statusLogIn={statusLogInToApp} />
		  		<SearchPanel search={search} />
		    	<ListPages 
		    		auth={auth}  
		    		pages={pages} 
	    		 	getNameModal={getNameModalToApp}
	    		 	getEditablePage={getEditablePageToApp}/>
	        <AlertMessage />
	        <SuccessMessage />
	        <EditPageModal
	        	pageDetails={pageDetails}
	        	cathegories={cathegories} 
	        	nameModal={nameModal} 
            handlerInputsValue={handlerInputsValueToApp}
            updateEditPage={updateEditPageToApp}/>
	        <AddNewUser  
	        	nameModal={nameModal}
            handlerInputsValue={handlerInputsValueToApp}/>
		    </Router>
	  );
  }
}

const mapStateToProps = (state) => {
	return {store: state}
}

const mapDispatchToProps = (dispatch) => {
	return ({
		getNameModalToApp: (text) => dispatch(getNameModalAction(text)),
    handlerInputsValueToApp: (value, id) => {
    	dispatch(handlerInputsValueAction(value, id))
    },
    statusLogInToApp: (status) => dispatch(statusLogInAction(status)),
		getEditablePageToApp: (id) => dispatch(getEditablePageAction(id)),
    updateEditPageToApp: (obj) => dispatch(updateEditPageAction(obj)),
	})
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);