'use client'

import { getCurrentUser } from '@/utils/appwrite';
import { products } from '@/utils/data/products';
import VipButton from '@/vip/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Join() {
    const [trial, setTrial] = useState<boolean>()
    const router = useRouter()

    useEffect(() => {
        async function fetchUser() {
            const user = await getCurrentUser();
            if (user && user.prefs && user.prefs.registrationDate) {
                const registrationDate = new Date(user.prefs.registrationDate);
                const now = new Date();
                const diffInMs = now.getTime() - registrationDate.getTime();
                const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
                setTrial(diffInDays <= 3);
            } else {
                setTrial(false);
            }
        }
        fetchUser();
    }, []);

    return (
        <div className="flex flex-col items-center pt-8 pb-24 w-full">
            <div className="w-full flex justify-center">
                <div className="w-full max-w-[370px] space-y-8">
                    {trial && <div className="flex items-center justify-center bg-yellow-100 border border-yellow-300 rounded-xl px-4 py-3 gap-3">
                        <div className="flex flex-col">
                            <span className="text-yellow-800 font-semibold text-base">3-Day Free Trial</span>
                            <span className="text-yellow-700 text-sm">You are currently enjoying a 3-day trial period!</span>
                        </div>
                    </div>}
                    {products && products.map((product) => (
                        <div key={product.id} className="relative bg-white/50 rounded-2xl border border-yellow-200 shadow-lg w-full flex flex-col items-center">
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
                                            <VipButton disabled={!product.rentable} onClick={() => { product.rentable && router.push(`/ms/join/${product.id}`) }}>
                                                {product.rentable ? 'Rent' : 'Unable to purchase'}
                                            </VipButton>
                                        </div>
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
                    ))}
                    <div className="w-full h-56 rounded-2xl overflow-hidden flex items-center justify-center bg-black">
                        <video
                            className="w-full h-full object-cover"
                            autoPlay
                            controls
                            poster="https://img.youtube.com/vi/U5vG53DnU2c/hqdefault.jpg"
                        >
                            <source src="https://fra.cloud.appwrite.io/v1/storage/buckets/lscc/files/68716bab000d07ebbd7d/view?project=lscc&mode=admin" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>
        </div>
    );
}