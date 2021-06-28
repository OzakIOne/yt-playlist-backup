import { writeFile } from 'fs';
import fetch from 'node-fetch';
import { promisify } from 'util';
const writeFilePromise = promisify(writeFile);

const YTPLAYLIST = process.argv[2];

const URL = `http://www.williamsportwebdeveloper.com/FavBackUp.aspx?__EVENTTARGET=&__EVENTARGUMENT=&__VIEWSTATE=%2FwEPDwUJMjA1NTc2NjUyD2QWAmYPZBYCAgEPZBYCAhMPFQEgL2phdmFzY3JpcHQvanF1ZXJ5LTEuMTAuMi5taW4uanNkZPC5DyotSQBWeHVjBo2NGJw5nGL37CDysXH2I86s0CrV&__VIEWSTATEGENERATOR=0A525D99&ctl00%24ContentPlaceHolder1%24txtPlaylist=${YTPLAYLIST}&ctl00%24ContentPlaceHolder1%24btnSubmit=Submit`;

const downloadFile = (url) => {
  console.log(`Starting backup of ${YTPLAYLIST}`);
  const now = new Date();
  const fileName = `${now.getDate()}_${now.getMonth()}_${now.getFullYear()}.xls`;
  fetch(url)
    .then((x) => x.arrayBuffer())
    .then((x) => {
      writeFilePromise(fileName, Buffer.from(x));
      console.log('Fetch ended');
      // process.stdin.setRawMode(true);
      // process.stdin.resume();
      // process.stdin.on('data', process.exit.bind(process, 0));
    });
};

downloadFile(URL);
