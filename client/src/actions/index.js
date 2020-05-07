import axios from 'axios';
import { SERVER_URI } from '../constants';

// получение юзера по логину
const getDataByUserLoginAction = (objUser) => {
	return (dispatch) => {
		dispatch({
			type: 'LOAD_REQUESTED_DATA_ACTION',
		});
		// const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
		// const targetUrl = 'http://www.skart-info.ru/JSONS/fastpages.json';
		// axios.get(proxyUrl+targetUrl)
		// axios.post(`${SERVER_URI}/users/login`, objUser)
		axios
			.post(`${SERVER_URI}/users/enter`, objUser)
			.then((response) => {
				//console.log(response.data)
				dispatch({
					type: 'GET_DATA_BY_USER_LOGIN_ACTION',
					result: response,
					//oldPass: objUser.pass
					// result: response
				});
			})
			.catch((error) => {
				dispatch({
					type: 'LOAD_FAILURE_DATA_ACTION',
					error: error,
					message: 'error getting data from server',
				});
				console.log(error);
			});
	};
};

// добавление нового юзера
const addNewUserAction = (objNewUser) => {
	//console.log(objNewUser);
	return (dispatch) => {
		dispatch({
			type: 'LOAD_REQUESTED_DATA_ACTION',
		});
		axios
			.post(`${SERVER_URI}/users/new`, objNewUser)
			.then((response) => {
				//console.log(response.data);
				dispatch({
					type: 'ADD_NEW_USER_ACTION',
					result: response,
				});
			})
			.catch((error) => {
				dispatch({
					type: 'LOAD_FAILURE_DATA_ACTION',
					error: error,
				});
				console.log(error);
			});
	};
};

// обработчик обновления user
const updateEditUserAction = (objUser) => {
	const id = objUser._id;
	//console.log(objUser)
	return (dispatch) => {
		dispatch({
			type: 'LOAD_REQUESTED_DATA_ACTION',
		});
		axios
			.put(`${SERVER_URI}/users/update/${id}`, objUser)
			.then((response) => {
				dispatch({
					type: 'UPDATE_USER_ACTION',
					result: response,
				});
			})
			.catch((error) => {
				console.log(error);
				dispatch({
					type: 'LOAD_FAILURE_DATA_ACTION',
					error: error,
				});
			});
	};
};

// сброс пароля
const resetPasswordAction = (objUser) => {
	return (dispatch) => {
		dispatch({
			type: 'LOAD_REQUESTED_DATA_ACTION',
		});
		axios
			.post(`${SERVER_URI}/users/reset-pass`, objUser)
			.then((response) => {
				console.log(response);
				dispatch({
					type: 'RESET_PASSWORD_ACTION',
					result: response,
				});
			})
			.catch((error) => {
				dispatch({
					type: 'LOAD_FAILURE_DATA_ACTION',
					error: error,
				});
				console.log(error);
			});
	};
};

// обработчик статуса логина (залогинен или нет User)
// выход из всех сессий (сброс токенов)
const statusLogInAction = (token) => {
	return (dispatch) => {
		dispatch({
			type: 'LOAD_REQUESTED_DATA_ACTION',
		});
		axios
			.get(`${SERVER_URI}/users/me/logoutall/${token}`)
			.then((response) => {
				//console.log(response)
				dispatch({
					type: 'STATUS_LOGIN_ACTION',
					result: response,
				});
			})
			.catch((error) => {
				dispatch({
					type: 'LOAD_FAILURE_DATA_ACTION',
					error: error,
				});
				console.log(error);
			});
	};
};

// обработчик input'ов формы
const handlerInputsValueAction = (value, nameInput) => {
	return {
		type: 'HANDLER_INPUTS_VALUE_ACTION',
		value,
		nameInput,
	};
};

// обработчик фильтра pages
const handlerFilterAction = (categorie) => {
	return {
		type: 'HANDLER_FILTER_ACTION',
		categorie,
	};
};

// получение всех юзеров с сервера
const getAllUsersAction = () => {
	return (dispatch) => {
		dispatch({
			type: 'LOAD_REQUESTED_DATA_ACTION',
		});
		axios
			.get(`${SERVER_URI}/users/`)
			.then((response) => {
				dispatch({
					type: 'GET_ALL_USERS_ACTION',
					result: response.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: 'LOAD_FAILURE_DATA_ACTION',
					error: error,
				});
				console.log(error);
			});
	};
};

// получение всех pages с сервера по ID user'а
const getAllPagesAction = () => {
	return (dispatch) => {
		dispatch({
			type: 'LOAD_REQUESTED_DATA_ACTION',
		});
		axios
			.get(`${SERVER_URI}/pages/`)
			.then((response) => {
				dispatch({
					type: 'GET_ALL_PAGES_ACTION',
					result: response.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: 'LOAD_FAILURE_DATA_ACTION',
					error: error,
				});
				console.log(error);
			});
	};
};

// получение всех categories с сервера по ID user'а
const getAllCategoriesAction = () => {
	return (dispatch) => {
		dispatch({
			type: 'LOAD_REQUESTED_DATA_ACTION',
		});
		axios
			.get(`${SERVER_URI}/categories/`)
			.then((response) => {
				dispatch({
					type: 'GET_ALL_CATEGORIES_ACTION',
					result: response.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: 'LOAD_FAILURE_DATA_ACTION',
					error: error,
				});
				console.log(error);
			});
	};
};

// обработчик текста модального окна
const getTextModalAction = (message) => {
	return {
		type: 'GET_TEXT_MODAL_ACTION',
		text: message,
	};
};

// обработчик для выборки pageDetails
const getEditablePageAction = (id) => {
	return {
		type: 'GET_EDITABLE_PAGE_ACTION',
		idPage: id,
	};
};

// обработчик добавления новой page
const addNewPageAction = (objPage) => {
	return (dispatch) => {
		dispatch({
			type: 'LOAD_REQUESTED_DATA_ACTION',
		});
		axios
			.post(`${SERVER_URI}/pages/add`, objPage)
			.then((response) => {
				dispatch({
					type: 'ADD_NEW_PAGE_ACTION',
					result: response.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: 'LOAD_FAILURE_DATA_ACTION',
					error: error,
				});
				console.log(error);
			});
	};
};

// обработчик обновления редактируемой page
const updateEditPageAction = (objPage) => {
	const id = objPage._id;
	return (dispatch) => {
		dispatch({
			type: 'LOAD_REQUESTED_DATA_ACTION',
		});
		axios
			.put(`${SERVER_URI}/pages/update/${id}`, objPage)
			.then((response) => {
				dispatch({
					type: 'UPDATE_EDIT_PAGE_ACTION',
					result: response.data,
				});
			})
			.catch((error) => {
				console.log(error);
				dispatch({
					type: 'LOAD_FAILURE_DATA_ACTION',
					error: error,
				});
			});
	};
};

// обработчик обновления редактируемой page
const deletePageAction = (idx) => {
	//console.log(idx)
	return (dispatch) => {
		dispatch({
			type: 'LOAD_REQUESTED_DATA_ACTION',
		});
		axios
			.delete(`${SERVER_URI}/pages/remove/${idx}`)
			.then((response) => {
				dispatch({
					type: 'DELETE_PAGE_ACTION',
					result: response.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: 'LOAD_FAILURE_DATA_ACTION',
					error: error,
				});
				console.log(error);
			});
	};
};

// обработчик добавления новой categorie
const addNewCategorieAction = (objCategorie) => {
	return (dispatch) => {
		dispatch({
			type: 'LOAD_REQUESTED_DATA_ACTION',
		});
		axios
			.post(`${SERVER_URI}/categories/add`, objCategorie)
			.then((response) => {
				dispatch({
					type: 'ADD_NEW_CATEGORIE_ACTION',
					result: response.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: 'LOAD_FAILURE_DATA_ACTION',
					error: error,
				});
				console.log(error);
			});
	};
};

// обработчик обновления редактируемой categorie
const updateEditCategorieAction = (objCategorie) => {
	const id = objCategorie._id;
	return (dispatch) => {
		dispatch({
			type: 'LOAD_REQUESTED_DATA_ACTION',
		});
		axios
			.put(`${SERVER_URI}/categories/update/${id}`, objCategorie)
			.then((response) => {
				dispatch({
					type: 'UPDATE_EDIT_CATEGORIE_ACTION',
					result: response.data,
				});
			})
			.catch((error) => {
				console.log(error);
				dispatch({
					type: 'LOAD_FAILURE_DATA_ACTION',
					error: error,
				});
			});
	};
};

export {
	handlerInputsValueAction,
	handlerFilterAction,
	getAllUsersAction,
	getAllPagesAction,
	getAllCategoriesAction,
	getDataByUserLoginAction,
	statusLogInAction,
	resetPasswordAction,
	getTextModalAction,
	getEditablePageAction,
	updateEditUserAction,
	updateEditPageAction,
	updateEditCategorieAction,
	addNewUserAction,
	addNewPageAction,
	addNewCategorieAction,
	deletePageAction,
};
