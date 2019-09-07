import React from 'react';
import $ from "jquery";
import SideBarCategories from '../components/SideBarCategories';
import ListCategories from '../components/ListCategories';
import FormAddNewCategorie from '../components/FormAddNewCategorie';

import '../styles/SettingsPanel.css'

const SettingsPanel = (props) => {

	const { 
		user,
		categories,
		countPages, 
		countCats,
		handlerInputsValue,
		addNewCategorie,
		updateEditCategorie } = props;

	return(
		<div className="bg-light">
			<div className="d-flex bg-dark" id="wrapper">

				<SideBarCategories user={user}/>

		    <div id="page-content-wrapper">
		      <nav className="navbar navbar-expand-lg navbar-dark border-bottom justify-content-between">
		      	<div 
		      		onClick={()=>{
		      			$("#wrapper").toggleClass("toggled")
		      			$(".menu-switch").toggleClass("d-none")
		      		}} 
		      		id="menu-toggle">
			      		<i className="menu-switch d-none fas fa-angle-double-right"></i>
			      		<i className="menu-switch fas fa-angle-double-left"></i>
		      	</div>
		      	<div><h4>Total stats: pages - {countPages}, categories - {countCats}</h4></div>
		      </nav>

					<ListCategories 
						categories={categories}
						handlerInputsValue={handlerInputsValue}
						updateEditCategorie={updateEditCategorie} />
					<FormAddNewCategorie 
  					userID={user.userID}
						addNewCategorie={addNewCategorie}
						handlerInputsValue={handlerInputsValue} />

		    </div>
	  	</div>
		</div>
	)
}

export default SettingsPanel;