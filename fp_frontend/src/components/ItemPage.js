import React from 'react';
import $ from 'jquery';
import { ERROR_TEXT, DEMO_LOGIN, DEMO_ALERT } from '../constants';

import '../styles/ItemPage.css';

const ItemPage = (props) => {
	const {
		login,
		pages,
		getTextModal,
		getEditablePage,
		getNormalizeClass,
		deletePage,
	} = props;

	let listItems = <h3>{ERROR_TEXT}</h3>;

	if (pages && pages.length !== 0) {
		listItems = pages.map((item, index) => {
			return (
				<div
					className={
						'px-1 mb-4 col-6 col-sm-4 col-md-3 col-lg-2 ' +
						getNormalizeClass(item.ctgrClass)
					}
					key={index}
					data-category={item.ctgrId}
				>
					<div className="card">
						<div
							style={{
								backgroundColor: item.ctgrBGC,
								color: item.ctgrColor,
							}}
							className="page-categorie px-2 d-flex justify-content-between"
						>
							<div>{item.ctgrClass}</div>
							<div>{item.orderNum}</div>
						</div>
						{login === DEMO_LOGIN ? (
							<i
								className="icon-close far fa-times-circle"
								title="delete"
								onClick={() => {
									getTextModal(DEMO_ALERT);
									$('#modal-alert').modal('show');
								}}
							></i>
						) : (
							<i
								className="icon-close far fa-times-circle"
								title="delete"
								onClick={() => {
									deletePage(item._id);
								}}
							></i>
						)}
						<a rel="noopener noreferrer" href={item.link} target="_blank">
							<img src={item.screen} className="card-img" alt="preveiw" />
						</a>
						<div className="page-body d-flex justify-content-between">
							{item.name}
							<i
								className="icon-repair fas fa-tools"
								title="edit"
								onClick={() => {
									getEditablePage(item._id);
									$('#modal-editpage').modal('show');
								}}
							></i>
						</div>
					</div>
				</div>
			);
		});
	}

	return (
		<div className="container">
			<div className="row">{listItems}</div>
		</div>
	);
};

export default ItemPage;
