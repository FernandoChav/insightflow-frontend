import {useState, useEffect} from 'react';
import { getUsers,createUser,updateUser,deleteUser,getUserById } from '@/services/api/users';
import { User } from '@/types/users';

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        setLoading(true);
        try{
            const response = await getUsers();
            setUsers(response);   
        }catch(err){
            setError(err instanceof Error ? err.message : 'Unknown error');
        }finally{
            setLoading(false);
        }
    };

    const addUser = async (userData: Omit<User, 'id'>) => {
        try{
            await createUser(userData);
            await fetchUsers();
        }catch(err){
            setError(err instanceof Error ? err.message : 'Unknown error');
        }
    };

    const editUser = async (userId: string, userData: Partial<User>) => {
        try{
            await updateUser(userId, userData);
            await fetchUsers();
        }catch(err){
            setError(err instanceof Error ? err.message : 'Unknown error');
        }
    };

    const removeUser = async (userId: string) => {
        try{
            await deleteUser(userId);
            await fetchUsers();
        }catch(err){
            setError(err instanceof Error ? err.message : 'Unknown error');
        }
    };

    const getUser = async (userId: string): Promise<User | null> => {
        try{
            const response = await getUserById(userId);
            return response;
        }catch(err){
            setError(err instanceof Error ? err.message : 'Unknown error');
            return null;
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);

    return {
        users,
        loading,
        error,
        fetchUsers,
        addUser,
        editUser,
        removeUser,
        getUser
    };
};