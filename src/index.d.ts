declare module '*.tsx';
declare module '*.ts';
declare module '*.js';

interface UserRequest {
    email: string,
    password: string
}
interface User extends UserRequest {
    uid: string,
}

type FirestoreData = Record<string, unknown>;

interface Group {
    groupName: string,
    members: string[],
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