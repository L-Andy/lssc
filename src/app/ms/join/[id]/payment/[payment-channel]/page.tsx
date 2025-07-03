'use client'

import { useEffect, useState } from 'react';
import { coins } from '@/utils/data/coin';
import { products } from '@/utils/data/products';
import { useParams } from 'next/navigation';


export default function PaymentChannelPage() {
    const [timeLeft, setTimeLeft] = useState(2 * 60 * 60 - 1);
    const params = useParams();
    const id = params?.id;
    const paymentChannel = params?.['payment-channel'];

    // Filter coin based on payment channel
    const selectedCoin = coins.find(coin => coin.label.toLowerCase() === paymentChannel);
    
    // Get product based on id
    const product = products.find(p => p.id === id);

    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    function formatTime(secs: number) {
        const h = String(Math.floor(secs / 3600)).padStart(2, '0');
        const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
        const s = String(secs % 60).padStart(2, '0');
        return `${h}:${m}:${s}`;
    }

    // Get transfer network from payment channel
    const transferNetwork = typeof paymentChannel === 'string' && paymentChannel.includes('.') ? paymentChannel.split('.')[1] : paymentChannel;

    if (!selectedCoin) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen w-full">
                <div className="text-red-500 text-lg font-semibold">Payment method not found.</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen w-full">
                <div className="text-red-500 text-lg font-semibold">Product not found.</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-b from-orange-200 to-white relative">
            {/* Header */}
            <div className="w-full flex flex-col items-center justify-center bg-gradient-to-r from-orange-400 to-red-400 pt-8 pb-4 mb-4">
                <img src="/assets/pay.png" alt="Wallet" className="w-32 h-32 mb-2" />
            </div>
            {/* QR Code */}
            <div className="flex flex-col items-center justify-center w-full mb-8">
                <img src={selectedCoin.walletIcon} alt="QR Code" className="w-40 h-40 scale-125" />
            </div>
            {/* Timer */}
            <div className="text-center text-gray-700 font-semibold text-lg mb-4">{formatTime(timeLeft)}</div>
            {/* Payment Details Card */}
            <div className="w-full max-w-md flex flex-col items-center">
                <div className="bg-gray-100 rounded-md px-6 py-4 w-full flex flex-col items-start space-y-4">
                    <div className="mb-2 text-sm text-gray-500 tracking-wider">
                        <span className="font-medium">Transfer network</span>: <span className="font-bold text-gray-700 capitalize">{transferNetwork}</span>
                    </div>
                    <div className="mb-2 text-sm text-gray-500 tracking-wider">
                        <span className="font-medium">Deposit amount</span>: <span className="font-bold text-gray-700">{product.price}</span>
                    </div>
                    <div className="mb-2 text-sm text-gray-500 break-all">
                        <span className="font-medium tracking-wider">{selectedCoin.walletId}</span>
                        <button 
                            className="ml-2 px-2 py-1 cursor-pointer bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-xs"
                            onClick={() => navigator.clipboard.writeText(selectedCoin.walletId)}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* Spacer for bottom */}
            <div className="flex-1 min-h-[100px]" />
        </div>
    );
}
