import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { initializeFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  API_KEY, 
  AUTH_DOMAIN, 
  DATABASE_URL, 
  PROJECT_ID, 
  STORAGE_BUCKET, 
  MESSAGING_SENDER_ID, 
  APP_ID 
} from '@env';

const firebaseConfig = {
  apiKey:API_KEY,
  authDomain:AUTH_DOMAIN,
  databaseURL:DATABASE_URL,
  projectId:PROJECT_ID,
  storageBucket:STORAGE_BUCKET,
  messagingSenderId:MESSAGING_SENDER_ID,
  appId:APP_ID
};

const app = initializeFirestore(firebaseConfig);
const database = getDatabase(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

export default {
  database,
  auth
}