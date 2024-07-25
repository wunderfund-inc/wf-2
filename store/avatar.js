import { doc, updateDoc } from "firebase/firestore/lite";
import { db, uploadImage } from "@/plugins/firebase";

export const actions = {
  async upload(_, { userId, file }) {
    try {
      const url = await uploadImage(`avatars/${userId}/${file.name}`, file);
      const docRef = doc(db, `users/${userId}`);
      await updateDoc(docRef, { avatar: url });
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
