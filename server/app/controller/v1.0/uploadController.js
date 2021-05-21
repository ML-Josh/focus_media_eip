const xlsx = require('xlsx');
const path = require('path');
const Commercial = require('~server/app/model/commercial');
const Residential = require('~server/app/model/residential');

const uploadController = {
  // Upload Data for Commercial Building
  commercial: async (req, res, next) => {
    try {
      const absolutePath = path.join(__dirname, '../../files/Commercial_EIP.xlsx');

      const wb = xlsx.readFile(absolutePath);
      const ws = wb.Sheets.分眾樓宇;

      const data = xlsx.utils.sheet_to_json(ws, { range: { s: { c: 0, r: 4 }, e: { c: 11, r: 1980 } } });

      const formattedData = data.map((d) => ({
        ...d,
        building_name: d.大樓名稱,
        city: d.城市,
        district: d.行政區,
        address: d.地址,
        floor_count: d.樓層數,
        company_count: d.企業主數,
        people_count: d.人數預估,
        internal_count: d.梯內台數,
        external_count: d.梯外台數,
        machine_type: `${d.機型}`.split(/／|；/),
        ad_restriction: `${d.禁上廣告 || '無'}`.split(/、/),
      }));

      const newData = await Commercial.insertMany(formattedData);

      res.json({
        status: 'OK',
        data: {
          newData,
        },
      });
    } catch (e) {
      next(e);
    }
  },
  // Upload Data for Residential Building
  residential: async (req, res, next) => {
    try {
      const absolutePath = path.join(__dirname, '../../files/Residential_EIP.xlsx');

      const wb = xlsx.readFile(absolutePath);
      const ws = wb.Sheets.社區EiP;

      const data = xlsx.utils.sheet_to_json(ws, { range: { s: { c: 0, r: 6 }, e: { c: 19, r: 3585 } } });

      const formattedData = data.map((d) => ({
        ...d,
        building_name: d.大樓名稱,
        city: d.城市,
        district: d.行政區,
        community: d.里名,
        address: d.地址,
        building_count: d.棟數,
        unit_count: d.戶數,
        floor_count: `${d.樓層 || ''}`.split(/、/).map((f) => parseInt(f, 10)).filter((f) => !Number.isNaN(f)),
        resident_count: d.預估人數,
        elevator_count: d.電梯台數,
        contracted_count: d.簽約片數,
        installed_count: d.安裝片數,
        established_in: d.落成,
        price_per: d.坪價,
        smallest_size: d.最小坪數,
        largest_size: d.最大坪數,
        'unit_type_count-': d['房型數(少)'],
        'unit_type_count+': d['房型數(多)'],
        ad_restriction: `${d.大樓廣告限制 || '無'}`.split(/、/),
      }));

      const newData = await Residential.insertMany(formattedData);

      res.json({
        status: 'OK',
        data: {
          newData,
        },
      });
    } catch (e) {
      next(e);
    }
  },
};

module.exports = uploadController;
