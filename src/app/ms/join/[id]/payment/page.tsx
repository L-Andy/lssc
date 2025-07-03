'use client'

import { useState } from 'react';
import { coins } from '@/utils/data/coin';
import { useRouter, useParams } from 'next/navigation';

function PaymentOption({ icon, label, selected, onClick }: { icon: string; label: string; selected?: boolean; onClick?: () => void }) {
    return (
        <div
            className={`flex flex-col items-center justify-center bg-gray-300 rounded-2xl py-8 shadow cursor-pointer hover:bg-gray-200 transition border-4 ${selected ? 'border-blue-400' : 'border-transparent'}`}
            onClick={onClick}
        >
            <img src={icon} alt={label} className="w-12 h-12 mb-4" />
            <span className="text-base text-gray-700 font-extralight">{label}</span>
        </div>
    );
}

export default function PaymentPage() {
    const [selectedCoin, setSelectedCoin] = useState<string | null>(null);
    const router = useRouter();
    const params = useParams();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full">
            <div className="w-full max-w-3/4 flex flex-col items-center">
                <div className="w-full max-w-3/4 flex flex-col items-center mb-24">
                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 w-full">
                        {coins && coins.map((coin) => (
                            <PaymentOption
                                key={coin.label}
                                icon={coin.icon}
                                label={coin.label}
                                selected={selectedCoin === coin.label}
                                onClick={() => router.push(`/ms/join/${params?.id}/payment/${coin.label.toLowerCase()}`)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}