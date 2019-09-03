import React from 'react';
import $ from "jquery";
import {ERROR_TEXT} from '../constants';
import '../styles/SearchPanel.css';

const SearchPanel = (props) => {

	const { search, searchDetails, handlerInputsValue } = props;
	const { querySearch, linkSearch } = searchDetails;

	// получение selectSearch из класса
	const getServiceName = (nameClass) => {
		const arr = nameClass.split(" ");
		//console.log(arr[0]);
		return arr[0];
	}

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
					    	onChange={(ev) => {
					    		handlerInputsValue(getServiceName(ev.target.className), ev.target.id);
					    	}}
					    	id="selectSearch"
					    	className={"google form-control"}>
					        {searchList}
			      	</select>
		  			</div>
	  				<input
	  					onChange={(ev) => handlerInputsValue(ev.target.value, ev.target.id)}
	  					value={querySearch} 
	  					type="text"
					    id="querySearch"  
	  					className="form-control" 
	  					placeholder="Enter search qwery" 
	  					aria-describedby="basic-addon2"/>
				  	<div className="input-group-append">
					    <a target="_blank" 
					    	rel="noopener noreferrer"  
					    	href={linkSearch+querySearch}>
						    <button
						    	onClick={()=>$('#querySearch').val('')}
						    	className="btn btn-secondary" 
						    	type="button" id="basic-addon2">
						    	Search
					    	</button>
				    	</a>
				  	</div>
				</div>
			</div>	
			</div>
		</div>
	);
} 

export default SearchPanel;