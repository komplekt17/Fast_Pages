import React from 'react';
import '../styles/HelloPage.css';

const HelloPage = () => {
	return (
		<div className="py-5">
			<div className="container">
				<div className="row">
					<div className="hello-page">
						<h3>Welcome to Fast-Pages App</h3>
						<p>Access to Demo mode:</p>
						<ul>
							<li>Login: demo@demo.com</li>
							<li>Password: demo</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HelloPage;
