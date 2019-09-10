// source https://habr.com/ru/post/123845/

const ERROR_TEXT = 'no data for render';
const PATTERN_TEXT = /[а-яА-ЯёЁa-zA-Z0-9.]{3,}$/;
const PATTERN_LINK = /^https?:\/\/[\w\/?.@&-=]+$/;
const PATTERN_EMAIL = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
const PATTERN_PASS = /(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export { 
	ERROR_TEXT,
	PATTERN_TEXT,
	PATTERN_LINK,
	PATTERN_EMAIL,
	PATTERN_PASS 
}