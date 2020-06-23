const fs = require('fs');
const Promise = require('bluebird');
const db = require('./index');

const readPromise = Promise.promisify(fs.readFile);
const promiseQuery = Promise.promisify(db.query).bind(db);

readPromise(__dirname + '/dummyData.txt', 'utf-8')
	.then(text => {
		return JSON.parse(text);
	})
	.then(json => {
		let listingInserts = json.map(listing => {
			let listingQuery = `INSERT INTO explore (place, longitude, latitude, listingId) VALUES ('${listing.place}', '${listing.longitude}', '${listing.latitude}', ${listing.listingId})`;

			return promiseQuery(listingQuery)
				.then(results => {
					console.log('explore query success! ', results);

					let optInserts = listing.nearBy.map(opt => {
						let optQuery = `INSERT INTO options (opt, explore_id) VALUES ('${opt.opt}', (SELECT id FROM explore WHERE listingId = ${listing.listingId}))`;
						return promiseQuery(optQuery)
					})

					return Promise.all(optInserts);
				})
				.catch(err => {
					console.log('listingQuery chain failed: ', err);
				})
		})

		return Promise.all(listingInserts);
	})
	.catch(err => {
		console.log('read promise chain failed: ', err)
	})