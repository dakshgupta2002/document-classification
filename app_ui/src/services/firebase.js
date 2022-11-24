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
        id: item.id
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

export async function getIsAdmin(userId) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('userId', '==', userId)
        .get();

    return result?.docs[0]?.data()?.admin;
}

export async function getUnclassifiedDocs() {
    const result = await firebase
        .firestore()
        .collection('docs')
        .where('class', '==', "unknown")
        .get();

    const docs = result.docs.map((item) => ({
        ...item.data(),
        id: item.id
    }));

    return docs;
}

export async function discardDocument(docId) {
    const result = await firebase
        .firestore()
        .collection('docs')
        .doc(docId)
        .update({
            discarded: true,
        });
}

export async function updateClass(docId, className) {
    const result = await firebase
        .firestore()
        .collection('docs')
        .doc(docId)
        .update({
            class: className,
        })
}

export async function reUpdateDocument(docId) {
    const result = await firebase
        .firestore()
        .collection('docs')
        .doc(docId)
        .update({
            discarded: false,
        });
}