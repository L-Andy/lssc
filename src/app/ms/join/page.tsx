'use client'

import VipButton from '@/vip/Button';
import Image from 'next/image';

const cards = [1, 2, 3, 4, 5];

export default function Join() {
    return (
        <div className="flex flex-col items-center py-8 w-full">
            <div className="w-full flex justify-center">
                <div className="w-full max-w-[370px] space-y-8">
                    {cards.map((_, idx) => (
                        <div key={idx} className="relative bg-white/50 rounded-2xl border border-yellow-200 shadow-lg w-full flex flex-col items-center">
                            <div className="flex flex-col w-full h-full">
                                {/* Top row: spans both columns */}
                                <div className="flex flex-row items-center justify-between w-full">
                                    <div className="flex items-center px-4">
                                        <Image src="/assets/scooter/image.png" alt="Scooter" width={90} height={50} className="scale-110" />
                                    </div>
                                    <div className="flex flex-col items-center justify-center py-3 px-4">
                                        <span className="text-gray-700 text-sm font-medium">
                                            Single equipment daily profit: <span className="text-gray-600 font-bold">1</span>
                                        </span>
                                        <div className="mt-2">
                                            <VipButton>Unable to purchase</VipButton>
                                        </div>
                                    </div>
                                </div>
                                {/* Bottom row: Equipment Quantity and Equipment Price side by side */}
                                <div className="flex flex-row w-full border-t border-yellow-200">
                                    {/* Bottom left: Equipment Quantity */}
                                    <div className="flex flex-col items-center flex-1 border-r border-yellow-200 p-3">
                                        <span className="text-md font-bold text-black">490</span>
                                        <span className="text-sm text-black">Equipment Price:</span>
                                    </div>
                                    {/* Bottom right: Equipment Price */}
                                    <div className="flex flex-col items-center flex-1 p-3">
                                        <span className="text-md font-bold text-black">0</span>
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