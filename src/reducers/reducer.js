//const img = 'https://i-love-png.com/images/no-image-png-7.png';
const img = './images/riffisen.jpg';
const link = 'https://ya.ru/';
const initialState = {
	auth: false,
	nameModal: '', // названия header/button ModalMassages
	pageDetails: {},
	searchQwery: '', // поисковый запрос
	search: [
		{service: 'google'}, 
		{service: 'yandex'}, 
		{service: 'mailru'}, 
		{service: 'yahoo'}
	],
	userProfile: {
		login: 'email@mail.ru',
		pass: '',
		newPass: ''
	}, 
	cathegories: [ 
		{cathName: 'Banking', cathClass: 'banking', user: 'komp'}, 
		{cathName: 'Torrents', cathClass: 'torrents', user: 'komp'}, 
		{cathName: 'AudioBooks', cathClass: 'audiobooks', user: 'komp'}, 
		{cathName: 'WebWallets', cathClass: 'webwallets', user: 'komp'},
		{cathName: 'Freelance', cathClass: 'freelance', user: 'komp'},
		{cathName: 'Services', cathClass: 'services', user: 'komp'},
		{cathName: 'Programming', cathClass: 'programming', user: 'komp'},
		{cathName: 'Trading', cathClass: 'trading', user: 'komp'},
		{cathName: 'SocialNets', cathClass: 'socialnets', user: 'komp'}
	],
	pages: [
		{id: 0, name: 'N-0', link: link, type: 'banking', user: 'komp', screen: img},
		{id: 1, name: 'N-1', link: link, type: 'banking', user: 'komp', screen: img},
		{id: 2, name: 'N-2', link: link, type: 'banking', user: 'komp', screen: img},
		{id: 3, name: 'N-3', link: link, type: 'audiobooks', user: 'komp', screen: img},
		{id: 4, name: 'N-4', link: link, type: 'torrents', user: 'komp', screen: img},
		{id: 5, name: 'N-5', link: link, type: 'torrents', user: 'komp', screen: img},
		{id: 6, name: 'N-6', link: link, type: 'webwallets', user: 'komp', screen: img},
		{id: 7, name: 'N-7', link: link, type: 'webwallets', user: 'komp', screen: img},
		{id: 8, name: 'N-8', link: link, type: 'freelance', user: 'komp', screen: img},
		{id: 9, name: 'N-9', link: link, type: 'freelance', user: 'komp', screen: img}
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

const Reducer = (state = initialState, action) => {
	switch (action.type){

		case 'GET_NAME_MODAL_ACTION':
			return { 
				...state,
				nameModal: action.text
			};

		case 'HANDLER_INPUTS_VALUE_ACTION':
			if(action.id === 'search'){
				return { 
					...state,
					searchQwery: action.value
				};
			}
			else {
				return { 
					...state,
					pageDetails: saveInputValuePage(state, action.id, action.value)
				};
			};

		case 'STATUS_LOGIN_ACTION':
			return { 
				...state,
				auth: !action.status
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

		default:
			return state
	}
}

export default Reducer;