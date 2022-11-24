import { firebase, FieldValue } from '../lib/firebase';

export async function updateUserDocs(userId, docId) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('userId', '==', userId)
        .update({
            docs: FieldValue.arrayUnion(docId)
        });
}

export async function getDocs(userId) {
    const result = await firebase
        .firestore()
        .collection('docs')
        .where('userId', '==', userId)
        // userId here is in string which means it is checking field in firestore named userId, Note: its not using the passed on UserId
        .get();

    const docs = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));

    return docs;
}

export async function getDocumentByDocId(docId) {
    const result = await firebase
        .firestore()
        .collection('docs')
        .doc(docId)
        .get();

    return result.data();
}