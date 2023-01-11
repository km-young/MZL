const ServiceKey =
  'x4UIN89mev0crJfU7rjTuLlk7qKR9dfPdtv7M0W0mRkecPRMIcXt6XS3geLKaSfmpZmQA5%2FwYJQR2DTLUS7TOQ%3D%3D';

// const base_date = new Intl.DateTimeFormat('kr')
//   .format(new Date())
//   .replace(/[\.\s]/g, '');

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();

const base_date =
  year +
  ('00' + month.toString()).slice(-2) +
  ('00' + day.toString()).slice(-2);

const BASE_URL =
  'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';

export const getTemp = () =>
  fetch(
    `${BASE_URL}?serviceKey=${ServiceKey}&pageNo=1&numOfRows=200&dataType=JSON&base_date=${base_date}&base_time=0500&nx=51&ny=38`,
  ).then((res) => res.json());
