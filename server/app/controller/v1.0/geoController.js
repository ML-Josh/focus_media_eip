// const axios = require('axios');
const Commercial = require('~server/app/model/commercial');
const Residential = require('~server/app/model/residential');
const geoFunction = require('~server/app/function/geoFunction');

// async function delay(time) {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve, time);
//   });
// }

const geoController = {
  commercial: async (req, res, next) => {
    try {
      geoFunction.saveAll(Commercial).then(() => {
        res.json({
          msg: 'DONE',
        });
      });
    } catch (e) {
      next(e);
    }
  },

  residential: (req, res, next) => {
    geoFunction.saveAll(Residential).then(() => {
      res.json({
        msg: 'DONE',
      });
    });
  },
};

module.exports = geoController;

// commercial: async (req, res, next) => {
//   try {
//     const interval = setInterval(async () => {
//       const data = await Commercial.findOne({ geoCoded: false });
//       if (!data) {
//         clearInterval(interval);
//         res.json({
//           msg: 'Done',
//         });
//         return;
//       }
//       data.geoCoded = true;
//       await data.save();
//       const rs = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
//         params: {
//           address: `${data.address}`,
//           key: config.API_KEY,
//         },
//       });
//       console.log(rs.data);
//       if (rs.data.status !== 'OK') {
//         data.geoCoded = true;
//         data.geoCodeStatus = rs.data.status;
//         await data.save();
//       }
//       if (rs.data.status === 'OK') {
//         console.log(rs.data.status);
//         data.location = rs.data.results[0].geometry.location;
//         data.location_type = rs.data.results[0].geometry.location_type;
//         data.formatted_address = rs.data.results[0].formatted_address;
//         data.geoCodeStatus = rs.data.status;
//         data.geoCoded = true;
//         await data.save();
//       }
//     }, 100);
//   } catch (e) {
//     next(e);
//   }
// },
