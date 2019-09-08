import $ from "jquery";

const img = 'http://www.skart-info.ru/myProjects/img-fast-pages/riffisen.jpg';
const link = 'https://ya.ru/';
const initialState = {
	auth: false,
	textModal: '', // названия header/button ModalMassages
	pageDetails: {},
	// поисковый запрос
	searchDetails: { 
		selectSearch:'google', 
		linkSearch:'https://www.google.com/search?q=', 
		querySearch: ''
	},
	filter: 'all',
	loading: false,
	loaded: false,
	error: null,
	search: [
		{service: 'google', link: 'https://www.google.com/search?q='}, 
		{service: 'yandex', link: 'https://www.yandex.ru/search/?text='}, 
		{service: 'mailru', link: 'https://go.mail.ru/search?q='}, 
		{service: 'yahoo', link: 'https://search.yahoo.com/search?p='}
	],
	userProfile: {userID: '', login: '', pass: '', newPass: '', status: ''},
	adminProfile: {allUsers: {}, allPages: {}, allCategorie: {}},
	categories: [
		{_id:'5d636c50349128976d09806a', catName: 'Banking', catClass:'banking', catColor: '#c0c0c0', catBGC: '#008040', userId:''}, 
		{_id:'5d636c50349128976d09806b', catName: 'Torrents', catClass: 'torrents', catColor: '#c0c0c0', catBGC: '#008040', userId:''}, 
		{_id:'5d636c50349128976d09806c', catName: 'AudioBooks', catClass: 'audiobooks', catColor: '#000000', catBGC: '#008040', userId:''}, 
		{_id:'5d636c50349128976d09806d', catName: 'WebWallets', catClass: 'webwallets', catColor: '#c0c0c0', catBGC: '#008040', userId:''},
		{_id:'5d636c50349128976d09806e', catName: 'Freelance', catClass: 'freelance', catColor: '#c0c0c0', catBGC: '#008040', userId:''},
		{_id:'5d636c50349128976d09806f', catName: 'Services', catClass: 'services', catColor: '#c0c0c0', catBGC: '#008040', userId:''},
		{_id:'5d636c50349128976d098070', catName: 'Programming', catClass: 'programming', catColor: '#c0c0c0', catBGC: '#008040', userId:''},
		{_id:'5d636c50349128976d098071', catName: 'Trading', catClass: 'trading', catColor: '#c0c0c0', catBGC: '#008040', userId:''},
		{_id:'5d636c50349128976d098072', catName: 'SocialNets', catClass: 'socialnets', catColor: '#000000', catBGC: '#008040', userId:''}
	],
	pages: [
		{_id: '5d6409f4349128976d09807c', name: 'N-0', link: link, ctgrId: '5d636c50349128976d09806a', ctgrClass: '', ctgrColor: '', ctgrBGC: '', userId: '', screen: img, orderNum: 10},
		{_id: '5d6409f4349128976d09807d', name: 'N-1', link: link, ctgrId: '5d636c50349128976d09806a', ctgrClass: '', ctgrColor: '', ctgrBGC: '', userId: '', screen: img, orderNum: 1},
		{_id: '5d6409f4349128976d09807e', name: 'N-2', link: link, ctgrId: '5d636c50349128976d09806a', ctgrClass: '', ctgrColor: '', ctgrBGC: '', userId: '', screen: img, orderNum: 2},
		{_id: '5d6409f4349128976d09807f', name: 'N-3', link: link, ctgrId: '5d636c50349128976d09806c', ctgrClass: '', ctgrColor: '', ctgrBGC: '', userId: '', screen: img, orderNum: 3},
		{_id: '5d6409f4349128976d098080', name: 'N-4', link: link, ctgrId: '5d636c50349128976d09806b', ctgrClass: '', ctgrColor: '', ctgrBGC: '', userId: '', screen: img, orderNum: 4},
		{_id: '5d6409f4349128976d098081', name: 'N-5', link: link, ctgrId: '5d636c50349128976d09806b', ctgrClass: '', ctgrColor: '', ctgrBGC: '', userId: '', screen: img, orderNum: 5},
		{_id: '5d6409f4349128976d098082', name: 'N-6', link: link, ctgrId: '5d636c50349128976d09806d', ctgrClass: '', ctgrColor: '', ctgrBGC: '', userId: '', screen: img, orderNum: 6},
		{_id: '5d6409f4349128976d098083', name: 'N-7', link: link, ctgrId: '5d636c50349128976d09806d', ctgrClass: '', ctgrColor: '', ctgrBGC: '', userId: '', screen: img, orderNum: 7},
		{_id: '5d6409f4349128976d098084', name: 'N-8', link: link, ctgrId: '5d636c50349128976d09806e', ctgrClass: '', ctgrColor: '', ctgrBGC: '', userId: '', screen: img, orderNum: 8},
		{_id: '5d6409f4349128976d098085', name: 'N-9', link: link, ctgrId: '5d636c50349128976d09806e', ctgrClass: '', userId: '', screen: img, orderNum: 9}
	]
}


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
	console.log(name, value)
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
		console.log(action.error)
			return {
				...state,
				loading: false,
				loaded: true,
				error: action.error
			};

		case 'STATUS_LOGIN_ACTION':
			return { 
				...state,
				auth: !action.status
			};

    case "GET_DATA_BY_USER_LOGIN_ACTION":
    	//console.log(action.result.data)
      return {
        ...state,
        auth: !action.status,
				userProfile: {
					userID: action.result.data.user._id, 
					login: action.result.data.user.login, 
					pass: action.result.data.user.pass, 
					newPass: '',
					status: action.result.data.user.status
				},
				pages: action.result.data.pages,
				categories: action.result.data.categories,
				loading: false,
				loaded: true,
      };

		case 'ADD_NEW_USER_ACTION':
    	//console.log(action.result)
			return { 
				...state,
				auth: !action.status,
				userProfile: {
					userID: action.result.data._id, 
					login: action.result.data.login, 
					pass: action.result.data.pass, 
					newPass: '',
					status: action.result.data.status
				},
				loading: false,
				loaded: true,
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
			//$("#modal-success").modal("show");
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