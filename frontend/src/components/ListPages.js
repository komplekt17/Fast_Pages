import React from 'react';
import SearchPanel  from '../components/SearchPanel';
import ItemPage from './ItemPage';

const ListPages = (props) => {

	const { 
		auth,
		pages,
		getEditablePage, 
		deletePage, 
		search,
		searchDetails,
		handlerInputsValue,
		handlerSearchService } = props;
	
	return(
		<div className="bg-light">
  		<SearchPanel 
  			search={search}
  			searchDetails={searchDetails} 
        handlerInputsValue={handlerInputsValue}
        handlerSearchService={handlerSearchService} />
			<ItemPage
				auth={auth} 
				pages={pages}
				getEditablePage={getEditablePage}
				deletePage={deletePage} />
  	</div>
	);
} 

export default ListPages;