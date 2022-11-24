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
