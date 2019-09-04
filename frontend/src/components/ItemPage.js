import React from 'react';
import $ from "jquery";
import {ERROR_TEXT} from '../constants';

import '../styles/ItemPage.css';

const ItemPage = (props) => {

	const { 
		auth, 
		pages,
		getNameModal, 
		getEditablePage, 
		deletePage } = props;

	let listItems = <h3>{ERROR_TEXT}</h3>;

	if(pages && pages.length !== 0){

		listItems = pages.map((item, index)=>{
			return (
				<div className={"px-1 mb-4 col-6 col-sm-6 col-md-3 col-lg-2 "+item.ctgrId}
				key={index} data-category={item.ctgrId}>
	      	<div className="card">
	      		<div className="page-categorie px-2">{item.ctgrId}</div>
	      		{
	      			auth ?
							<i
								onClick={()=>{
			        		getNameModal('This page was removed success');
									deletePage(item.id);
									$("#modal-alert").modal("show");
								}} 
								className="icon-close far fa-times-circle" 
								title="delete"></i>
							:
							<i
								onClick={()=>{
			        			getNameModal('Registration');
										$("#modal-adduser").modal("show")
								}} 
								className="icon-close far fa-times-circle" 
								title="delete"></i>
	      		}
						<a rel="noopener noreferrer" href={item.link} target="_blank">	
		          <img 
		          	src={item.screen}
		          	className="bd-placeholder-img card-img-top" 
		          	width="100%" height="50%" alt="preveiw"/>
          	</a>
	          <div className="page-body d-flex justify-content-between">
	          	{item.name}
	          	{
	          		auth ? 
	          		<i
									onClick={()=>{
									getEditablePage(item.id);
			        		getNameModal('Edit');
			        		$("#modal-editpage").modal("show")}}  
		          		className="icon-repair fas fa-tools" 
		          		title="edit"></i>
	          		:
	          		<i
									onClick={()=>{
			        			getNameModal('Registration');
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
					{/*
							<h2>Sort</h2>
							<div id="sorts" className="button-group">  
								<button className="button" data-sort-by="original-order">base order</button>
							  <button className="button is-checked" data-sort-by="name">name</button>
							  <button className="button" data-sort-by="symbol">symbol</button>
							  <button className="button" data-sort-by="number">number</button>
							  <button className="button" data-sort-by="weight">weight</button>
							  <button className="button" data-sort-by="category">category</button>
							</div>
					*/}
			</div>
	);
} 

export default ItemPage;