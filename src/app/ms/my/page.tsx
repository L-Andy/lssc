'use client'

import { useRouter } from 'next/navigation';

export default function My() {
    const router = useRouter()
    return (
        <div className="flex flex-col items-center py-8 w-full min-h-screen">
            {/* Profile Card */}
            <div className="w-full flex justify-center mb-6">
                <div className="w-full max-w-[420px] rounded-2xl bg-blue-500/90 shadow-lg flex flex-col items-center py-6 relative">
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gray-200 border-2 border-blue-400 rounded-full w-10 h-10 flex items-center justify-center shadow">
                        <span className="text-blue-600 font-bold text-lg">D</span>
                    </div>
                    <div className="mt-6 flex flex-row items-center w-full px-6">
                        <img
                            src="/assets/avatar-default.png"
                            alt="Avatar"
                            className="w-20 h-20 rounded-full border-4 border-white shadow mr-4 bg-white"
                        />
                        <div className="flex flex-col flex-1">
                            <span className="text-white text-xl font-semibold">Djae(****3997918)</span>
                            <div className="flex items-center mt-2">
                                <div className="w-40 h-2 bg-white/40 rounded-full overflow-hidden mr-3">
                                    <div className="h-full bg-blue-300" style={{ width: '60%' }}></div>
                                </div>
                                <span className="text-white text-lg font-medium">70</span>
                            </div>
                            <span className="text-white/80 text-sm mt-1">My rating:</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recharge & Withdrawal Buttons */}
            <div className="w-full max-w-[420px] flex flex-row justify-between mb-6 px-2">
                <button className="w-[48%] py-3 cursor-pointer rounded-xl bg-white/60 text-gray-700 hover:bg-white/80 transition" onClick={() => router.push('/ms/my/recharge')}>Recharge</button>
                <button className="w-[48%] py-3 cursor-pointer rounded-xl bg-white/60 text-gray-700 hover:bg-white/80 transition">Withdrawal</button>
            </div>

            {/* Wallet/Account Options List */}
            <div className="w-full max-w-[420px] rounded-2xl bg-white/30 backdrop-blur-xs shadow flex flex-col divide-y divide-white/40">
                <OptionRow label="LSSC Wallet" />
                <OptionRow label="Wallet Address" />
                <OptionRow label="Set Login Password" />
                <OptionRow label="Set transaction password" />
                <OptionRow label="Team size" value="0" />
                <OptionRow label="Team Report" value="0" />
            </div>
        </div>
    );
}

function OptionRow({ label, value }: { label: string; value?: string }) {
    return (
        <div className="flex flex-row items-center justify-between px-6 py-5 cursor-pointer transition">
            <span className="text-base text-gray-800">{label}</span>
            <div className="flex items-center space-x-2">
                {value && <span className="text-base text-gray-700">{value}</span>}
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </div>
    );
}