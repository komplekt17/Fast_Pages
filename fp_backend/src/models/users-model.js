import { Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import {
	JWT_KEY,
	SITE_NAME,
	SERVICE_HOST,
	SERVICE_USER,
	SERVICE_PASS,
} from '../constants';

const userSchema = new Schema(
	{
		login: {
			type: String,
			required: true,
			unique: true,
			minlength: 3,
			trim: true,
			lowercase: true,
			validate: (value) => {
				if (!validator.isEmail(value)) {
					throw new Error({ error: 'Invalid Email address' });
				}
			},
		},
		pass: {
			type: String,
			required: true,
			trim: true,
			minlength: 3,
		},
		status: {
			type: String,
			required: true,
		},
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

// Hash the pass before saving the user model
// Хешируем пароль перед сохранением пользовательской модели
userSchema.pre('save', async function (next) {
	const user = this;
	if (user.isModified('pass')) {
		user.pass = await bcrypt.hash(user.pass, 8);
	}
	next();
});

// Generate an auth token for the user
// Генерируем авторизационный токен для пользователя
userSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id }, JWT_KEY);
	user.tokens = user.tokens.concat({ token });
	await user.save();
	return token;
};

// отправляем новый пароль на email user'a
userSchema.statics.sendNewPassword = async (user) => {
	//console.log('string_64', user)
	let mailOptions = {
		from: SERVICE_USER,
		to: user.login,
		subject: 'Reset your account password',
		html: `<h4><b>Resetting Password on ${SITE_NAME}</b></h4>
		<p>your temporary password - ${user.pass}</p>
		<p>--${SITE_NAME} Team</p>`,
	};

	var transporter = nodemailer.createTransport({
		host: SERVICE_HOST,
		port: 465,
		secure: true, // true for 465, false for other ports
		auth: {
			user: SERVICE_USER,
			pass: SERVICE_PASS,
		},
	});

	await transporter.sendMail(mailOptions, function (error, info) {
		if (error) console.log(error);
		else console.log('Email sent: ' + info.response);
	});
};

// генератор случайного пароля
userSchema.statics.getRundomPass = () => {
	var length = 8,
		charset =
			'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
		retVal = '';
	for (var i = 0, n = charset.length; i < length; ++i) {
		retVal += charset.charAt(Math.floor(Math.random() * n));
	}
	return retVal;
};

// Search for a user by login and pass.
// Поиск пользователя по электронной почте и паролю.
userSchema.statics.findByCredentials = async (login, pass) => {
	let user = {};
	const result = await User.findOne({ login });
	if (!result) {
		user = { error: 'Invalid login credentials' };
	} else {
		user = result;
		const isPasswordMatch = await bcrypt.compare(pass, user.pass);
		if (!isPasswordMatch) {
			user = { error: 'Invalid password credentials' };
		}
	}
	return user;
};

export const User = model('User', userSchema);
