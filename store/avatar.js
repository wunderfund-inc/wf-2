import { db, uploadImage } from "@/plugins/firebase";

export const actions = {
  async upload(context, { userId, file }) {
    try {
      const url = await uploadImage(`avatars/${userId}/${file.name}`, file);
      await db
        .collection("users")
        .doc(userId)
        .update({ avatar: url });
    } catch (error) {
      throw Error(error.message);
    }
  }
};
