import React from 'react';
import { Link } from "react-router-dom";

const SideBarCategories = ({ user }) => {
	return(
		<div className="bg-dark border-right" id="sidebar-wrapper">
	  	{
	  		user.status === 'admin' ?
	    <div className="bg-dark list-group list-group-flush">
	      <Link to="#" className="list-group-item list-group-item-action bg-dark">
	      	Get my Categories
	    	</Link>
	      <Link to="#" className="list-group-item list-group-item-action bg-dark">
	      	Visual settings
	    	</Link>
	      <Link to="#" className="list-group-item list-group-item-action bg-dark">
	      	Other
	    	</Link>
	      <Link to="#" className="list-group-item list-group-item-action bg-dark">
	      	Get my Users
	    	</Link>
	      <Link to="#" className="list-group-item list-group-item-action bg-dark">
	      	Get my Pages
	      	</Link>
	      <Link to="#" className="list-group-item list-group-item-action bg-dark">
	      	Get my Categories
	    	</Link>
	    </div> 
	  		: 
	    <div className="bg-dark list-group list-group-flush">
	      <Link to="#" className="list-group-item list-group-item-action bg-dark">
	      	Get my Categories
	    	</Link>
	      <Link to="#" className="list-group-item list-group-item-action bg-dark">
	      	Visual settings
	    	</Link>
	      <Link to="#" className="list-group-item list-group-item-action bg-dark">
	      	Other
	    	</Link>
	    </div>
		}
	</div>
	);
}

export default SideBarCategories;