import React from 'react';
import $ from "jquery";
import {ERROR_TEXT} from '../constants';

import '../styles/ItemPage.css';

const ItemPage = (props) => {

	const { 
		auth, 
		pages,
		getEditablePage, 
		deletePage } = props;

	let listItems = <h3>{ERROR_TEXT}</h3>;

	if(pages && pages.length !== 0){

		listItems = pages.map((item, index)=>{
			
			return (
				<div className={"px-1 mb-4 col-6 col-sm-6 col-md-3 col-lg-2 "+item.ctgrClass}
				key={index} data-category={item.ctgrId}>
	      	<div className="card">
	      		<div 
	      			style={{backgroundColor: item.ctgrBGC, color: item.ctgrColor}} 
	      			className="page-categorie px-2 d-flex justify-content-between">
		      		<div>
		      			{item.ctgrClass}
		      		</div>
		      		<div>
		      			{item.orderNum}
		      		</div>
	      		</div>
	      		{
	      			auth ?
							<i
								onClick={()=>{
									deletePage(item._id);
								}} 
								className="icon-close far fa-times-circle" 
								title="delete"></i>
							:
							<i
								onClick={()=>{
										$("#modal-adduser").modal("show")
								}} 
								className="icon-close far fa-times-circle" 
								title="delete"></i>
	      		}
						<a rel="noopener noreferrer" href={item.link} target="_blank">	
		          <img 
		          	src={item.screen}
		          	className="card-img" alt="preveiw"/>
          	</a>
	          <div className="page-body d-flex justify-content-between">
	          	{item.name}
	          	{
	          		auth ? 
	          		<i
									onClick={()=>{
										getEditablePage(item._id);
				        		$("#modal-editpage").modal("show")}}  
		          		className="icon-repair fas fa-tools" 
		          		title="edit"></i>
	          		:
	          		<i
									onClick={()=>{
										$("#modal-adduser").modal("show")}}  
		          		className="icon-repair fas fa-tools" 
		          		title="edit"></i>
	          	}
	          	
	          </div>
	      	</div>
	      </div>
			);
		});
	}

	return(
			<div className="container">
				<div className="row">
					{listItems}
				</div>
			</div>
	);
} 

export default ItemPage;