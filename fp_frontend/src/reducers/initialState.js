const initialState = {
	auth: false,
	textModal: '',
	pageDetails: {},
	searchDetails: {
		selectSearch: 'google',
		linkSearch: 'https://www.google.com/search?q=',
		querySearch: '',
	},
	filter: 'all',
	loading: false,
	loaded: false,
	error: null,
	search: [
		{ service: 'google', link: 'https://www.google.com/search?q=' },
		{ service: 'yandex', link: 'https://www.yandex.ru/search/?text=' },
		{ service: 'mailru', link: 'https://go.mail.ru/search?q=' },
		{ service: 'yahoo', link: 'https://search.yahoo.com/search?p=' },
	],
	userProfile: { userID: '', login: '', pass: '', status: '' },
	adminProfile: { allUsers: {}, allPages: {}, allCategorie: {} },
	categories: [],
	pages: [],
};

export default initialState;
