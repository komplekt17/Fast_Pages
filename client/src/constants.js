// source https://habr.com/ru/post/123845/

const SERVER_URI = 'http://localhost:5000';
const ERROR_TEXT = 'no data for render';

const FEEDBACK_EMAIL = 'Please enter a email (min 4 symbols)';
const FEEDBACK_PASS =
	'Please enter a password (min 6 symbols - lowercase/uppercase only latin letters and numbers)';
const FEEDBACK_LINK = 'Please enter a link type http://....';
const FEEDBACK_TEXT =
	'Please enter a page name (minimum 3 symbols, only digits or letters)';

const LINK_PAGE_PREVIEW =
	'https://www.skart-info.ru/myProjects/img-fast-pages/imgProcessing.gif';
const PATTERN_TEXT = /[а-яА-ЯёЁa-zA-Z0-9.]{3,}$/;
const PATTERN_LINK = /^https?:\/\/[\w/?.@&-=]+$/;
const PATTERN_EMAIL = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
const PATTERN_PASS = /(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export {
	ERROR_TEXT,
	FEEDBACK_EMAIL,
	FEEDBACK_PASS,
	FEEDBACK_LINK,
	FEEDBACK_TEXT,
	PATTERN_TEXT,
	PATTERN_LINK,
	PATTERN_EMAIL,
	PATTERN_PASS,
	SERVER_URI,
	LINK_PAGE_PREVIEW
};
