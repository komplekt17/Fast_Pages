import React from 'react';
import $ from "jquery";
import { NavLink } from "react-router-dom";

import '../styles/Header.css';

const Header = (props) => {

	const { 
		auth, 
		user, 
		statusLogIn,
		getDataByLogin } = props;

	return(
		<nav className="navbar navbar-expand navbar-dark bg-dark sticky-top">
      { auth ? // если user авторизован
		<div className="container auth-true">
	    <div 
	    	className="collapse navbar-collapse justify-content-between">
	      <ul className="navbar-nav">
	        <li className="nav-item">
            <NavLink to="/">
              <span 
              	className="nav-link item-menu d-none" 
	      				onClick={()=>{
	      					$(".item-menu").toggleClass("d-none");
	      				}}>
              	<i className="fas fa-home"></i> Home
            	</span>
            </NavLink>
	        </li>
	        <li className="nav-item">
	        	<NavLink to="/settings/">
	          	<span 
	          		className="nav-link item-menu" 
	      				onClick={()=>$(".item-menu").toggleClass("d-none")}>
		          	<i className="fas fa-cogs"></i> Settings
	          	</span>
        		</NavLink>
	        </li>
	        <li 
	        	className="nav-item" 
	        	onClick={()=>{
	        		$("#modal-createpage").modal("show")}}>
	          <span className="nav-link">
		          <i className="fas fa-plus-square"></i> Create Page
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
		        			$("#modal-edituser").modal("show")}}>
	            		Change pass
	            	</span>
	            <NavLink to="/">
		            <span 
		            	className="dropdown-item"
		            	onClick={()=>statusLogIn(user.token)}>
		            	LogOut
	            	</span>
	            </NavLink>
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
		<div className="container auth-false">
	    <div 
	    	className="collapse navbar-collapse justify-content-between">
	      	<ul className="navbar-nav">
				    <li className="nav-item">
				      <span 
              	className="nav-link" 
		        		onClick={()=>$("#modal-adduser").modal("show")}>
		        		<i
	        			 	data-toggle="tooltip" data-placement="bottom" title="Registration" 
		        			className="fas fa-key"></i>{" "}
		        		<span className="nav-link-name">Registration</span>
			      	</span>
				    </li>
				    <li className="nav-item">
              <span 
              	className="nav-link" 
	      				onClick={()=>$("#modal-reset").modal("show")}>
		          	<i data-toggle="tooltip" data-placement="bottom" title="Forgot password" 
		          		className="fas fa-unlock-alt"></i>{" "}
		          	<span className="nav-link-name">Forgot password</span>
            	</span>
				    </li>
	      	</ul>
	       	<form id="formHeader" onSubmit={(e)=>e.preventDefault()}>
					  <div className="row">
					    <div className="col">
					      <input
					      	id="userLogin"
					      	type="text" className="form-control-sm" 
					      	placeholder="enter your@mail.ru" />
					    </div>
					    <div className="col">
					      <input
					      	id="userPass"
					      	type="password" className="form-control-sm" 
					      	placeholder="password" />
					    </div>
					    <div className="col">
					      <button 
					      	className="btn btn-sm btn-success"
					      	type="button" 
					      	onClick={()=>{
					      		let login = $('#userLogin');
					      		let pass = $('#userPass');
					      		if(login !== '' && pass !== ''){
					      			getDataByLogin({login: login.val(), pass: pass.val()});
					      			login.val('');
					      			pass.val('');
					      		}
					      	}}>
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