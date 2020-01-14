const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

// https://www.npmjs.com/package/node-webshot
const webshot = require('node-webshot');

const getScreenShot = (sitename, nameImageFile) => {
	// If modifying these scopes, delete token.json.
	const SCOPES = ['https://www.googleapis.com/auth/drive'];

	// The file token.json stores the user's access and refresh tokens, and is
	// created automatically when the authorization flow completes for the first
	// time.
	const TOKEN_PATH = 'token.json';

	webshot(sitename, nameImageFile, err => {
		if (err) console.log(err);
		else {
			console.log(`Screenshot done!`);

			// Load client secrets from a local file.
			fs.readFile('credentials.json', (err, content) => {
				if (err) {
					console.log('Error loading client secret file:', err);
				}
				// Authorize a client with credentials, then call the Google Drive API.
				else {
					authorize(JSON.parse(content), uploadImage);
					console.log(`Image ${nameImageFile} uploaded`);
				}
			});
		}
	});

	/*
	 * Create an OAuth2 client with the given credentials, and then execute the
	 * given callback function.
	 * @param {Object} credentials The authorization client credentials.
	 * @param {function} callback The callback to call with the authorized client.
	 */
	function authorize(credentials, callback) {
		const {
			client_secret,
			client_id,
			redirect_uris
		} = credentials.installed;

		const oAuth2Client = new google.auth.OAuth2(
			client_id,
			client_secret,
			redirect_uris[0]
		);

		// Check if we have previously stored a token.
		fs.readFile(TOKEN_PATH, (err, token) => {
			if (err) return getAccessToken(oAuth2Client, callback);
			oAuth2Client.setCredentials(JSON.parse(token));
			callback(oAuth2Client);
		});
	}

	/*
	 * Get and store new token after prompting for user authorization, and then
	 * execute the given callback with the authorized OAuth2 client.
	 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
	 * @param {getEventsCallback} callback The callback for the authorized client.
	 */
	function getAccessToken(oAuth2Client, callback) {
		const authUrl = oAuth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: SCOPES
		});
		console.log('Authorize this app by visiting this url:', authUrl);
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});
		rl.question('Enter the code from that page here: ', code => {
			rl.close();
			oAuth2Client.getToken(code, (err, token) => {
				if (err)
					return console.error('Error retrieving access token', err);
				oAuth2Client.setCredentials(token);
				// Store the token to disk for later program executions
				fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
					if (err) return console.error(err);
					console.log('Token stored to', TOKEN_PATH);
				});
				callback(oAuth2Client);
			});
		});
	}

	// https://www.youtube.com/results?search_query=how+to+upload+file+to+google+drive+with+nodejs
	// NodeJS - Upload File To Google Drive Using Google Drive APIs
	// https://www.youtube.com/watch?v=wsErOwZZ_AU

	// генератор случайного пароля
	const getRundomPrefix = () => {
		var length = 8,
			charset =
				'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
			retVal = '';
		for (var i = 0, n = charset.length; i < length; ++i) {
			retVal += charset.charAt(Math.floor(Math.random() * n));
		}
		return retVal;
	};

	function uploadImage(auth) {
		const drive = google.drive('v3');

		const filesMetadata = {
			name: `${getRundomPrefix()}_${nameImageFile}`
		};

		const media = {
			mimeType: 'image/png',
			body: fs.createReadStream(nameImageFile)
		};

		drive.files.create(
			{
				auth: auth,
				resource: filesMetadata,
				media: media
			},
			err => {
				if (err) console.log(err);
				// else console.log(`File ${nameImageFile} uploaded`);
			}
		);
	}
};

module.exports = getScreenShot;
