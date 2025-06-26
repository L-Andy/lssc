'use client'

export default function Execute() {
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
            </div>
        </div>
    </div>
}