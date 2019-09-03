//const img = 'https://i-love-png.com/images/no-image-png-7.png';
const img = 'http://www.skart-info.ru/myProjects/img-fast-pages/riffisen.jpg';
const link = 'https://ya.ru/';
const initialState = {
	auth: false,
	nameModal: '', // названия header/button ModalMassages
	pageDetails: {},
	searchDetails: { // поисковый запрос
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
	userProfile: {userId: '', login: '', pass: '', newPass: '', status: ''}, 
	categories: [
		{catName: 'Banking', catClass: 'banking', userId: 'komp'}, 
		{catName: 'Torrents', catClass: 'torrents', userId: 'komp'}, 
		{catName: 'AudioBooks', catClass: 'audiobooks', userId: 'komp'}, 
		{catName: 'WebWallets', catClass: 'webwallets', userId: 'komp'},
		{catName: 'Freelance', catClass: 'freelance', userId: 'komp'},
		{catName: 'Services', catClass: 'services', userId: 'komp'},
		{catName: 'Programming', catClass: 'programming', userId: 'komp'},
		{catName: 'Trading', catClass: 'trading', userId: 'komp'},
		{catName: 'SocialNets', catClass: 'socialnets', userId: 'komp'}
	],
	pages: [
		{id: 0, name: 'N-0', link: link, type: 'banking', userId: 'komp', screen: img},
		{id: 1, name: 'N-1', link: link, type: 'banking', userId: 'komp', screen: img},
		{id: 2, name: 'N-2', link: link, type: 'banking', userId: 'komp', screen: img},
		{id: 3, name: 'N-3', link: link, type: 'audiobooks', userId: 'komp', screen: img},
		{id: 4, name: 'N-4', link: link, type: 'torrents', userId: 'komp', screen: img},
		{id: 5, name: 'N-5', link: link, type: 'torrents', userId: 'komp', screen: img},
		{id: 6, name: 'N-6', link: link, type: 'webwallets', userId: 'komp', screen: img},
		{id: 7, name: 'N-7', link: link, type: 'webwallets', userId: 'komp', screen: img},
		{id: 8, name: 'N-8', link: link, type: 'freelance', userId: 'komp', screen: img},
		{id: 9, name: 'N-9', link: link, type: 'freelance', userId: 'komp', screen: img}
	]
}

/* метод генерации случайного id
const getRandId = () => {
	return Math.random();
}*/
const getId = (state) => {
	return state.pages.length;
}

// получение editable Page
const findEditablePage = (state, idPage) => {
 	const arr = state.pages.slice();

 	// получаем index элемента массива page с id === idPage
 	const idx = arr.findIndex(param => param.id === idPage);

 	// присвамваем obj-ту значение найденного объекта
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

// обработчик полей формы авторизации пользователя
const saveAuthFields = (state, name, value) => {

	const objectUser = state.userProfile;

	// обработка input userLogin
	if(name === 'userLogin'){
		for(let key in objectUser){
			if(key === 'login') objectUser[key] = value;
		}
	}
	// обработка input passLogin
	else {
		for(let key in objectUser){
			if(key === 'pass') objectUser[key] = value;
		}
	}

	return objectUser;
}

// добавление в pages новой page
const addingPage = (state, obj) => {
	const arr = state.pages.slice();
	const newPage = {
		id: getId(state),
		//id: getRandId(),
		name: obj.name,
		link: obj.link,
		type: obj.type,
		user: state.userProfile.login,
		screen: obj.screen
	}
	arr.push(newPage);
	return arr;
}

// удаление из pages page с id === idx
const deletingPage = (state, idx) => {
	const arr = state.pages.slice();
	//ищем заметку с id === idx
  for (let i = 0; i < arr.length; i++) {
    	if (arr[i].id === idx) arr.splice(i, 1);// вырезаем элемент
	}
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

    case "GET_ALL_USERS_ACTION":
    	console.log(action.result)
      return {
        ...state,
      };

    case "GET_USER_BY_LOGIN_ACTION":
      return {
        ...state,
        auth: !action.status,
				userProfile: {
					userId: action.result.data._id, 
					login: action.result.data.login, 
					pass: action.result.data.pass, 
					newPass: '',
					status: action.result.data.status
				}
      };

		case 'ADD_NEW_USER_ACTION':
    	console.log(action.result)
			return { 
				...state,
				auth: !action.status,
				userProfile: {
					userId: action.result.data._id, 
					login: action.result.data.login, 
					pass: action.result.data.pass, 
					newPass: '',
					status: action.result.data.status
				}
			};	

		case 'GET_NAME_MODAL_ACTION':
			return { 
				...state,
				nameModal: action.text
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

			// inputs авторизации
			else if(action.nameInput === 'userLogin' || action.nameInput === 'userPass'){
				return{
					...state,
					userProfile: saveAuthFields(state, action.nameInput, action.value)
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

		case 'GET_EDITABLE_PAGE_ACTION':
			return { 
				...state,
				pageDetails: findEditablePage(state, action.idPage)
			};

		case 'UPDATE_EDIT_PAGE_ACTION':
			return { 
				...state,
				pageDetails: {},
				//pages: updatingPages(state, action.obj)
			};

		case 'ADD_NEW_PAGE_ACTION':
			return { 
				...state,
				pages: addingPage(state, action.obj)
			};

		case 'DELETE_PAGE_ACTION':
			return {
				...state,
				pages: deletingPage(state, action.idx)
			}

		default:
			return state
	}
}

export default Reducer;