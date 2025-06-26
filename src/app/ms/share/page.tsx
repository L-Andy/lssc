'use client'

export default function Share() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-[300px] text-center text-black">
                <h1 className="text-2xl font-bold mb-6">Recruite partnners</h1>
                <div className="mb-8">
                    <span className="font-semibold">Message</span>
                    <br />
                    <span className='leading-2'>
                        Every time you share, it is the transmission of belief and the beginning of changing the fate of others. You are not only sharing an opportunity, but also helping more ordinary people find the way to realize their dreams and give them the power to change their lives. Every effort is to achieve success for others and for yourself.
                    </span>
                </div>
                <button
                    className="h-12 px-12 rounded-full font-semibold shadow transition text-black
                        bg-gradient-to-r from-orange-200 via-pink-200 to-blue-200
                        hover:from-orange-300 hover:via-pink-300 hover:to-blue-300"
                >
                    Invite
                </button>
            </div>
        </div>
    )
}