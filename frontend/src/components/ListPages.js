import React from 'react';
import SearchPanel  from '../components/SearchPanel';
import ItemPage from './ItemPage';
import Arrow from "./Arrow";

const ListPages = (props) => {

	const { 
		auth,
		pages, 
		deletePage,
		getEditablePage, 
		getNormalizeClass,
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
				deletePage={deletePage}
				getEditablePage={getEditablePage}
				getNormalizeClass={getNormalizeClass} />
			<Arrow />	
  	</div>
	);
} 

export default ListPages;