
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// 아래 데이터는 본인의 Firebase 프로젝트 설정에서 확인할 수 있습니다.
const firebaseConfig = {
  apiKey: 'AIzaSyBTmH7XsYlUMgNCWN93RE7PAHIeiVDTAgI',
  authDomain: 'rn-words-task.firebaseapp.com',
  projectId: 'rn-words-task',
  storageBucket: 'rn-words-task.appspot.com',
  messagingSenderId: '708302215122',
  appId: '1:708302215122:web:183931d711d2410c65da0b',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);

// 작업 파일에서
// import { dbService }
// 해야합니다
