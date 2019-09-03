import React from 'react';
import $ from "jquery";
import "bootswatch/dist/superhero/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import {
  BrowserRouter as Router
} from "react-router-dom";
import { connect } from "react-redux";
import {
  handlerInputsValueAction,
  handlerFilterAction,
  getNameModalAction,
  getAllUsersAction,
  getUserByLoginAction,
  statusLogInAction,
  getEditablePageAction,
  updateEditPageAction,
  addNewUserAction,
  addNewPageAction,
  deletePageAction, } from '../actions/actions';

import Header from '../components/Header';
import NavigationPanel from '../components/NavigationPanel';
import SearchPanel  from '../components/SearchPanel';
import ListPages from '../components/ListPages';
import { 
	AlertMessage, 
	SuccessMessage, 
	EditPageModal,
	CreateEditUser } from "../components/ModalMessages";

import "../styles/App.css";

class App extends React.Component {

	componentDidMount = () => {

    // change is-checked class on NavigationPanel
    $('.site-header').each( function( i, navGroup ) {
      var $navGroup = $( navGroup );
      $navGroup.on( 'click', '.carousel-cell', function() {
        $navGroup.find('.is-checked').removeClass('is-checked');
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
			handlerFilterToApp,
			getNameModalToApp,
			getAllUsersToApp,
			getUserByLoginToApp,
			statusLogInToApp,
			getEditablePageToApp,
			updateEditPageToApp,
			addNewUserToApp,
			addNewPageToApp,
			deletePageToApp } = this.props;

		const { 
			pageDetails,
			userProfile,
			auth,
			nameModal,
			filter,
			categories,
			pages,
			searchDetails,
			search,
			loading } = store;

		// фильтрация массива pages по значению
		// активного фильтра state.filter  
		const filterNotes = (arr, status) => {
			const newArr = arr.filter((item)=>{
				let qqq;
				if(status === item.type) qqq = item.type;
				if(status === 'all') qqq = arr;
				return qqq;
			});
			return newArr;
		}

		// определяем массив видимых pges для рендеринга
		const visibleItems = filterNotes(pages, filter);

		console.log(store);

	  	return (
		    <Router>
					<NavigationPanel 
		    		auth={auth} 
						categories={categories} 
						handlerFilter={handlerFilterToApp} />
		    	<Header 
		    		auth={auth} 
		    		user={userProfile}
		    		loading={loading}
		    		getNameModal={getNameModalToApp}
		    		getAllUsers={getAllUsersToApp}
		    		getUserByLogin={getUserByLoginToApp}
		    		statusLogIn={statusLogInToApp} 
            handlerInputsValue={handlerInputsValueToApp} />
		  		<SearchPanel 
		  			search={search}
		  			searchDetails={searchDetails} 
            handlerInputsValue={handlerInputsValueToApp} />
		    	<ListPages 
		    		auth={auth}  
		    		pages={visibleItems} 
	    		 	getNameModal={getNameModalToApp}
	    		 	getEditablePage={getEditablePageToApp}
						deletePage={deletePageToApp}/>
	        <AlertMessage  
	        	nameModal={nameModal} />
	        <SuccessMessage />
	        <EditPageModal
	        	pageDetails={pageDetails}
	        	categories={categories} 
	        	nameModal={nameModal} 
            handlerInputsValue={handlerInputsValueToApp}
            updateEditPage={updateEditPageToApp}
            addNewPage={addNewPageToApp}/>
	        <CreateEditUser  
	        	nameModal={nameModal}
            addNewUser={addNewUserToApp}/>
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
		handlerFilterToApp: (categorie) => {
			dispatch(handlerFilterAction(categorie))
		},
    statusLogInToApp: (status) => dispatch(statusLogInAction(status)),
    getAllUsersToApp: () => dispatch(getAllUsersAction()),
    getUserByLoginToApp: (login) => dispatch(getUserByLoginAction(login)),
		getEditablePageToApp: (id) => dispatch(getEditablePageAction(id)),
    updateEditPageToApp: (obj) => dispatch(updateEditPageAction(obj)),
		addNewUserToApp: (login, pass) => dispatch(addNewUserAction(login, pass)),
		addNewPageToApp: (obj) => dispatch(addNewPageAction(obj)),
    deletePageToApp: (idx) => dispatch(deletePageAction(idx)),
	})
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);