import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImage = async ( imageFile, path= 'images' ) => {

    if (!imageFile) throw new Error("No image file provided");

    const storageRef = ref(storage, `${path}/${imageFile.name}-${Date.now()}`);

    try {

        // Upload the file
        await uploadBytes(storageRef, imageFile);

        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    }
    catch (error) {
        console.error("Error uploading image:", error.message);
        throw error;
    }
}