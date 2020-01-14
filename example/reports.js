const BTCMarkets = require('../dist/btcmarkets-node-sdk.cjs.development').default;
const fs = require('fs');
const Path = require('path');

const client = new BTCMarkets({ key: 'XXX', secret: 'XXX' });

// Create NewReport

/* (async () => {
  try {
    const response = await client.reports.createReport({
      type: 'TransactionReport',
      format: 'json',
    });
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})(); */

/* (async () => {
  try {
    const response = await client.reports.getReportById('75rtip0dqo7j8944le9ffsf3jj');
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
})(); */

//Download report file
/* (async () => {
  try {
    const response = await client.reports.getReportById('75rtip0dqo7j8944le9ffsf3jj', true);
    if (response.data) {
      download(response.data.file, response.data.format);
    }
  } catch (error) {
    console.log('error', error);
  }
})(); */

function download(buffer, fileType) {
  const path = Path.resolve(__dirname, 'report.' + fileType);
  const file = fs.createWriteStream(path);
  file.write(buffer);

  return new Promise((resolve, reject) => {
    file.on('end', () => {
      resolve();
    });

    file.on('error', err => {
      reject(err);
    });
  });
}
