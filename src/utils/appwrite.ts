import { Client, Account, ID, Databases } from 'appwrite';

const APPWRITE_ENDPOINT = "https://fra.cloud.appwrite.io/v1";
const APPWRITE_PROJECT_ID = "lscc";
const APPWRITE_DATABASE_ID = "lscc";
const APPWRITE_RENTINGS_COLLECTION_ID = "rentings";
const APPWRITE_EQUIPMENT_COLLECTION_ID = "equipments";

const appwriteClient = new Client();

appwriteClient
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);

export const account = new Account(appwriteClient);

export interface RegisterUserData {
    email: string;
    password: string;
    phone?: string;
    name?: string;
    [key: string]: string | undefined;
}

// Fix for "User (role: guests) missing scope (account)"
// The error typically means the current session is not authenticated (still a guest).
// After registration, you must create a session for the new user before calling account.updatePrefs.
export async function registerUser(phone: string, password: string, username: string, email: string) {
    // 1. Create the user
    const user = await account.create(ID.unique(), email, password, username);

    // 2. Clear any existing session and log in as the new user to get a session (required for updatePrefs)
    await account.createEmailPasswordSession(email, password);

    // 3. Now update preferences as the authenticated user
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

// Uncomment and fill in the collection ID if you use wallets
// export async function createWallet(userId: string, initialBalance: number = 0) {
//     const database = new Databases(appwriteClient);
//     const collectionId = APPWRITE_WALLETS_COLLECTION_ID;
//     return database.createDocument(APPWRITE_DATABASE_ID, collectionId, ID.unique(), { userId, balance: initialBalance });
// }

// Uncomment and fill in the collection ID if you use transactions
// export async function createTransaction(userId: string, amount: number, type: 'credit' | 'debit', description: string = '') {
//     const database = new Databases(appwriteClient);
//     const collectionId = APPWRITE_TRANSACTIONS_COLLECTION_ID;
//     return database.createDocument(APPWRITE_DATABASE_ID, collectionId, ID.unique(), { userId, amount, type, description, timestamp: new Date().toISOString() });
// }

export async function updateUserPassword(userId: string, newPassword: string, oldPassword: string) {
    return account.updatePassword(newPassword, oldPassword);
}

export async function createEquipment(
    userId: string,
    equipmentName: string,
    equipmentType: string,
    details: Record<string, string> = {}
) {
    const database = new Databases(appwriteClient);
    const collectionId = APPWRITE_EQUIPMENT_COLLECTION_ID;
    return database.createDocument(
        APPWRITE_DATABASE_ID,
        collectionId,
        ID.unique(),
        { userId, name: equipmentName, type: equipmentType, ...details }
    );
}

export async function createRenting(
    userId: string,
    productId: string,
    startDate: string,
    endDate: string,
    amount: number,
    status: string = 'active',
    extraDetails: Record<string, string> = {}
) {
    const databaseId = APPWRITE_DATABASE_ID;
    const collectionId = APPWRITE_RENTINGS_COLLECTION_ID;

    if (!databaseId) {
        throw new Error('Appwrite database ID is not set.');
    }
    if (!collectionId) {
        throw new Error('Appwrite rentings collection ID is not set.');
    }

    const database = new Databases(appwriteClient);

    return database.createDocument(
        databaseId,
        collectionId,
        ID.unique(),
        { userId, productId, startDate, endDate, amount, status, ...extraDetails }
    );
}