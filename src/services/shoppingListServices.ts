import { doc, getDoc, runTransaction, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase.config";
import { v4 as uuidv4 } from "uuid";
import * as Tesseract from "tesseract.js";

export const addItemToGroup = async (groupId: string, item: ShoppingItem): Promise<void> => {
    try {
        const groupRef = doc(db, "groups", groupId);

        await runTransaction(db, async (transaction) => {
            const groupSnap = await transaction.get(groupRef);
            if (!groupSnap.exists()) throw new Error("Grupa ne postoji");

            const groupData = groupSnap.data();
            const groupList = groupData.groupList || [];

            const maxOrder = groupList.reduce((max: number, item: { order: number }) => Math.max(max, item.order || 0), 0);

            const newItem = {
                id: uuidv4(),
                order: maxOrder + 1,
                name: item.name,
                addedBy: item.addedBy,
                price: item.price,
                status: item.status,
                timestamp: Timestamp.now(),
            };

            transaction.update(groupRef, {
                groupList: [...groupList, newItem],
            });
        });

        console.log("Item uspješno dodat");
    } catch (error) {
        console.error("Error when adding shopping item:", error);
    }
};

export const handleShopItemStatus = async (status: 'success' | 'pending', groupId: string, id: string): Promise<void> => {
    try {
        const docRef = doc(db, 'groups', groupId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            console.log('Document dosnt exist')
            return;
        }

        const docData = docSnap.data();

        const groupList = docData.groupList || [];

        const updatedGroupList = groupList.map((group: Group) =>
            group.id === id ? { ...group, status } : group
        );

        await updateDoc(docRef, { groupList: updatedGroupList });

    } catch (error) {
        console.log("Failed to update group status in Firestore:", error);
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