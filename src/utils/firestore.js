import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { auth, firestore } from "../firebase";

export const fetchData = async () => {
    if (!auth.currentUser?.uid) {
      console.warn("error loading auth")
      setTimeout(() => {
        fetchData()
      }, 2000)
      return
    }
    const userDocRef = doc(collection(firestore, "users"), auth.currentUser.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const letterboxQuery = query(collection(firestore, "letterbox"), where("members", "array-contains", userDocRef));
      const letterboxQuerySnapshot = await getDocs(letterboxQuery);

      const messages = [];

      for (const doc of letterboxQuerySnapshot.docs) {
        const letterboxData = doc.data();
        const lettersCollectionRef = collection(doc.ref, "letters");
        const lettersQuerySnapshot = await getDocs(
          query(lettersCollectionRef,
            where("status", "==", 'sent'),
            where("deleted_at", "==", null),
            orderBy("created_at", "desc"),
            limit(10)
          )
        )
        if(!lettersQuerySnapshot.empty){
          const queryDocumentSnapshots = lettersQuerySnapshot.docs
          const latestMessage = queryDocumentSnapshots[0].data()
          messages.push({
            letterboxId: doc.id,
            collectionId: queryDocumentSnapshots[0].id,
            // filter rather than find - to allow group chats
            receiver: letterboxData.members.filter(memberRef => memberRef.id !== auth.currentUser.uid).id,
            content: latestMessage.letter,
            deleted: latestMessage.deleted_at,
            moderation: latestMessage.moderation
          });
        }
        const pendingLettersQuerySnapshot = await getDocs(
          query(lettersCollectionRef,
            where("status", "==", 'pending_review'),
            where("deleted_at", "==", null),
            where("sent_by", "==", userDocRef),
            orderBy("created_at", "desc"),
            limit(10)
          )
        )
      }
      return messages;
    //   setConnectedChatsObjects(messages);
    }
};