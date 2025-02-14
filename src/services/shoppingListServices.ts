import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "./firebase.config";
import { v4 as uuidv4 } from "uuid";
import * as Tesseract from "tesseract.js";

export const addItemToGroup = async (groupId: string, item: ShoppingItem): Promise<void> => {
    try {
        const groupRef = doc(db, "groups", groupId);

        const newItem = {
            id: uuidv4(),
            name: item.name,
            addedBy: item.addedBy,
            price: item.price,
            status: item.status,
            timestamp: Timestamp.now(),
        };

        await updateDoc(groupRef, {
            groupList: arrayUnion(newItem),
        });

        console.log("Item uspješno dodat!");
    } catch (error) {
        console.error("Greška pri dodavanju itema:", error);
    }
};

export const recognizeImageText = async (imgSrc: string) => {
    try {
        const { data: { text } } = await Tesseract.recognize(
            imgSrc,
            "bos",
            {
                logger: m => console.log(m),
            }
        );

        return text;
    } catch (error) {
        console.error("OCR Error:", error);
        return "";
    }
}