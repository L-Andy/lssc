'use client'

import { useParams, useRouter } from 'next/navigation';
import VipButton from '@/vip/Button';
import Image from 'next/image';
import { products } from '@/utils/data/products';
import { createRenting, getCurrentUserId } from '@/utils/appwrite';
import { useState } from 'react';

export default function JoinProductPage() {
    const params = useParams();
    const id = params?.id;
    const product = products.find(p => p.id === id);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const router = useRouter();

    const handleRent = async () => {
        setError(null);
        setSuccess(null);
        setLoading(true);
        try {
            if (!product) {
                setError('Product not found.');
                setLoading(false);
                return;
            }
            const userId = await getCurrentUserId();
            if (!userId) {
                setError('You must be logged in to rent.');
                setLoading(false);
                return;
            }
            const startDate = new Date();
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 7);

            await createRenting(userId, product.id, startDate.toISOString(), endDate.toISOString(), product.price, 'pending');
            setSuccess('Renting created successfully! Proceeding to payment...');
            router.push(`/ms/join/${product.id}/payment`);
        } catch (err: any) {
            setError(err?.message || 'Failed to create renting.');
        } finally {
            setLoading(false);
        }
    };

    if (!product) {
        return (
            <div className="flex flex-col items-center py-8 w-full">
                <div className="text-red-500 text-lg font-semibold">Product not found.</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center py-8 w-full">
            <div className="w-full flex justify-center">
                <div className="w-full max-w-[370px]">
                    <div className="relative bg-white/50 rounded-2xl border border-yellow-200 shadow-lg w-full flex flex-col items-center">
                        <div className="flex flex-col w-full h-full">
                            <div className="flex flex-row items-center justify-between w-full">
                                <div className="flex items-center px-4">
                                    <Image src={product.image} alt="Scooter" width={90} height={50} className="scale-110" />
                                </div>
                                <div className="flex flex-col items-center justify-center py-3 px-4">
                                    <span className="text-gray-700 text-sm font-medium">
                                        Single equipment daily profit: <span className="text-gray-600 font-bold">{product.profit_value}</span>
                                    </span>
                                    <div className="mt-2">
                                        <VipButton disabled={!product.rentable || loading} onClick={handleRent}>
                                            {loading ? 'Processing...' : product.rentable ? 'Rent' : 'Unable to purchase'}
                                        </VipButton>
                                    </div>
                                    {error && (
                                        <div className="text-red-500 text-xs mt-2">{error}</div>
                                    )}
                                    {success && (
                                        <div className="text-green-600 text-xs mt-2">{success}</div>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-row w-full border-t border-yellow-200">
                                <div className="flex flex-col items-center flex-1 border-r border-yellow-200 p-3">
                                    <span className="text-md font-bold text-black">{product.price}</span>
                                    <span className="text-sm text-black">Equipment Price:</span>
                                </div>
                                <div className="flex flex-col items-center flex-1 p-3">
                                    <span className="text-md font-bold text-black">{product.quantity}</span>
                                    <span className="text-sm text-black">Equipment Quantity:</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
