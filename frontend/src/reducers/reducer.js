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
	userProfile: {userID: '', login: '', pass: '', newPass: '', status: ''}, 
	categories: [
		{_id:'',catName:'Banking',catClass:'banking',userId:''}, 
		{_id:'',catName: 'Torrents', catClass: 'torrents', userId:''}, 
		{_id:'',catName: 'AudioBooks', catClass: 'audiobooks', userId:''}, 
		{_id:'',catName: 'WebWallets', catClass: 'webwallets', userId:''},
		{_id:'',catName: 'Freelance', catClass: 'freelance', userId:''},
		{_id:'',catName: 'Services', catClass: 'services', userId:''},
		{_id:'',catName: 'Programming', catClass: 'programming', userId:''},
		{_id:'',catName: 'Trading', catClass: 'trading', userId:''},
		{_id:'',catName: 'SocialNets', catClass: 'socialnets', userId:''}
	],
	pages: [
		{id: 0, name: 'N-0', link: link, ctgrId: 'banking', userId: 'komp', screen: img},
		{id: 1, name: 'N-1', link: link, ctgrId: 'banking', userId: 'komp', screen: img},
		{id: 2, name: 'N-2', link: link, ctgrId: 'banking', userId: 'komp', screen: img},
		{id: 3, name: 'N-3', link: link, ctgrId: 'audiobooks', userId: 'komp', screen: img},
		{id: 4, name: 'N-4', link: link, ctgrId: 'torrents', userId: 'komp', screen: img},
		{id: 5, name: 'N-5', link: link, ctgrId: 'torrents', userId: 'komp', screen: img},
		{id: 6, name: 'N-6', link: link, ctgrId: 'webwallets', userId: 'komp', screen: img},
		{id: 7, name: 'N-7', link: link, ctgrId: 'webwallets', userId: 'komp', screen: img},
		{id: 8, name: 'N-8', link: link, ctgrId: 'freelance', userId: 'komp', screen: img},
		{id: 9, name: 'N-9', link: link, ctgrId: 'freelance', userId: 'komp', screen: img}
	]
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

// добавление в pages новой page
const addingPage = (state, obj) => {
	const arr = state.pages.slice();
	const newPage = {
		id: '',
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

// получение "нормализованного" массива pages
// с читаемым классом принадлежности к категории
const getPagesArr = (pages, categories) =>{
	for(var i=0; i <= pages.length; i++){
		for(var j=0; j <= categories.length; j++){
			for(var kk in pages[i]){
				for(var dd in categories[j]){
					if(pages[i]['ctgrId'] === categories[j]['_id']){
						pages[i]['ctgrId'] = categories[j]['catClass']
						console.log(kk, dd)
					}
				}
			}
		}
	}
	return pages;
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
				pages: getPagesArr(action.result.data.pages, action.result.data.categories),
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