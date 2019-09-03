import React from 'react';
import ItemPage from './ItemPage';
import Loader from './Loader'

const ListPages = (props) => {

	const { 
		auth, 
		loading, 
		pages, 
		getNameModal, 
		getEditablePage, 
		deletePage } = props;
	
	return(
		<div className="bg-light">
			<ItemPage
				auth={auth} 
				pages={pages} 
				getNameModal={getNameModal}
				getEditablePage={getEditablePage}
				deletePage={deletePage} />
      {loading ? <Loader /> : null}
  	</div>
	);
} 

export default ListPages;