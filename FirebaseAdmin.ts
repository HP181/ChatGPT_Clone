import admin from "firebase-admin"
import { getApps, getApp } from "firebase-admin/app"

const ServiceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string)

if(!getApps().length) {
    admin.initializeApp({
        credential : admin.credential.cert(ServiceAccount)
    })
}

const AdminDb = admin.firestore();

export default AdminDb