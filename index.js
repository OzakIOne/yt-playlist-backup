import { writeFile } from 'fs';
import fetch from 'node-fetch';
import { promisify } from 'util';
import pkg from 'node-html-parser';

const { parse } = pkg;
const writeFilePromise = promisify(writeFile);

const YTPLAYLIST = process.argv[2];

const createLink = async () => {
  const rawData = await fetch(
    'http://www.williamsportwebdeveloper.com/FavBackUp.aspx',
  );
  const HTML = await rawData.text();
  const selector = await parse(HTML).querySelector('input[name="__VIEWSTATE"]');
  const VIEWSTATE = encodeURIComponent(selector._rawAttrs.value);
  return `http://www.williamsportwebdeveloper.com/FavBackUp.aspx?__EVENTTARGET=&__EVENTARGUMENT=&__VIEWSTATE=${VIEWSTATE}&__VIEWSTATEGENERATOR=0A525D99&ctl00%24ContentPlaceHolder1%24txtPlaylist=${YTPLAYLIST}&ctl00%24ContentPlaceHolder1%24btnSubmit=Submit`;
};

const downloadFile = () => {
  console.log(`Starting backup of ${YTPLAYLIST}`);
  const now = new Date();
  const fileName = `${now.getFullYear()}_${
    now.getMonth() + 1
  }_${now.getDate()}.xls`;
  createLink().then((url) => {
    fetch(url)
      .then((x) => x.arrayBuffer())
      .then((x) => writeFilePromise(fileName, Buffer.from(x)));
  });
};

downloadFile();
