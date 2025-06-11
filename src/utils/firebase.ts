import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();

if (!admin.apps.length) {
  const isLocal = process.env.FUNCTIONS_EMULATOR === 'true' || !process.env.FUNCTIONS_EMULATOR;

  const credential = isLocal
    ? {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }
    : JSON.parse(process.env.FIREBASE_CONFIG ?? '{}').credential;

  admin.initializeApp({
    credential: admin.credential.cert(credential),
  });
}

export default admin;
