import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as dotenv from 'dotenv';

dotenv.config();

if (!admin.apps.length) {
  const isLocal = process.env.FUNCTIONS_EMULATOR === 'true' || !process.env.FUNCTIONS_EMULATOR;

  const credential = isLocal
    ? {
        projectId: process.env.FB_PROJECT_ID,
        clientEmail: process.env.FB_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }
    : {
        projectId: functions.config().service.project_id,
        clientEmail: functions.config().service.client_email,
        privateKey: functions.config().service.private_key?.replace(/\\n/g, '\n'),
      };

  admin.initializeApp({
    credential: admin.credential.cert(credential),
  });
}

export default admin;