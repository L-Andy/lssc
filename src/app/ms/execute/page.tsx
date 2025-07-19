'use client'

import { account, getUserRentings } from '@/utils/appwrite';
import { useEffect, useState } from 'react';
import { products } from '@/utils/data/products';

export default function Execute() {
    const [user, setUser] = useState<any>(null);
    const [rentings, setRentings] = useState<any[]>([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            try {
                const userData = await account.get();
                setUser(userData);
            } catch (err: any) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    useEffect(() => {
        async function fetchRentings() {
            if (user && user.$id) {
                try {

                    const data = await getUserRentings(user.$id);
                    const enrichedRentings = data.map((renting: any) => {
                        const product = products.find(p => p.id === renting.productId);
                        let profit = 0;
                        let profitBreakdown: number[] = [];
                        if (product) {
                            const startDate = new Date(renting.$createdAt || renting.startDate);
                            const endDate = new Date();
                            const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
                            const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
                            const dailyProfit = (product.profit_value / 100) * product.price;
                            profit = dailyProfit * diffDays;
                            // Build profit breakdown per day
                            for (let i = 1; i <= diffDays; i++) {
                                profitBreakdown.push(dailyProfit * i);
                            }
                        }
                        return {
                            ...renting,
                            product,
                            profit,
                            profitBreakdown,
                        };
                    });

                    setRentings(enrichedRentings);
                } catch (err) {
                    setRentings([]);
                }
            } else {
                setRentings([]);
            }
        }
        fetchRentings();
    }, [user]);

    console.log('Rentings')
    console.log(rentings)

    return <div className="flex flex-col items-center py-8 w-full">
        <div className="w-full flex justify-center">
            <div className="w-full max-w-[370px] space-y-8">
                <div className='rounded-lg bg-white/30 backdrop-blur-xs flex flex-row justify-around py-6'>
                    <div className="flex flex-col items-center mx-4 cursor-pointer transition-transform duration-200 hover:scale-105 group">
                        <img
                            src="/assets/run/charging.png"
                            alt="Charging"
                            className="w-12 h-12 mb-2 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
                        />
                        <span className='text-gray-700 transition-colors duration-200 group-hover:text-gray-900'>Charging</span>
                    </div>
                    <div className="flex flex-col items-center mx-4 cursor-pointer transition-transform duration-200 hover:scale-105 group">
                        <img
                            src="/assets/run/closed.png"
                            alt="Closed"
                            className="w-12 h-12 mb-2 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
                        />
                        <span className='text-gray-700 transition-colors duration-200 group-hover:text-gray-900'>Closed</span>
                    </div>
                    <div className="flex flex-col items-center mx-4 cursor-pointer transition-transform duration-200 hover:scale-105 group">
                        <img
                            src="/assets/run/normal.png"
                            alt="Normal"
                            className="w-12 h-12 mb-2 transition-transform duration-300 group-hover:scale-125"
                        />
                        <span className='text-gray-700 transition-colors duration-200 group-hover:text-gray-900'>Normal</span>
                    </div>
                </div>
                {rentings && rentings.length > 0 ? (
                    rentings.flatMap((renting: any) => {
                        const product = renting.product;
                        const productName = "LSSC-" + Math.floor(Math.random() * 10000);
                        const productImage = product?.image || '/assets/no-data.png';
                        const initialInvestment = product?.price || 0;
                        const profit = renting.profit || 0;
                        const grossIncome = initialInvestment + profit;
                        const unitPrice = product?.price || 0;
                        const runTime = renting.runTime || 0;
                        const runTimeDisplay = runTime ? `${runTime}h` : 'N/A';
                        const deliveringRentalUnitPrice = unitPrice && runTime
                            ? `${unitPrice} / ${runTimeDisplay}`
                            : 'N/A';

                        // Show the product on the top, then below initial investment (left), profits (right), and below the date of that profit
                        return renting.profitBreakdown.map((profitValue: any, idx: number) => {
                            // Calculate the date for this profit breakdown
                            const startDate = new Date(renting.$createdAt || renting.startDate);
                            const profitDate = new Date(startDate);
                            profitDate.setDate(startDate.getDate() + idx);

                            // Format date as YYYY-MM-DD
                            const formattedDate = profitDate.toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            });

                            return (
                                <div
                                    key={`${renting.$id || product?.id}-${idx}`}
                                    className="relative bg-white/50 rounded-2xl border border-yellow-200 shadow-lg w-full flex flex-col items-center mb-6"
                                >
                                    {/* Product Name at the top */}
                                    <div className="w-full flex flex-row items-center justify-center pt-4">
                                        <span className="text-gray-800 text-lg font-semibold">{productName}</span>
                                        <span className="ml-3 text-sm text-gray-500 font-medium">
                                         <b>×{renting.product.profit_value}</b>
                                        </span>
                                    </div>
                                    {/* Initial Investment (left) and Profit (right) */}
                                    <div className="w-full flex flex-row justify-between items-center px-6 py-4">
                                        <div className="flex flex-col items-start">
                                            <span className="text-gray-700 text-sm mb-1">
                                                Initial investment:
                                            </span>
                                            <span className="font-bold text-gray-900">{initialInvestment}</span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-gray-700 text-sm mb-1">
                                                Profit:
                                            </span>
                                            <span className="font-bold text-green-700">{profitValue.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    {/* Date of that profit */}
                                    <div className="w-full flex flex-row justify-center pb-4">
                                        <span className="text-gray-500 text-xs">
                                            {formattedDate}
                                        </span>
                                    </div>
                                </div>
                            );
                        });
                    })
                ) : (
                    <div className='rounded-lg bg-white/30 backdrop-blur-xs flex flex-col justify-center items-center py-6'>
                        <img src="/assets/no-data.png" className='w-32 h-32' alt="No Data" />
                    </div>
                )}
            </div>
        </div>
    </div>
}