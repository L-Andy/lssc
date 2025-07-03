import { Client, Account, ID, Databases } from 'appwrite';

const appwriteClient = new Client();

appwriteClient
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || '')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

export const account = new Account(appwriteClient);

export interface RegisterUserData {
    email: string;
    password: string;
    phone?: string;
    name?: string;
    [key: string]: string | undefined;
}

export async function registerUser( phone: string, password: string, username: string, email: string) {
    const user = await account.create(ID.unique(), email, password, username);
    await account.updatePrefs({ phone });

    return user;
}

export async function getCurrentUserId() {
    try {
        const user = await account.get();
        return user.$id;
    } catch {
        return null;
    }
}

export function loginUser(email: string, password: string) {
    return account.createEmailPasswordSession(email, password);
}

export function logoutUser() {
    return account.deleteSession('current');
}

export async function createWallet(userId: string, initialBalance: number = 0) {
    const database = new Databases(appwriteClient);

    const collectionId = process.env.NEXT_PUBLIC_APPWRITE_WALLETS_COLLECTION_ID || '';
    return database.createDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '', collectionId, ID.unique(), { userId, balance: initialBalance });
}

export async function createTransaction(userId: string, amount: number, type: 'credit' | 'debit', description: string = '') {
    const database = new Databases(appwriteClient);

    const collectionId = process.env.NEXT_PUBLIC_APPWRITE_TRANSACTIONS_COLLECTION_ID || '';
    return database.createDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '', collectionId, ID.unique(), { userId, amount, type, description, timestamp: new Date().toISOString() });
}

export async function updateUserPassword(userId: string, newPassword: string, oldPassword: string) {
    return account.updatePassword(newPassword, oldPassword);
}

export async function createEquipment(userId: string, equipmentName: string, equipmentType: string, details: Record<string, string> = {}) {
    const database = new Databases(appwriteClient);

    const collectionId = process.env.NEXT_PUBLIC_APPWRITE_EQUIPMENT_COLLECTION_ID || '';
    return database.createDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '', collectionId, ID.unique(), { userId, name: equipmentName, type: equipmentType, ...details });
}

export async function createRenting(userId: string, productId: string, startDate: string, endDate: string, amount: number, status: string = 'active', extraDetails: Record<string, string> = {}) {
    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
    const collectionId = process.env.NEXT_PUBLIC_APPWRITE_RENTINGS_COLLECTION_ID;

    if (!databaseId) {
        throw new Error('Appwrite database ID is not set in environment variables.');
    }
    if (!collectionId) {
        throw new Error('Appwrite rentings collection ID is not set in environment variables.');
    }

    const database = new Databases(appwriteClient);

    return database.createDocument(databaseId, collectionId, ID.unique(), { userId, productId, startDate, endDate, amount, status, ...extraDetails });
}


