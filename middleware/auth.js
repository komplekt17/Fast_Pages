const jwt = require('jsonwebtoken');
const User = require('../models/users-model');

const yenv = require('yenv');
const env = yenv('env.yaml', { env: 'development' });

const auth = async (req, res, next) => {
	//const token = req.header('Authorization').replace('Bearer ', '')
	const token = req.params.token;

	const data = jwt.verify(token, env.JWT_KEY);
	try {
		const user = await User.findOne({
			_id: data._id,
			'tokens.token': token
		});
		if (!user) {
			throw new Error();
		}
		req.user = user;
		req.token = token;
		next();
	} catch (error) {
		res
			.status(401)
			.send({ error, message: 'Not authorized to access this resource' });
	}
};
module.exports = auth;
