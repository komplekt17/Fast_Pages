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
		userId: '',
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

const deletingPage = (state, idx) => {
	const arr = state.pages.slice();
	//ищем заметку с id === idx
  for (let i = 0; i < arr.length; i++) {
    	if (arr[i].id === idx) arr.splice(i, 1);// вырезаем элемент
	}
	return arr;
}

// удаление из pages page с id === idx
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

		case 'ADD_NEW_PAGE_ACTION':
		//console.log(action.obj)
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