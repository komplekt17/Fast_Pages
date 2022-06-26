import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { google } from 'googleapis';
import webshot from 'node-webshot';

import { Page } from '../models';

export const getScreenShot = (req, res) => {
	// If modifying these scopes, delete token.json.
	const SCOPES = ['https://www.googleapis.com/auth/drive'];

	// The file token.json stores the user's access and refresh tokens, and is
	// created automatically when the authorization flow completes for the first
	// time.
	const TOKEN_PATH = path.join('src', 'utilities', 'token.json');

	// https://www.npmjs.com/package/node-webshot
	const options = {
		windowSize: { width: 1024, height: 768 },
		shotSize: { width: 'window', height: 'window' },
		quality: 30,
	};

	// how to save file in docker container from nodejs
	// https://stackoverflow.com/questions/59208354/how-to-save-uploaded-files-outside-node-js-docker-container-i-e-inside-linux-h
	webshot(
		req.body.linkPage,
		path.join('src', 'utilities', `${req.body.namePage}.jpg`),
		options,
		(err) => {
			if (err) console.log(err);
			else {
				console.log(`Screenshot done!`);
				const CREDENTIALS_PATH = path.join(
					'src',
					'utilities',
					'credentials.json'
				);
				// Load client secrets from a local file.
				fs.readFile(CREDENTIALS_PATH, (err, content) => {
					if (err) {
						console.log('Error loading client secret file:', err);
					}
					// Authorize a client with credentials, then call the Google Drive API.
					else {
						authorize(JSON.parse(content), uploadImage);
						console.log(`Image ${req.body.namePage}.jpg uploaded`);
					}
				});
			}
		}
	);

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
			redirect_uris,
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
			scope: SCOPES,
		});
		console.log('Authorize this app by visiting this url:', authUrl);
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});
		rl.question('Enter the code from that page here: ', (code) => {
			rl.close();
			oAuth2Client.getToken(code, (err, token) => {
				if (err)
					return console.error('Error retrieving access token', err);
				oAuth2Client.setCredentials(token);
				// Store the token to disk for later program executions
				fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
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
	// https://stackoverflow.com/questions/10311092/displaying-files-e-g-images-stored-in-google-drive-on-a-website
	// https://developers.google.com/drive/api/v3/folder

	const uploadImage = (auth) => {
		const drive = google.drive('v3');

		const folderID = '1InuTI56CE3s3RCyEtX0QaYptPKTFwwXp'; // id img-fast-pages

		const fileMetaData = {
			name: `${req.body.userId}__${req.body.namePage}.jpg`,
			parents: [folderID], // parentFolder
		};

		const media = {
			mimeType: 'image/png',
			body: fs.createReadStream(
				path.join('src', 'utilities', `${req.body.namePage}.jpg`)
			),
			// body: fs.createReadStream(`${req.body.namePage}.jpg`),
		};

		drive.files.create(
			{
				auth: auth,
				resource: fileMetaData,
				media: media,
				fields: 'id',
			},
			(err, response) => {
				if (err) console.log(err);
				else {
					// https://docs.google.com/uc?id=1nfPWpdvU5xCl8H1dlLxA7pCGb6fQuoV_
					// https://stackoverflow.com/questions/10311092/displaying-files-e-g-images-stored-in-google-drive-on-a-website
					console.log(`file id: ${response.data.id}`);

					// removing image file
					const FILE_PATH = path.join(
						'src',
						'utilities',
						`${req.body.namePage}.jpg`
					);
					fs.unlink(FILE_PATH, (err) => {
						if (err) console.error(err);
						else console.log(`Image ${req.body.namePage}.jpg removed`);
					});

					const newPage = new Page({
						name: req.body.namePage,
						link: req.body.linkPage,
						ctgrId: req.body.ctgrIdPage,
						ctgrClass: req.body.ctgrClass,
						ctgrColor: req.body.ctgrColor,
						ctgrBGC: req.body.ctgrBGC,
						userId: req.body.userId,
						screen: `https://docs.google.com/uc?id=${response.data.id}`,
						orderNum: req.body.orderNum,
					});

					newPage
						.save()
						.then(() => {
							return res.status(200).json({
								success: true,
								data: newPage,
								message: 'New Page was created successful!',
							});
						})
						.catch((error) => {
							return res.status(400).json({
								error,
								message: 'Page not created!',
							});
						});
				}
			}
		);
	};
};
