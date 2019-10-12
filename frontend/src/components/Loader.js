import React from 'react';
import '../styles/Loader.css';

const Loader = () => {
	return (
		<div className="spin-loader">
			<i className="fa fa-spinner fa-spin fa-lg" />
			{/*<i className="fa fa-spin fa-atom"></i>*/}
		</div>
	);
};

export default Loader;
