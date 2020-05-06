import React from 'react';
import { SearchPanel, ItemPage, Arrow, HelloPage } from '../components';

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
		handlerSearchService,
	} = props;

	return (
		<div className="bg-light">
			<SearchPanel
				search={search}
				searchDetails={searchDetails}
				handlerInputsValue={handlerInputsValue}
				handlerSearchService={handlerSearchService}
			/>
			{auth === true ? (
				<ItemPage
					auth={auth}
					pages={pages}
					deletePage={deletePage}
					getEditablePage={getEditablePage}
					getNormalizeClass={getNormalizeClass}
				/>
			) : (
				<HelloPage />
			)}
			<Arrow />
		</div>
	);
};

export default ListPages;
