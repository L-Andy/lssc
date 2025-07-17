import { Client, Account, ID, Databases, Query } from 'appwrite';

const APPWRITE_ENDPOINT = "https://fra.cloud.appwrite.io/v1";
const APPWRITE_PROJECT_ID = "lscc";
const APPWRITE_DATABASE_ID = "lscc";
const APPWRITE_RENTINGS_COLLECTION_ID = "rentings";
const APPWRITE_EQUIPMENT_COLLECTION_ID = "equipments";

const appwriteClient = new Client();
const database = new Databases(appwriteClient);

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

export async function registerUser(phone: string, password: string, username: string, email: string) {
    const user = await account.create(ID.unique(), email, password, username);

    await account.createEmailPasswordSession(email, password);

    await account.updatePrefs({ phone, registrationDate: new Date().toISOString() });
    try {
        const sessions = await account.listSessions();
        for (const session of sessions.sessions) {
            await account.deleteSession(session.$id);
        }
    } catch (err) {
        // Optionally handle error, but ignore if listing/deleting sessions fails
    }
}

export async function getCurrentUserId() {
    try {
        const user = await account.get();
        return user.$id;
    } catch {
        return null;
    }
}

export async function getCurrentUser() {
    try {
        return await account.get()
    } catch {
        return null
    }
}

export function loginUser(email: string, password: string) {
    return account.createEmailPasswordSession(email, password);
}

export function logoutUser() {
    return account.deleteSession('current');
}

export async function updateUserPassword(userId: string, newPassword: string, oldPassword: string) {
    return account.updatePassword(newPassword, oldPassword);
}

export async function createEquipment(userId: string, equipmentName: string, equipmentType: string, details: Record<string, string> = {}) {
    const collectionId = APPWRITE_EQUIPMENT_COLLECTION_ID;
    return database.createDocument(
        APPWRITE_DATABASE_ID,
        collectionId,
        ID.unique(),
        { userId, name: equipmentName, type: equipmentType, ...details }
    );
}

export async function createRenting(userId: string, productId: string, startDate: string, endDate: string, amount: number, status: string = 'active', extraDetails: Record<string, string> = {}) {
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

export async function getUserRentings(userId: string) {
    const response = await database.listDocuments(
        APPWRITE_DATABASE_ID,
        APPWRITE_RENTINGS_COLLECTION_ID,
        [
            Query.equal('userId', userId)
        ]
    );

    return response.documents;
}
