import React from 'react';
import ItemPage from './ItemPage';

const ListPages = ({ auth, pages, getNameModal, getEditablePage, deletePage }) => {
	
	return(
		<div className="bg-light">
				<ItemPage
					auth={auth} 
					pages={pages} 
					getNameModal={getNameModal}
					getEditablePage={getEditablePage}
					deletePage={deletePage} />
  	</div>
	);
} 

export default ListPages;