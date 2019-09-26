import $ from "jquery";
import initialState from './initialState.js'

// получение editable Page
const findEditablePage = (state, idPage) => {
 	const arr = state.pages.slice();

 	// получаем index элемента массива page с id === idPage
 	const idx = arr.findIndex(param => param._id === idPage);

 	// сохраняем найденный объект
 	const obj = arr[idx];

 	return obj;
}

// сохранение изменяемых полей input EditPageModal
const saveInputValuePage = (state, name, value) => {
	
	const obj = state.pageDetails;
	// перебираем свойства объекта и при совпадении полей 
	// присваиваем полю новое значение value
	for(var key in obj){
		if(key === name) obj[key] = value;
	}
	return obj;
}

// сохранение изменяемых полей input ListCategories
const saveInputValueCategorie = (state, nameInput, valueArr) => {
	const arr = state.categories;

	// деструктурируем массив
	const [value, idCategorie] = valueArr;

 	// получаем index элемента массива categories с id === idCategorie
 	const idx = arr.findIndex(param => param._id === idCategorie);

 	// сохраняем найденный объект
 	const obj = arr[idx];

	// перебираем свойства объекта и при совпадении полей 
	// присваиваем полю новое значение value
	for(var key in obj){
		if(key === nameInput) obj[key] = value;
	}
	//console.log(obj);
	return arr;
}

// обработчик полей SearchPanel
const handlerSearchFields = (state, name, value) => {
	const objectSearch = state.searchDetails;
	let arr, idx, link;

	// только для input selectSearch
	if(name === 'selectSearch'){
		arr = state.search.slice();

	 	// получаем index элемента массива search с .service === name
	 	idx = arr.findIndex(param => param.service === value);

	 	// получаем link сервиса поиска
	 	link = arr[idx].link;

		for(let key in objectSearch){
			if(key === 'linkSearch') objectSearch[key] = link;
			if(key === name) objectSearch[key] = value;
		}
	}
	else{	// для input 'querySearch'
		for(let key in objectSearch){
			if(key === name) objectSearch[key] = value;
		}
	}

	return objectSearch;
}

// добавление в pages новой page
const addingPage = (state, obj) => {
	const arr = state.pages.slice();

	arr.push(obj);
	return arr;
}

// удаление из pages page с id === idx
const deletingPage = (state, idx) => {
	const arr = state.pages.slice();
	//ищем заметку с id === idx
  for (let i = 0; i < arr.length; i++) {
    	if (arr[i]._id === idx) arr.splice(i, 1);// вырезаем элемент
	}
	return arr;
}

// добавление в categories новой categorie
const addingCategorie = (state, obj) => {
	const arr = state.categories.slice();

	arr.push(obj);
	return arr;
}

const Reducer = (state = initialState, action) => {
	switch (action.type){

    case 'LOAD_REQUESTED_DATA_ACTION':
    	return {
        ...state,
        loading: true,
        loaded: false
    	};

		case 'LOAD_FAILURE_DATA_ACTION':
			$("#modal-alert").modal("show");
			console.log(action.error)
			return {
				...state,
				loading: false,
				loaded: true,
				error: action.error,
				textModal: action.message
			};

		case 'STATUS_LOGIN_ACTION':
			return { 
				...state,
				auth: !state.auth,
				loading: false,
				loaded: true,
				userProfile: {}
			};

    case "GET_DATA_BY_USER_LOGIN_ACTION":
    	//console.log(action.result.data)
    	if(!action.result.data.error){
	      return {
	        ...state,
	        auth: !action.status,
					userProfile: {
						userID: action.result.data.user._id, 
						login: action.result.data.user.login, 
						pass: action.result.data.user.pass,
						//oldPass: action.oldPass,
						status: action.result.data.user.status, 
						token: action.result.data.token
					},
					pages: action.result.data.pages,
					categories: action.result.data.categories,
					loading: false,
					loaded: true,
					textModal: ''
	      };
    	}
    	else{
			$("#modal-alert").modal("show");
	      return {
	        ...state,
					loading: false,
					loaded: true,
					textModal: action.result.data.error
	      };
    	}

		case 'ADD_NEW_USER_ACTION':
			$("#modal-success").modal("show");
			return { 
				...state,
				auth: !action.status,
				userProfile: {
					userID: action.result.data.user._id, 
					login: action.result.data.user.login, 
					pass: action.result.data.user.pass,
					status: action.result.data.user.status, 
					token: action.result.data.token
				},
				pages: '',
				categories: '',
				loading: false,
				loaded: true,
				textModal: action.result.data.message
			};

		case 'UPDATE_USER_ACTION':
			// в случае успеха
    	if(!action.result.data.success) $("#modal-alert").modal("show");
			// в случае ошибки
  		else $("#modal-success").modal("show"); 
			return { 
				...state,
				loading: false,
				loaded: true,
				textModal: action.result.data.message
			};

		case 'RESET_PASSWORD_ACTION':
			// в случае успеха
    	if(!action.result.data.success) $("#modal-alert").modal("show");
			// в случае ошибки
  		else $("#modal-success").modal("show"); 
			return { 
				...state,
				loading: false,
				loaded: true,
				textModal: action.result.data.message
			};

		case 'GET_NAME_MODAL_ACTION':
			return { 
				...state,
				textModal: action.text
			};

		case 'HANDLER_INPUTS_VALUE_ACTION':
			// select выбора поискового сервиса
			if(action.nameInput === 'selectSearch'){
				return { 
					...state,
					searchDetails: handlerSearchFields(state, action.nameInput, action.value)
				};
			}

			// input поисковой панели
			else if(action.nameInput === 'querySearch'){
				return { 
					...state,
					searchDetails: handlerSearchFields(state, action.nameInput, action.value)
				};
			} 

			// inputs редактирования categories 
			else if(
				action.nameInput === 'catName' ||
				action.nameInput === 'catClass' ||
				action.nameInput === 'catColor' ||
				action.nameInput === 'catBGC'){
				return {
					...state,
					categories: saveInputValueCategorie(state, action.nameInput, action.value)
				}
			}

			// раные инпуты: редактирование page
			else {
				return { 
					...state,
					pageDetails: saveInputValuePage(state, action.nameInput, action.value)
				};
			};

		case 'HANDLER_FILTER_ACTION':
			return { 
				...state,
				filter: action.categorie
			};

    case "GET_ALL_USERS_ACTION":
      return {
        ...state,
      };

    case "GET_ALL_PAGES_ACTION":
      return {
        ...state,
      };

    case "GET_ALL_CATEGORIES_ACTION":
      return {
        ...state,
      };

		case 'GET_EDITABLE_PAGE_ACTION':
			return { 
				...state,
				pageDetails: findEditablePage(state, action.idPage)
			};

		case 'ADD_NEW_PAGE_ACTION':
			$("#modal-success").modal("show");
			return { 
				...state,
				pages: addingPage(state, action.result.data),
				loading: false,
				loaded: true,
				textModal: action.result.message
			};

		case 'UPDATE_EDIT_PAGE_ACTION':
			$("#modal-success").modal("show");
			return { 
				...state,
				pageDetails: {},
				loading: false,
				loaded: true,
				textModal: action.result.message
			};

		case 'DELETE_PAGE_ACTION':
			$("#modal-success").modal("show");
			return {
				...state,
				pages: deletingPage(state, action.result.data._id),
				loading: false,
				loaded: true,
				textModal: action.result.message
			};

		case 'ADD_NEW_CATEGORIE_ACTION':
			$("#modal-success").modal("show");
			//console.log(action.result)
			return { 
				...state,
				categories: addingCategorie(state, action.result.data),
				loading: false,
				loaded: true,
				textModal: action.result.message
			};

		case 'UPDATE_EDIT_CATEGORIE_ACTION':
			$("#modal-success").modal("show");
			return { 
				...state,
				loading: false,
				loaded: true,
				textModal: action.result.message
			};

		default:
			return state
	}
}

export default Reducer;