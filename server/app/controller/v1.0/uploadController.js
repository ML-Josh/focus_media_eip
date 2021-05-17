const xlsx = require('xlsx');
const path = require('path');
const Commercial = require('~server/app/model/commercial');

const uploadController = {
  commercial: async (req, res, next) => {
    try {
      const absolutePath = path.join(__dirname, '../../files/Commercial_EIP.xlsx');

      const wb = xlsx.readFile(absolutePath);
      const ws = wb.Sheets.分眾樓宇;

      const data = xlsx.utils.sheet_to_json(ws, { range: 4 });

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
};

module.exports = uploadController;
