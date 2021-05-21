const axios = require('axios');
const config = require('~root/server/config');

async function delay(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

async function saveGeo(model) {
  try {
    const data = await model.findOne({ geoCoded: false });
    if (!data) {
      return true;
    }
    const rs = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: `${data.city}${data.district}${data.address}`,
        key: config.API_KEY,
      },
    });
    if (rs.data.status !== 'OK') {
      console.log(data.NO, rs.data.status);
      data.geoCoded = true;
      data.geoCodeStatus = rs.data.status;
      await data.save();
    }
    if (rs.data.status === 'OK') {
      // console.log(rs.data.status);
      data.location = rs.data.results[0].geometry.location;
      data.location_type = rs.data.results[0].geometry.location_type;
      data.formatted_address = rs.data.results[0].formatted_address;
      data.geoCodeStatus = rs.data.status;
      data.geoCoded = true;
      await data.save();
    }
    return false;
  } catch (e) {
    return true;
  }
}

function saveAll(model) {
  return new Promise(async (resolve) => {
    let finished = false;
    do {
      finished = await saveGeo(model);
      await delay(500);
    } while (!finished);

    resolve();
  });
}

module.exports = { delay, saveAll };
