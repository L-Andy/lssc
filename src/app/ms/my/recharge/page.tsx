'use client'

import { coins } from '@/utils/data/coin';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RechargeAmount() {
    const [selectedCoin, setSelectedCoin] = useState<string | null>(null);
    const [amount, setAmount] = useState<number>(160);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleConfirm = () => {
        setError(null);
        if (!selectedCoin) {
            setError('Please select a payment channel.');
            return;
        }
        if (!amount || amount < 1) {
            setError('Please enter a valid amount.');
            return;
        }
        // Pass the payment channel and amount to the payment channel page
        // Use encodeURIComponent in case coin label has special characters
        router.push(`/ms/my/recharge/${encodeURIComponent(selectedCoin)}?amount=${amount}`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full">
            <div className="w-full max-w-3/4 flex flex-col items-center">
                <div className="w-full max-w-3/4 flex flex-col items-center mb-24">
                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 w-full">
                        {coins && coins.map((coin) => (
                            <RechargeOption
                                key={coin.label}
                                icon={coin.icon}
                                label={coin.label}
                                selected={selectedCoin === coin.label}
                                onClick={() => setSelectedCoin(coin.label)}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col items-center w-full">
                    <div className="flex flex-row items-center justify-center bg-white/40 rounded-2xl py-4 px-4 mb-10" style={{ width: 350 }}>
                        <button
                            className="w-14 h-14 flex items-center cursor-pointer justify-center mr-6 bg-transparent"
                            onClick={() => setAmount((a) => Math.max(1, a - 1))}
                        >
                            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ background: 'transparent' }}>
                                <circle cx="28" cy="28" r="26" stroke="#444" strokeWidth="3" fill="none" />
                                <rect x="16" y="27" width="24" height="2" rx="1" fill="#222" />
                            </svg>
                        </button>
                        <input
                            type="number"
                            min={1}
                            value={amount}
                            onChange={e => setAmount(Math.max(1, Number(e.target.value)))}
                            className="text-xl font-bold text-gray-800 mx-4 min-w-[80px] text-center bg-transparent border-none outline-none"
                            style={{ width: 80 }}
                        />
                        <button
                            className="w-14 h-14 flex items-center cursor-pointer justify-center ml-6 bg-transparent"
                            onClick={() => setAmount((a) => a + 1)}
                        >
                            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ background: 'transparent' }}>
                                <circle cx="28" cy="28" r="26" stroke="#444" strokeWidth="3" fill="none" />
                                <rect x="16" y="27" width="24" height="2" rx="1" fill="#222" />
                                <rect x="27" y="16" width="2" height="24" rx="1" fill="#222" />
                            </svg>
                        </button>
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm mb-4">{error}</div>
                    )}
                    <button
                        className="w-[300px] py-3 rounded-lg bg-white/40 cursor-pointer text-lg tracking-wider text-gray-800 font-medium shadow hover:bg-gray-200 transition"
                        onClick={handleConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

function RechargeOption({ icon, label, selected, onClick }: { icon: string; label: string; selected?: boolean; onClick?: () => void }) {
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
