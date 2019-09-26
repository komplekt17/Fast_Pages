
const initialState = {
	auth: false,
	textModal: '',
	pageDetails: {},
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
	userProfile: {userID: '', login: '', pass: '', status: ''},
	adminProfile: {allUsers: {}, allPages: {}, allCategorie: {}},
	categories: [
		{"_id":"5d636c50349128976d09806a","catName":"Banking","catClass":"banking","userId":"5d595b728883fc03fcfe0683","catBGC":"#8080c0","catColor":"#ffffff"},
		{"_id":"5d636c50349128976d09806b","catName":"Torrents","catClass":"torrents","userId":"5d595b728883fc03fcfe0683","catBGC":"#ff8080","catColor":"#000000"},
		{"_id":"5d636c50349128976d09806c","catName":"AudioBooks","catClass":"audiobooks","userId":"5d595b728883fc03fcfe0683","catBGC":"#ff8000","catColor":"#800040"},
		{"_id":"5d636c50349128976d09806d","catName":"Web Wallets","catClass":"webwallets","userId":"5d595b728883fc03fcfe0683","catBGC":"#804040","catColor":"#ffffff"},
		{"_id":"5d636c50349128976d09806e","catName":"Freelance","catClass":"freelance","userId":"5d595b728883fc03fcfe0683","catBGC":"#408080","catColor":"#ffffff"},
		{"_id":"5d636c50349128976d09806f","catName":"Web Services","catClass":"webservices","userId":"5d595b728883fc03fcfe0683","catBGC":"#80ff80","catColor":"#000000"},
		{"_id":"5d636c50349128976d098070","catName":"Programming","catClass":"programming","userId":"5d595b728883fc03fcfe0683","catBGC":"#8000ff","catColor":"#ffffff"},
		{"_id":"5d636c50349128976d098071","catName":"Trading","catClass":"trading","userId":"5d595b728883fc03fcfe0683","catBGC":"#800000","catColor":"#ffffff"},
		{"_id":"5d636c50349128976d098072","catName":"SocialNets","catClass":"socialnets","userId":"5d595b728883fc03fcfe0683","catBGC":"#0080ff","catColor":"#ffffff"},
		{"_id":"5d636ff2349128976d098075","catName":"Web Library","catClass":"weblibrary","userId":"5d595b728883fc03fcfe0683","catBGC":"#008000","catColor":"#ffffff"},
		{"_id":"5d76311ed4e520152c7a73b5","catName":"Web Cabinets","catClass":"webcabinets","userId":"5d595b728883fc03fcfe0683","catBGC":"#000080","catColor":"#c0c0c0"},
		{"_id":"5d772a8d86874d09f466ae62","catName":"Mining","catClass":"mining","userId":"5d595b728883fc03fcfe0683","catBGC":"#ffff80","catColor":"#000000"},
		{"_id":"5d78048b775332217c8d1fea","catName":"MusicServices","catClass":"musicservices","userId":"5d595b728883fc03fcfe0683","catBGC":"#ff80ff","catColor":"#000000"}
	],
	pages: [
		{"_id":"5d7366d10be7b62480c42619","name":"sberbank.ru","link":"https://online.sberbank.ru/CSAFront/index.do","ctgrId":"5d636c50349128976d09806a","ctgrClass":"Banking","userId":"5d595b728883fc03fcfe0683","screen":"http://www.skart-info.ru/myProjects/img-fast-pages/sber.jpg","ctgrBGC":"#8080c0","ctgrColor":"#ffffff","orderNum":1},
		{"_id":"5d7366fb7db6520b9408bf00","name":"raiffeisen.ru","link":"https://online.raiffeisen.ru/#/login/main","ctgrId":"5d636c50349128976d09806a","ctgrClass":"banking","ctgrColor":"#ffffff","ctgrBGC":"#008000","userId":"5d595b728883fc03fcfe0683","screen":"http://www.skart-info.ru/myProjects/img-fast-pages/riffisen.jpg","orderNum":3},
		{"_id":"5d736f9d13e7042b441db55b","name":"btc-alpha.com","link":"https://btc-alpha.com/exchange/CBC_USD/","ctgrId":"5d636c50349128976d098071","ctgrClass":"trading","userId":"5d595b728883fc03fcfe0683","screen":"http://www.skart-info.ru/myProjects/img-fast-pages/alfa-btc.jpg","ctgrBGC":"#800000","ctgrColor":"#ffffff","orderNum":11},
		{"_id":"5d73d59892a38828d806e370","name":"github.com","link":"https://github.com/komplekt17","ctgrId":"5d636c50349128976d098070","ctgrClass":"programming","ctgrColor":"#ffffff","ctgrBGC":"#8000ff","userId":"5d595b728883fc03fcfe0683","screen":"http://www.skart-info.ru/myProjects/img-fast-pages/github.jpg","orderNum":9},
		{"_id":"5d73d68d92a38828d806e371","name":"alfabank.ru","link":"https://click.alfabank.ru/","ctgrId":"5d636c50349128976d09806a","ctgrClass":"banking","ctgrColor":"#ffffff","ctgrBGC":"#008000","userId":"5d595b728883fc03fcfe0683","screen":"http://www.skart-info.ru/myProjects/img-fast-pages/alfa.jpg","orderNum":2},
		{"_id":"5d73d6f992a38828d806e372","name":"Tinkoff Bank","link":"https://www.tinkoff.ru/login/","ctgrId":"5d636c50349128976d09806a","ctgrClass":"banking","ctgrColor":"#ffffff","ctgrBGC":"#008000","userId":"5d595b728883fc03fcfe0683","screen":"http://www.skart-info.ru/myProjects/img-fast-pages/tinkoff.jpg","orderNum":5},
		{"_id":"5d73d88292a38828d806e373","name":"Renessance Credit","link":"https://ib.rencredit.ru/#/login","ctgrId":"5d636c50349128976d09806a","ctgrClass":"banking","ctgrColor":"#ffffff","ctgrBGC":"#008000","userId":"5d595b728883fc03fcfe0683","screen":"http://www.skart-info.ru/myProjects/img-fast-pages/renessance.jpg","orderNum":6},
		{"_id":"5d73da0e92a38828d806e374","name":"NNM-Club Tracker","link":"http://nnmclub.to/","ctgrId":"5d636c50349128976d09806b","ctgrClass":"torrents","ctgrColor":"#000000","ctgrBGC":"#ff8080","userId":"5d595b728883fc03fcfe0683","screen":"http://www.skart-info.ru/myProjects/img-fast-pages/nnm-club.jpg","orderNum":8},
		{"_id":"5d73da4f92a38828d806e375","name":"rutracker.org","link":"http://rutracker.org/forum/index.php","ctgrId":"5d636c50349128976d09806b","ctgrClass":"torrents","ctgrColor":"#000000","ctgrBGC":"#ff8080","userId":"5d595b728883fc03fcfe0683","screen":"http://www.skart-info.ru/myProjects/img-fast-pages/rutracker.jpg","orderNum":7},
		{"_id":"5d73ee6b92a38828d806e376","name":"Карта рассрочки","link":"https://sovest.ru/","ctgrId":"5d636c50349128976d09806a","ctgrClass":"banking","ctgrColor":"#ffffff","ctgrBGC":"#008000","userId":"5d595b728883fc03fcfe0683","screen":"http://www.skart-info.ru/myProjects/img-fast-pages/sovest.jpg","orderNum":4},
		{"_id":"5d73fb66cec57a0e0444cf82","name":"Reactjs doc","link":"https://ru.reactjs.org/docs/hooks-effect.html","ctgrId":"5d73ad0edfa55712c8449e16","ctgrClass":"reactlibs","ctgrColor":"#000000","ctgrBGC":"#00DDFF","userId":"5d595b728883fc03fcfe0683","screen":"http://www.skart-info.ru/myProjects/img-fast-pages/reactjs.jpg","orderNum":10},
		{"_id":"5d748e5633426d17dc385c3c","name":"Remote desktop","link":"https://remotedesktop.google.com/access/","ctgrId":"5d636c50349128976d09806f","ctgrClass":"services","ctgrColor":"#ffffff","ctgrBGC":"#800080","userId":"5d595b728883fc03fcfe0683","screen":"http://www.skart-info.ru/myProjects/img-fast-pages/remote-google.jpg","orderNum":12},
		{"_id":"5d74aa6733426d17dc385c3d","name":"Bootstrap-4.ru","link":"http://bootstrap-4.ru/docs/4.1/components/forms/","ctgrId":"5d636ff2349128976d098075","ctgrClass":"Web Library","ctgrColor":"#ffffff","ctgrBGC":"#008000","userId":"5d595b728883fc03fcfe0683","screen":"http://www.skart-info.ru/myProjects/img-fast-pages/bootstrap4.jpg","orderNum":15},
		{"_id":"5d74e2702edaea18b0bf0034","name":"MongoDB Atlass","link":"https://cloud.mongodb.com/user#/atlas/login","ctgrId":"5d636c50349128976d098070","ctgrClass":"Programming","ctgrColor":"#ffffff","ctgrBGC":"#8000ff","userId":"5d595b728883fc03fcfe0683","screen":"http://www.skart-info.ru/myProjects/img-fast-pages/mongodb-atlas.jpg","orderNum":13},
		{"_id":"5d753ec605a2f41044cc5b05","name":"Хостинг Картинок","link":"https://fastpic.ru","ctgrId":"5d636c50349128976d09806f","ctgrClass":"WebServices","ctgrColor":"#000000","ctgrBGC":"#80ff80","userId":"5d595b728883fc03fcfe0683","screen":"http://www.skart-info.ru/myProjects/img-fast-pages/fastpic.jpg","orderNum":14},
		{"_id":"5d7557fd0de50a1d5043b459","name":"Font Awesome","link":"https://fontawesome.com/icons?from=io","ctgrId":"5d636ff2349128976d098075","ctgrClass":"Web Library","ctgrColor":"#ffffff","ctgrBGC":"#008000","userId":"5d595b728883fc03fcfe0683","screen":"http://www.skart-info.ru/myProjects/img-fast-pages/fontawesome.jpg","orderNum":16},
		{"_id":"5d763175d4e520152c7a73b6","name":"ЭнергоСбыт","link":"http://ekb.esplus.ru/","ctgrId":"5d76311ed4e520152c7a73b5","ctgrClass":"Web Cabinets","ctgrColor":"#c0c0c0","ctgrBGC":"#000080","userId":"5d595b728883fc03fcfe0683","screen":"http://www.skart-info.ru/myProjects/img-fast-pages/energosbit.jpg","orderNum":17},
		{"_id":"5d76a02e3937f90d64fb5a46","name":"CodeSandbox","link":"https://codesandbox.io/dashboard/recent","ctgrId":"5d636c50349128976d098070","ctgrClass":"Programming","ctgrColor":"#ffffff","ctgrBGC":"#8000ff","userId":"5d595b728883fc03fcfe0683","screen":"http://www.skart-info.ru/myProjects/img-fast-pages/codesandbox.jpg","orderNum":18},
		{"_id":"5d772a2586874d09f466ae61","name":"HiveOS Monitor","link":"https://the.hiveos.farm/login","ctgrId":"5d772a8d86874d09f466ae62","ctgrClass":"Mining","ctgrColor":"#000000","ctgrBGC":"#ffff80","userId":"5d595b728883fc03fcfe0683","screen":"http://www.skart-info.ru/myProjects/img-fast-pages/hiveos.jpg","orderNum":19},
		{"_id":"5d7754f538374f2528fcb13a","name":"tradingview.com","link":"https://ru.tradingview.com/chart/qVvDYpOs/","ctgrId":"5d636c50349128976d098071","ctgrClass":"Trading","ctgrColor":"#ffffff","ctgrBGC":"#800000","userId":"5d595b728883fc03fcfe0683","screen":"http://www.skart-info.ru/myProjects/img-fast-pages/tradingview.jpg","orderNum":20},
		{"_id":"5d777aa4dfc6db2758806113","name":"Hostline","link":"https://hostline.ru/","ctgrId":"5d636c50349128976d09806f","ctgrClass":"Web Services","ctgrColor":"#000000","ctgrBGC":"#80ff80","userId":"5d595b728883fc03fcfe0683","screen":"http://www.skart-info.ru/myProjects/img-fast-pages/hostline.jpg","orderNum":21},
		{"_id":"5d77a9888a2b62278c61e173","name":"Snack Expo","link":"https://snack.expo.io/@komplekt_17/sg_rn-redux","ctgrId":"5d636c50349128976d098070","ctgrClass":"Programming","ctgrColor":"#ffffff","ctgrBGC":"#8000ff","userId":"5d595b728883fc03fcfe0683","screen":"http://www.skart-info.ru/myProjects/img-fast-pages/snakexpo.jpg","orderNum":22},
		{"_id":"5d7800c7775332217c8d1fe8","name":"Soundcloud.com","link":"https://soundcloud.com/you/sets","ctgrId":"5d78048b775332217c8d1fea","ctgrClass":"MusicServices","ctgrColor":"#000000","ctgrBGC":"#ff0000","userId":"5d595b728883fc03fcfe0683","screen":"http://www.skart-info.ru/myProjects/img-fast-pages/soundcloud.jpg","orderNum":23},
		{"_id":"5d7803dd775332217c8d1fe9","name":"music.yandex.ru","link":"https://music.yandex.ru/","ctgrId":"5d78048b775332217c8d1fea","ctgrClass":"Music Services","ctgrColor":"#000000","ctgrBGC":"#ff0000","userId":"5d595b728883fc03fcfe0683","screen":"http://www.skart-info.ru/myProjects/img-fast-pages/yandexmusic.jpg","orderNum":24},
		{"_id":"5d7807a5775332217c8d1feb","name":"NEW_nicehash.com","link":"https://www.nicehash.com/my/miner/3HYwDKvBjT5et9pUK3DjK9vcMvzJ5jtn2f/stats","ctgrId":"5d772a8d86874d09f466ae62","ctgrClass":"Mining","ctgrColor":"#000000","ctgrBGC":"#ffff80","userId":"5d595b728883fc03fcfe0683","screen":"http://www.skart-info.ru/myProjects/img-fast-pages/nicehash-II.jpg","orderNum":25},
		{"_id":"5d7a77ac59a2162284233942","name":"heroku.com","link":"https://id.heroku.com/login","ctgrId":"5d636c50349128976d098070","ctgrClass":"","ctgrColor":"","ctgrBGC":"","userId":"5d595b728883fc03fcfe0683","screen":"http://www.skart-info.ru/myProjects/img-fast-pages/heroku.jpg","orderNum":26}
	]
}

export default initialState;