import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "./firebase.config";
import { v4 as uuidv4 } from "uuid";

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