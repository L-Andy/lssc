'use client'

import VipButton from '@/vip/Button';
import Image from 'next/image';

type Card = {
    profit_value: number;
    price: number;
    quantity: number;
    rentable: boolean
    image: string;
};

const cards: Card[] = [
    {
        profit_value: 1,
        price: 490,
        quantity: 0,
        rentable: false,
        image: '/assets/scooter/image1.png',
    },
    {
        profit_value: 2,
        price: 980,
        quantity: 1,
        rentable: true,
        image: '/assets/scooter/image3.png',
    },
    {
        profit_value: 3,
        price: 1500,
        quantity: 2,
        rentable: true,
        image: '/assets/scooter/image.png',
    },
    {
        profit_value: 4,
        price: 2000,
        quantity: 3,
        rentable: true,
        image: '/assets/scooter/image.png',
    },
    {
        profit_value: 5,
        price: 2500,
        quantity: 4,
        rentable: true,
        image: '/assets/scooter/image.png',
    },
    {
        profit_value: 6,
        price: 3000,
        quantity: 5,
        rentable: true,
        image: '/assets/scooter/image2.png',
    },
    {
        profit_value: 7,
        price: 3500,
        quantity: 6,
        rentable: true,
        image: '/assets/scooter/image2.png',
    },
    {
        profit_value: 8,
        price: 4000,
        quantity: 7,
        rentable: true,
        image: '/assets/scooter/image2.png',
    },
];

export default function Join() {
    return (
        <div className="flex flex-col items-center py-8 w-full">
            <div className="w-full flex justify-center">
                <div className="w-full max-w-[370px] space-y-8">
                    {cards.map((card, idx) => (
                        <div key={idx} className="relative bg-white/50 rounded-2xl border border-yellow-200 shadow-lg w-full flex flex-col items-center">
                            <div className="flex flex-col w-full h-full">
                                {/* Top row: spans both columns */}
                                <div className="flex flex-row items-center justify-between w-full">
                                    <div className="flex items-center px-4">
                                        <Image src={card.image} alt="Scooter" width={90} height={50} className="scale-110" />
                                    </div>
                                    <div className="flex flex-col items-center justify-center py-3 px-4">
                                        <span className="text-gray-700 text-sm font-medium">
                                            Single equipment daily profit: <span className="text-gray-600 font-bold">{card.profit_value}</span>
                                        </span>
                                        <div className="mt-2">
                                            <VipButton disabled={!card.rentable}>{card.rentable ? 'Rent' : 'Unable to purchase'}</VipButton>
                                        </div>
                                    </div>
                                </div>
                                {/* Bottom row: Equipment Quantity and Equipment Price side by side */}
                                <div className="flex flex-row w-full border-t border-yellow-200">
                                    {/* Bottom left: Equipment Price */}
                                    <div className="flex flex-col items-center flex-1 border-r border-yellow-200 p-3">
                                        <span className="text-md font-bold text-black">{card.price}</span>
                                        <span className="text-sm text-black">Equipment Price:</span>
                                    </div>
                                    {/* Bottom right: Equipment Quantity */}
                                    <div className="flex flex-col items-center flex-1 p-3">
                                        <span className="text-md font-bold text-black">{card.quantity}</span>
                                        <span className="text-sm text-black">Equipment Quantity:</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}