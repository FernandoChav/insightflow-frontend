export interface User{
    id: string;
    fullName: string;
    email: string;
    username: string;
    status: 'active' | 'inactive';
    birthDate: string;
    address: string;
    phoneNumber: string;
}