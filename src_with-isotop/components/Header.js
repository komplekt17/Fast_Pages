import React from 'react';
import $ from "jquery";

import '../styles/Header.css';

const Header = ({ auth, getNameModal, statusLogIn, user }) => {
	return(
		<nav className="navbar navbar-expand-sm navbar-expand-md navbar-expand-lg navbar-dark bg-dark">
      <button 
        className="navbar-toggler" 
        type="button" data-toggle="collapse" 
        data-target="#navbarsExample08" 
        aria-controls="navbarsExample08" 
        aria-expanded="false" aria-label="Toggle navigation">
        	<span className="navbar-toggler-icon"></span>
      </button>
      { auth ? // если user авторизован
		<div className="container">
	    <div 
	    	className="collapse navbar-collapse justify-content-md-between"
    		id="navbarsExample08">
	      <ul className="navbar-nav">
	        <li className="nav-item" onClick={()=>{console.log('Settings')}}>
	          <span className="nav-link">
	          	<i className="fas fa-cogs"></i> Settings
	          	{/*<i className="fas fa-spin fa-cog"></i>*/}
	          </span>
	        </li>
	        <li 
	        	className="nav-item" 
	        	onClick={()=>{
	        		getNameModal('Add');
	        		$("#modal-editpage").modal("show")}}>
	          <span className="nav-link">
		          <i className="fas fa-plus-square"></i> Add Page
	          </span>
	        </li>
	      </ul>
      	<ul className="navbar-nav">
      		<li className="nav-item dropdown">
	          <span 
	            className="nav-link dropdown-toggle" 
	            id="dropdown08" 
	            data-toggle="dropdown" 
	            aria-haspopup="true" 
	            aria-expanded="false">
	              {user.login}
	          </span>
	          <div className="dropdown-menu" aria-labelledby="dropdown08">
	            <span 
	            	className="dropdown-item" 
		        		onClick={()=>{
	        				getNameModal('Change password');
		        			$("#modal-adduser").modal("show")}} >
	            	Change pass
	            	</span>
	            <span 
	            	className="dropdown-item"
	            	onClick={()=>statusLogIn(auth)}>
	            	LogOut
            	</span>
	          </div>
	        </li>
	        <li className="nav-item active">
	          <span className="nav-link">
	            <span className="sr-only">(current)</span>
	          </span>
	        </li>
      	</ul>
	    </div>
  	</div>
	    	: // если user не авторизован
		<div className="container">
	    <div 
	    	className="collapse navbar-collapse justify-content-md-between"
    		id="navbarsExample08">
	      	<div className="row">
				    <div className="col">
				      <button 
				      	type="button" 
		        		onClick={()=>{
	        				getNameModal('Registration');
		        			$("#modal-adduser").modal("show")}
		        		} 
				      	className="btn btn-sm btn-danger">
				      	Registration
			      	</button>
				    </div>
	      	</div>
	       	<form id="formHeader">
					  <div className="row">
					    <div className="col">
					      <input 
					      	type="text" className="form-control-sm" 
					      	placeholder="your@mail" />
					    </div>
					    <div className="col">
					      <input 
					      	type="text" className="form-control-sm" 
					      	placeholder="password" />
					    </div>
					    <div className="col">
					      <button 
					      	className="btn btn-sm btn-outline-success"
					      	type="button" onClick={()=>statusLogIn(auth)}>
					      	LogIn
				      	</button>
					    </div>
					  </div>
					</form>
	    </div>
    </div>
	    }
	  </nav>
	);
} 

export default Header;