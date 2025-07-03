'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

interface LogEntry {
    id: number
    user: string
    action: string
    amount: string
    currency: string
    avatars: string[]
    time: string
}

const initialLogs: LogEntry[] = [
    {
        id: 1,
        user: 'Jason',
        action: 'deposited',
        amount: '10,000',
        currency: 'USDT',
        avatars: ['/assets/home/pic.png', '/assets/home/pic2.png', '/assets/home/pic3.png'],
        time: '2 min ago',
    },
    {
        id: 2,
        user: 'Alice',
        action: 'withdrew',
        amount: '2,500',
        currency: 'USDT',
        avatars: ['/assets/home/pic2.png', '/assets/home/pic3.png'],
        time: '10 min ago',
    },
    {
        id: 3,
        user: 'Bob',
        action: 'deposited',
        amount: '5,000',
        currency: 'USDT',
        avatars: ['/assets/home/pic3.png'],
        time: '1 hour ago',
    },
    {
        id: 4,
        user: 'Eve',
        action: 'deposited',
        amount: '7,200',
        currency: 'USDT',
        avatars: ['/assets/home/pic.png', '/assets/home/pic2.png'],
        time: '5 min ago',
    },
    {
        id: 5,
        user: 'Charlie',
        action: 'withdrew',
        amount: '1,000',
        currency: 'USDT',
        avatars: ['/assets/home/pic2.png'],
        time: '20 min ago',
    },
    {
        id: 6,
        user: 'Diana',
        action: 'deposited',
        amount: '3,500',
        currency: 'USDT',
        avatars: ['/assets/home/pic3.png', '/assets/home/pic.png'],
        time: '30 min ago',
    },
    {
        id: 7,
        user: 'Frank',
        action: 'withdrew',
        amount: '4,200',
        currency: 'USDT',
        avatars: ['/assets/home/pic.png'],
        time: '45 min ago',
    },
    {
        id: 8,
        user: 'Grace',
        action: 'deposited',
        amount: '6,800',
        currency: 'USDT',
        avatars: ['/assets/home/pic2.png', '/assets/home/pic3.png'],
        time: '1 hour ago',
    },
    {
        id: 9,
        user: 'Heidi',
        action: 'withdrew',
        amount: '2,200',
        currency: 'USDT',
        avatars: ['/assets/home/pic3.png', '/assets/home/pic.png'],
        time: '2 hours ago',
    },
    {
        id: 10,
        user: 'Ivan',
        action: 'deposited',
        amount: '9,000',
        currency: 'USDT',
        avatars: ['/assets/home/pic.png'],
        time: '3 hours ago',
    },
];

function shuffleLogs(logs: LogEntry[]): LogEntry[] {
    const arr = [...logs];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [logs, setLogs] = useState<LogEntry[]>(initialLogs)
    const images = [
        "/assets/carousel/image.png",
        "/assets/carousel/image2.png",
        "/assets/carousel/image3.png",
        "/assets/carousel/image3.png",
        "/assets/carousel/image4.png",
        "/assets/carousel/image5.png",
        "/assets/carousel/image6.png",
        "/assets/carousel/image7.png",
        "/assets/carousel/image8.png",
        "/assets/carousel/image9.png",
        "/assets/carousel/image10.png",
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length)
        }, 3000)

        return () => clearInterval(timer)
    }, [images.length])

    // Shuffle logs every 3 seconds
    useEffect(() => {
        const logTimer = setInterval(() => {
            setLogs((prevLogs) => shuffleLogs(prevLogs));
        }, 3000);

        return () => clearInterval(logTimer);
    }, []);

    // Only show a maximum of 4 logs at a time
    const visibleLogs = logs.slice(0, 4);

    return <>
        <div className='flex justify-center bg-white/20 backdrop-blur-xs pb-2 pt-4 rounded-bl-2xl rounded-br-2xl'>
            <div className='w-[350px] space-y-2'>
                <div className='w-full rounded-sm overflow-hidden relative h-44'>
                    <div className='flex transition-transform duration-500 ease-in-out h-full' style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                        {images.map((image, index) => (
                            <Image key={index} src={image} alt={`Carousel Image ${index + 1}`} width={400} height={224} className="w-full h-full object-cover flex-shrink-0" />
                        ))}
                    </div>
                </div>
                <div className='h-48 w-full rounded-lg'>
                    <video className="w-full h-full object-cover rounded-2xl" controls autoPlay muted loop>
                        <source src="https://lightsshar.com/video/lighting3.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>

        <div className='flex justify-center py-8'>
            <div className='w-[350px] space-y-4'>
                <img src="/assets/newbg.png" alt="Logo" className="mx-auto mr-4 w-full h-36" />
                <img src="/assets/coupon-desc-entry.png" alt="Logo" className="mx-auto mr-4 w-full h-24" />
                <div className='grid grid-cols-2 gap-3'>
                    <div className='rounded-xl bg-white/50 backdrop-blur-xs flex flex-col px-2 pb-2'>
                        <img src="/assets/scooter/image.png" alt="Scooter 1" className="w-auto h-auto -mt-4 scale-y-75" />
                        <div className='flex flex-col w-full px-2 space-y-[2px]'>
                            <span className="text-sm text-gray-500">LSSC-6</span>
                            <span className="text-blue-500 text-sm">Delivering</span>
                        </div>
                        <span className="text-xs text-gray-500 mt-2">Estimated Daily Revenue</span>
                        <span className="text-lg text-gray-600 font-bold text-center">67.5</span>
                    </div>
                    <div className='rounded-xl bg-white/50 backdrop-blur-xs flex flex-col px-2 pb-2'>
                        <img src="/assets/scooter/image.png" alt="Scooter 1" className="w-auto h-auto -mt-4 scale-y-75" />
                        <div className='flex flex-col w-full px-2 space-y-[2px]'>
                            <span className="text-sm text-gray-500">LSSC-7</span>
                            <span className="text-blue-500 text-sm">Delivering</span>
                        </div>
                        <span className="text-xs text-gray-500 mt-2">Estimated Daily Revenue</span>
                        <span className="text-lg text-gray-600 font-bold text-center">154</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="flex relative justify-center bg-white/30 backdrop-blur-md pt-6 pb-24 rounded-t-2xl">
            <h5 className="absolute left-6 top-3 text-gray-700 tracking-wide text-base">Manage Logs</h5>
            <div className="w-full max-w-md space-y-5 pt-10 px-2">
                {visibleLogs.map(log => (
                    <div key={log.id} className="flex items-center bg-gradient-to-r from-white/80 to-blue-50/60 rounded-2xl px-5 py-4 mb-2 shadow-md hover:shadow-lg transition-shadow duration-200 border border-blue-100">
                        <div className="flex -space-x-3 mr-4">
                            {log.avatars.map((avatar, idx) => (
                                <img key={idx} src={avatar} alt="avatar" className="w-10 h-10 rounded-full border-2 border-white object-cover shadow" style={{ zIndex: logs.length - idx }} />
                            ))}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1 flex-wrap">
                                <span className="text-gray-900 font-semibold truncate">{log.user}</span>
                                <span className="text-gray-500">{log.action}</span>
                                <span className="text-blue-600 font-bold ml-1">{log.amount} {log.currency}</span>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">{log.time}</div>
                        </div>
                        <div className="ml-3 flex items-center">
                            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
}