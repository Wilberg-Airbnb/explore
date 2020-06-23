var faker = require('faker');
var _ = require('lodash');
var Promise = require('bluebird');
var fs = require('fs');

var promiseWrite = Promise.promisify(fs.writeFile);

var arr = [];

Promise.resolve(arr)
  .then(data => {
    for (var i = 0; i < 100; i++) {

      var listing = {
        "listingId": i,
        "place": `${faker.address.city()}, ${faker.address.state()}`,
        "longitude": `${faker.address.longitude()}`,
        "latitude": `${faker.address.latitude()}`,
      }

      var options = ["Apartments", "Houses", "Bed and breakfasts", "Lofts", "Villas", "Condominiums"];

      var nearBy = [];

      for (var j = 0; j < 6; j++) {
        nearBy.push({"opt": faker.random.arrayElement(options)});
      }

      listing.nearBy = _.uniqBy(nearBy, "opt");
      data.push(listing);
    }

    return data;
  })
  .then(json => {
    return promiseWrite(__dirname + '/dummyData.txt', JSON.stringify(json));
  })
  .then(result => {
    console.log('all done!')
  })
  .catch(err => {
    console.log('generator failed: ', err);
  })