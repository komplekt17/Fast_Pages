import React from 'react';
import $ from "jquery";
import "bootswatch/dist/superhero/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import { connect } from "react-redux";
import {
  handlerInputsValueAction,
  handlerFilterAction,
  getAllUsersAction,
  getAllPagesAction,
  getAllCategoriesAction,
  getDataByUserLoginAction,
  statusLogInAction,
  getEditablePageAction,
  updateEditPageAction,
  updateEditCategorieAction,
  addNewUserAction,
  addNewPageAction,
  addNewCategorieAction,
  deletePageAction, } from '../actions/actions';

import Header from '../components/Header';
import NavigationPanel from '../components/NavigationPanel';
import SettingsPanel from '../components/SettingsPanel';
import ListPages from '../components/ListPages';
import Loader from '../components/Loader'
import { 
	AlertMessage, 
	SuccessMessage,
	CreatePageModal, 
	EditPageModal,
	CreateUserModal,
	EditUserModal } from "../components/ModalMessages";

import "../styles/App.css";

class App extends React.Component {

	componentDidMount = () => {

		// очищаем от текста поле селекта после монтирования 
		$('#selectSearch').val('');
  };

	render(){

		const {
			store,
			handlerInputsValueToApp,
			handlerFilterToApp,
			// getAllUsersToApp,
			// getAllPagesToApp,
			// getAllCategoriesToApp,
			getDataByUserLoginToApp,
			statusLogInToApp,
			getEditablePageToApp,
			updateEditPageToApp,
			updateEditCategorieToApp,
			addNewUserToApp,
			addNewPageToApp,
			addNewCategorieToApp,
			deletePageToApp } = this.props;

		const { 
			pageDetails,
			userProfile,
			auth,
			textModal,
			filter,
			categories,
			pages,
			searchDetails,
			search,
			loading } = store;

		// обработка фона селекта поиска
		const handlerSearchService = () => {
		  const name = $('#selectSearch').val();
	   	$('#selectSearch').removeClass().addClass(name+" form-control");

			// очищаем от текста поле селекта после клика по option 
	   	$('#selectSearch').val('');
		}

		// фильтрация массива pages по значению
		// активного фильтра state.filter  
		const filterNotes = (arr, status) => {
			const newArr = arr.filter((item)=>{
				let qqq;
				if(status === item.ctgrClass) qqq = item.ctgrClass;
				if(status === 'all') qqq = arr;
				return qqq;
			});
			return newArr;
		}

		// получение "нормализованного" массива pages
		// с читаемым классом принадлежности к категории и цветовым оформлением 
		// http://javascript.ru/forum/misc/78380-kak-poluchit-novyjj-massiv-posle-sravneniya-2-kh-iskhodnykh.html#post512491

		const getPagesArr = (pages, categories) =>{
			for(var i=0; i <= pages.length; i++){
				for(var j=0; j <= categories.length; j++){
					for(var kk in pages[i]){
						for(var dd in categories[j]){
							if(categories[j]['_id'] === pages[i]['ctgrId']){
								pages[i]['ctgrClass'] = categories[j]['catClass']
								pages[i]['ctgrColor'] = categories[j]['catColor']
								pages[i]['ctgrBGC'] = categories[j]['catBGC']
							}
						}
					}
				}
			}
			return pages;
		}

		// определяем массив видимых pages для рендеринга
		// согласно выбранного фильтра
		let normalizePages;
		if(categories.length === 0) normalizePages = pages; 
		else normalizePages = getPagesArr(pages, categories)

		const visibleItems = filterNotes(normalizePages, filter);

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
		    		getDataByLogin={getDataByUserLoginToApp}
		    		statusLogIn={statusLogInToApp}
  					handlerSearchService={handlerSearchService} />
      		{loading ? <Loader /> : null}
          <Switch>
          	<Route
            	exact
	            path="/settings"
	            render={() => (
					    	<SettingsPanel 
		    					user={userProfile} 
		    					categories={categories} 
		    					countPages={pages.length} 
		    					countCats={categories.length}
            			handlerInputsValue={handlerInputsValueToApp}
            			addNewCategorie={addNewCategorieToApp}
									updateEditCategorie={updateEditCategorieToApp} />
	            )}
          	/>
          	<Route
	            path="/"
	            render={() => (
					    	<ListPages 
					    		auth={auth}  
					    		pages={visibleItems}
					    		loading={loading}
				    		 	getEditablePage={getEditablePageToApp}
									deletePage={deletePageToApp} 
					  			search={search}
					  			searchDetails={searchDetails} 
			            handlerInputsValue={handlerInputsValueToApp}
			            handlerSearchService={handlerSearchService} />
	            )}
          	/>
          </Switch>
	        <AlertMessage  
	        	textModal={textModal} />
	        <SuccessMessage  
	        	textModal={textModal} />
	        <CreatePageModal
	        	categories={categories} 
            addNewPage={addNewPageToApp}
            userID={userProfile.userID}/>
	        <EditPageModal
	        	pageDetails={pageDetails}
	        	categories={categories}
            handlerInputsValue={handlerInputsValueToApp}
            updateEditPage={updateEditPageToApp}/>
	        <CreateUserModal 
            addNewUser={addNewUserToApp}/>
	        <EditUserModal 
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
    handlerInputsValueToApp: (value, id) => {
    	dispatch(handlerInputsValueAction(value, id))
    },
		handlerFilterToApp: (categorie) => dispatch(handlerFilterAction(categorie)),
    statusLogInToApp: (status) => dispatch(statusLogInAction(status)),
    getAllUsersToApp: () => dispatch(getAllUsersAction()),
    getAllPagesToApp: () => dispatch(getAllPagesAction()),
    getAllCategoriesToApp: () => dispatch(getAllCategoriesAction()),
    getDataByUserLoginToApp: (login) => dispatch(getDataByUserLoginAction(login)),
		getEditablePageToApp: (id) => dispatch(getEditablePageAction(id)),
    updateEditPageToApp: (obj) => dispatch(updateEditPageAction(obj)),
   	updateEditCategorieToApp: (obj) => dispatch(updateEditCategorieAction(obj)),
		addNewUserToApp: (login, pass) => dispatch(addNewUserAction(login, pass)),
		addNewPageToApp: (obj) => dispatch(addNewPageAction(obj)),
		addNewCategorieToApp: (obj) => dispatch(addNewCategorieAction(obj)),
    deletePageToApp: (idx) => dispatch(deletePageAction(idx)),
	})
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);