import React, { useEffect } from 'react';
import $ from 'jquery';
import 'bootswatch/dist/superhero/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import {
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
} from '../actions';
import {
	AlertMessage,
	CreatePageModal,
	CreateUserModal,
	EditPageModal,
	EditUserModal,
	Header,
	ListPages,
	Loader,
	NavigationPanel,
	SettingsPanel,
	SuccessMessage,
	ResetPasswordModal,
} from '../components';
import { NAME_LOCAL_STORAGE } from '../constants';

import '../styles/App.css';

const App = (props) => {
	useEffect(() => {
		// очищаем от текста поле селекта после монтирования
		$('#selectSearch').val('');
	});

	const dataLocalStorage = JSON.parse(
		localStorage.getItem(NAME_LOCAL_STORAGE)
	);

	const {
		store,
		handlerInputsValueToApp,
		handlerFilterToApp,
		// getAllUsersToApp,
		// getAllPagesToApp,
		// getAllCategoriesToApp,
		getDataByUserLoginToApp,
		statusLogInToApp,
		resetPasswordToApp,
		getTextModalToApp,
		getEditablePageToApp,
		updateEditUserToApp,
		updateEditPageToApp,
		updateEditCategorieToApp,
		addNewUserToApp,
		addNewPageToApp,
		addNewCategorieToApp,
		deletePageToApp,
	} = props;

	const {
		pageDetails,
		textModal,
		filter,
		searchDetails,
		search,
		loading,
	} = store;

	let { userProfile, auth, categories, pages } = store;

	if (dataLocalStorage !== null) {
		auth = dataLocalStorage.auth;
		userProfile = dataLocalStorage.userProfile;
		categories = dataLocalStorage.categories;
		pages = dataLocalStorage.pages;
	}

	// валидатор всей формы
	const validateForm = (obj, idForm) => {
		// счётчик количества НЕкорректно заполненных полей
		let invalidCount = 0;

		for (let key in obj) {
			if (obj[key] === null || obj[key] === '') {
				$('#' + key)
					.removeClass('is-valid')
					.addClass('is-invalid');
				invalidCount += 1;
			} else
				$('#' + key)
					.removeClass('is-invalid')
					.addClass('is-valid');
		}

		if (invalidCount === 0) {
			// для формы addPage
			if (idForm === 'addPage') {
				addNewPageToApp(obj);

				// закрываем окно
				$('#modal-createpage').modal('hide');

				// clear feilds and remove classes is-valid is-invalid
				for (let key in obj) {
					$('#' + key)
						.removeClass('is-valid is-invalid')
						.val('');
				}
			}
			// для формы editPage
			else if (idForm === 'editPage') {
				updateEditPageToApp(obj);
				$('#modal-editpage').modal('hide');
			}
			// для формы addUser
			else if (idForm === 'addUser') {
				addNewUserToApp(obj);
				$('#modal-adduser').modal('hide');

				// clear feilds and remove classes is-valid is-invalid
				for (let key in obj) {
					$('#' + key)
						.removeClass('is-valid is-invalid')
						.val('');
				}
			}
			// для формы editUser
			else if (idForm === 'editUser') {
				updateEditUserToApp(obj);
				$('#modal-edituser').modal('hide');

				// clear feilds and remove classes is-valid is-invalid
				for (let key in obj) {
					$('#' + key)
						.removeClass('is-valid is-invalid')
						.val('');
				}
			}
			// для формы resetPass
			else if (idForm === 'resetPass') {
				resetPasswordToApp(obj);
				$('#modal-reset').modal('hide');

				// clear feilds and remove classes is-valid is-invalid
				for (let key in obj) {
					$('#' + key)
						.removeClass('is-valid is-invalid')
						.val('');
				}
			}
			// для формы addCategorie
			else if (idForm === 'addCategorie') {
				addNewCategorieToApp(obj);

				// clear feilds and remove classes is-valid is-invalid
				for (let key in obj) {
					$('#' + key)
						.removeClass('is-valid is-invalid')
						.val('');
				}
			}
			// для формы editCategorie
			else if (idForm === 'editCategorie') {
				updateEditCategorieToApp(obj);

				// clear feilds and remove classes is-valid is-invalid
				for (let key in obj) {
					$('#' + key)
						.removeClass('is-valid is-invalid')
						.val('');
				}
			}
		}
	};

	// универсальный валидатор отдельного поля формы
	const isValideField = (nameId, pattern) => {
		const elem = $('#' + nameId);
		const elemValue = elem.val();

		// если pattern установлен, проверяем регулярку
		if (pattern) {
			//console.log(pattern.test(elemValue))
			const res = pattern.test(elemValue);

			if (!res) elem.removeClass('is-valid').addClass('is-invalid');
			else elem.removeClass('is-invalid').addClass('is-valid');
		}
		// если pattern не установлен, проверяем пустой ли input
		else {
			if (elemValue === '')
				elem.removeClass('is-valid').addClass('is-invalid');
			else elem.removeClass('is-invalid').addClass('is-valid');
		}
	};

	// фильтрация массива pages по значению
	// активного фильтра state.filter
	const filterNotes = (arr, filterPage) => {
		const newArr = arr.filter((item) => {
			let qqq;
			if (filterPage === getNormalizeClass(item.ctgrClass)) {
				qqq = getNormalizeClass(item.ctgrClass);
			}
			if (filterPage === 'all') qqq = arr;
			return qqq;
		});
		return newArr;
	};

	// получение "нормализованного" catClass, ctgrClass
	// обрезаем пробелы и убираем заглавные буквы
	const getNormalizeClass = (string) => {
		const normStringClass = string.replace(/\s+/g, '').toLowerCase();
		return normStringClass;
	};

	// получение "нормализованного" массива pages
	// с читаемым классом принадлежности к категории и цветовым оформлением
	// http://javascript.ru/forum/misc/78380-kak-poluchit-novyjj-massiv-posle-sravneniya-2-kh-iskhodnykh.html#post512491

	const getPagesArr = (pages, categories) => {
		return pages.map((p) => {
			var x = categories.find((c) => c._id === p.ctgrId);
			x &&
				(p.ctgrClass = x.catName) &&
				(p.ctgrColor = x.catColor) &&
				(p.ctgrBGC = x.catBGC);
			return p;
		});
	};

	// sorter pages[] & categories[]
	const getSortedArray = (arr, nameArr) => {
		// по возрастанию
		//const  kk = [...arr].sort((a, b) => (a.orderNum < b.orderNum) * 2 - 1);
		if (nameArr === 'Pages') {
			// по убыванию
			const kk = [...arr].sort(
				(a, b) => (a.orderNum > b.orderNum) * 2 - 1
			);
			return kk;
		}
		// сортировка categories
		else {
			// по убыванию
			const kk = [...arr].sort((a, b) => (a.catName > b.catName) * 2 - 1);
			return kk;
		}
	};

	const sortedPages = getSortedArray(pages, 'Pages');
	const sortedCategories = getSortedArray(categories, 'Categories');

	// определяем массив видимых pages для рендеринга
	// согласно выбранного фильтра
	let normalizePages;
	if (categories.length === 0) normalizePages = sortedPages;
	else normalizePages = getPagesArr(sortedPages, categories);

	const visibleItems = filterNotes(normalizePages, filter);

	//console.log(store);

	return (
		<Router>
			<NavigationPanel
				auth={auth}
				categories={sortedCategories}
				handlerFilter={handlerFilterToApp}
			/>
			<Header
				auth={auth}
				user={userProfile}
				getDataByLogin={getDataByUserLoginToApp}
				statusLogIn={statusLogInToApp}
			/>
			{loading ? <Loader /> : null}
			<Switch>
				<Route
					exact
					path="/settings"
					render={() => (
						<SettingsPanel
							user={userProfile}
							categories={sortedCategories}
							countPages={pages.length}
							countCats={categories.length}
							getNormalizeClass={getNormalizeClass}
							validateForm={validateForm}
							handlerInputsValue={handlerInputsValueToApp}
						/>
					)}
				/>
				<Route path="/">
					<ListPages
						auth={auth}
						login={userProfile.login}
						pages={visibleItems}
						loading={loading}
						getNormalizeClass={getNormalizeClass}
						getTextModal={getTextModalToApp}
						getEditablePage={getEditablePageToApp}
						deletePage={deletePageToApp}
						search={search}
						searchDetails={searchDetails}
						handlerInputsValue={handlerInputsValueToApp}
					/>
				</Route>
			</Switch>
			<AlertMessage textModal={textModal} />
			<SuccessMessage textModal={textModal} />
			<CreatePageModal
				countPages={pages.length}
				categories={sortedCategories}
				addNewPage={addNewPageToApp}
				userID={userProfile.userID}
				validateForm={validateForm}
				isValideField={isValideField}
				handlerInputsValue={handlerInputsValueToApp}
			/>
			<EditPageModal
				pageDetails={pageDetails}
				categories={sortedCategories}
				validateForm={validateForm}
				isValideField={isValideField}
				handlerInputsValue={handlerInputsValueToApp}
			/>
			<CreateUserModal
				validateForm={validateForm}
				isValideField={isValideField}
				handlerInputsValue={handlerInputsValueToApp}
			/>
			<EditUserModal
				user={userProfile}
				getTextModal={getTextModalToApp}
				validateForm={validateForm}
				isValideField={isValideField}
				handlerInputsValue={handlerInputsValueToApp}
			/>
			<ResetPasswordModal
				validateForm={validateForm}
				isValideField={isValideField}
				handlerInputsValue={handlerInputsValueToApp}
			/>
		</Router>
	);
};

const mapStateToProps = (state) => {
	return { store: state };
};

const mapDispatchToProps = (dispatch) => {
	return {
		handlerInputsValueToApp: (value, id) => {
			dispatch(handlerInputsValueAction(value, id));
		},
		handlerFilterToApp: (categorie) =>
			dispatch(handlerFilterAction(categorie)),
		statusLogInToApp: (token) => dispatch(statusLogInAction(token)),
		resetPasswordToApp: (obj) => dispatch(resetPasswordAction(obj)),
		getAllUsersToApp: () => dispatch(getAllUsersAction()),
		getAllPagesToApp: () => dispatch(getAllPagesAction()),
		getAllCategoriesToApp: () => dispatch(getAllCategoriesAction()),
		getDataByUserLoginToApp: (obj) =>
			dispatch(getDataByUserLoginAction(obj)),
		getTextModalToApp: (message) => dispatch(getTextModalAction(message)),
		getEditablePageToApp: (id) => dispatch(getEditablePageAction(id)),
		updateEditUserToApp: (obj) => dispatch(updateEditUserAction(obj)),
		updateEditPageToApp: (obj) => dispatch(updateEditPageAction(obj)),
		updateEditCategorieToApp: (obj) =>
			dispatch(updateEditCategorieAction(obj)),
		addNewUserToApp: (objNewUser) =>
			dispatch(addNewUserAction(objNewUser)),
		addNewPageToApp: (obj) => dispatch(addNewPageAction(obj)),
		addNewCategorieToApp: (obj) => dispatch(addNewCategorieAction(obj)),
		deletePageToApp: (idx) => dispatch(deletePageAction(idx)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
