import React from 'react';
import $ from "jquery";
import SideBarCategories from '../components/SideBarCategories';
import ListCategories from '../components/ListCategories';
import AddCategorie from '../components/AddCategorie';

import '../styles/SettingsPanel.css'

const SettingsPanel = (props) => {

	const { 
		user,
		categories,
		countPages, 
		countCats,
		handlerInputsValue,
		validateForm,
		getNormalizeClass } = props;

	return(
		<div className="bg-light">
			<div className="d-flex bg-dark toggled" id="wrapper">

				<SideBarCategories user={user}/>

		    <div id="page-content-wrapper">
		      <nav className="navbar navbar-expand-lg navbar-dark border-bottom justify-content-between">
		      	<div 
		      		onClick={()=>{
		      			$("#wrapper").toggleClass("toggled")
		      			$(".menu-switch").toggleClass("d-none")
		      		}} 
		      		id="menu-toggle">
			      		<i className="menu-switch fas fa-angle-double-right"></i>
			      		<i className="menu-switch d-none fas fa-angle-double-left"></i>
		      	</div>
		      	<div><h4>Total stats: pages - {countPages}, categories - {countCats}</h4></div>
		      </nav>

					<AddCategorie 
  					userID={user.userID}
						validateForm={validateForm}
  					getNormalizeClass={getNormalizeClass}
						handlerInputsValue={handlerInputsValue} />
					<ListCategories 
						categories={categories}
						validateForm={validateForm}
  					getNormalizeClass={getNormalizeClass}
						handlerInputsValue={handlerInputsValue} />

		    </div>
	  	</div>
		</div>
	)
}

export default SettingsPanel;