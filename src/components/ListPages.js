import React from 'react';
import ItemPage from './ItemPage';

const ListPages = ({ auth, pages, getNameModal, getEditablePage }) => {
	
	return(
		<div className="bg-light">
				<ItemPage
					auth={auth} 
					pages={pages} 
					getNameModal={getNameModal}
					getEditablePage={getEditablePage}/>
  	</div>
	);
} 

export default ListPages;