import React from 'react';
import {ERROR_TEXT} from '../constants';
import '../styles/SearchPanel.css';

const SearchPanel = ({search}) => {

	let searchList = ERROR_TEXT;
  	if(search.length !== 0){
	    searchList = search.map((item, index)=>{
	      	return(
		        <option 
		        	key={index}
		        	className={item.service}
		        	value={item.service}>{item.service}</option>
	      	)
	    });
  	}

	return(
		<div className="album py-5 bg-light">
			<div className="container">
			<div className="row">
				<div className="col-12 col-lg-8 offset-lg-2 input-group">
					<div className="input-group-prepend">
					    <select 
					    	id="selectSearch" 
					    	className="google form-control">
					        {searchList}
				      	</select>
		  			</div>
	  				<input 
	  					type="text" 
	  					className="form-control" 
	  					placeholder="Enter search qwery" 
	  					aria-describedby="basic-addon2"/>
				  	<div className="input-group-append">
					    <button 
					    	className="btn btn-secondary" 
					    	type="button" id="basic-addon2">
					    	Search
				    	</button>
				  	</div>
				</div>
			</div>	
			</div>
		</div>
	);
} 

export default SearchPanel;