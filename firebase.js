import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDCDXCLED4T_WbD3QAUhqEPJLlWwGf7qDg',
  authDomain: 'rn-word-task.firebaseapp.com',
  projectId: 'rn-word-task',
  storageBucket: 'rn-word-task.appspot.com',
  messagingSenderId: '503108080204',
  appId: '1:503108080204:web:f4d36de600c856c500dae9',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);

// 작업 파일에서
// import { dbService }
// 해야합니다
