declare module '*.tsx';
declare module '*.ts';
declare module '*.js';

interface UserRequest {
    email: string,
    password: string
}

interface User {
    uid: string,
    profileImage: string,
    username: string,
    email: string
}

type FirestoreData = Record<string, unknown>;

interface Group {
    id: string,
    groupName: string,
    createdBy: string,
    members: string[],
    groupList: ShoppingItem[],
}

interface ShoppingItem {
    id: string,
    name: string,
    addedBy: string,
    order: number,
    price: number,
    status: 'success' | 'pending'
    timestamp: Timestamp
}

interface RegisterInputFields {
    name: 'username' | 'email' | 'password',
    type: string,
    placeholder: string
}

interface LoginInputFields {
    name: 'email' | 'password',
    type: string,
    placeholder: string
}