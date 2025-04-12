const fs = require('fs');
const https = require('https');
const path = require('path');

const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest);
      reject(err);
    });
  });
};

async function prepareSampleData() {
  const testDataDir = path.join(__dirname, '..', 'public', 'sample-documents');
  
  if (!fs.existsSync(testDataDir)) {
    fs.mkdirSync(testDataDir, { recursive: true });
  }

  const sampleDocs = [
    {
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      filename: 'sample-document.pdf'
    },
    {
      url: 'https://filesamples.com/samples/document/doc/sample1.doc',
      filename: 'sample-doc.doc'
    }
  ];

  console.log('Downloading sample documents...');
  
  for (const doc of sampleDocs) {
    const dest = path.join(testDataDir, doc.filename);
    console.log(`Downloading ${doc.filename}...`);
    try {
      await downloadFile(doc.url, dest);
      console.log(`✅ Downloaded ${doc.filename}`);
    } catch (err) {
      console.error(`❌ Failed to download ${doc.filename}:`, err);
    }
  }

  console.log('Done preparing test data!');
}

prepareSampleData().catch(console.error);
