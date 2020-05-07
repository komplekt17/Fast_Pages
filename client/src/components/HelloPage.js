import React from 'react';
import '../styles/HelloPage.css';
import { DEMO_LOGIN, DEMO_PASS } from '../constants';

const HelloPage = () => {
	return (
		<div className="py-5">
			<div className="container">
				<div className="row">
					<div className="hello-page">
						<h3>Welcome to Fast-Pages App</h3>
						<p>Access to Demo mode:</p>
						<ul>
							<li>Login: {DEMO_LOGIN}</li>
							<li>Password: {DEMO_PASS}</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HelloPage;
