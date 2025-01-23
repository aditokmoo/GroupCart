import useAuthStore from "@/stores/authStore";

export default function ShoppingList() {
    const logOut = useAuthStore((state) => state.logOut);

    return (
        <div className="">
            ShoppingList

            <button onClick={logOut}>Logout</button>
        </div>
    )
}
