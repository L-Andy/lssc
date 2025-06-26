'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0)
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
    return <>
        <div className='flex justify-center bg-white/20 backdrop-blur-xs pb-2 pt-4 rounded-bl-2xl rounded-br-2xl'>
            <div className='w-[350px] space-y-2'>
                <div className='w-full rounded-sm overflow-hidden relative h-44'>
                    <div
                        className='flex transition-transform duration-500 ease-in-out h-full'
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {images.map((image, index) => (
                            <Image
                                key={index}
                                src={image}
                                alt={`Carousel Image ${index + 1}`}
                                width={400}
                                height={224}
                                className="w-full h-full object-cover flex-shrink-0"
                            />
                        ))}
                    </div>
                </div>
                <div className='h-48 w-full rounded-lg'>
                    <video
                        className="w-full h-full object-cover rounded-2xl"
                        controls
                        autoPlay
                        muted
                        loop
                    >
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

        <div className='flex relative justify-center bg-white/20 backdrop-blur-xs py-4 rounded-tl-2xl rounded-tr-2xl'>
            <h5 className='absolute left-3 top-2 text-gray-600 font-light'>Manage logs</h5>
            <div className='w-[350px] space-y-4'>
                <div className='w-full rounded-sm overflow-hidden relative h-44'>
                    <div
                        className='flex transition-transform duration-500 ease-in-out h-full'
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {images.map((image, index) => (
                            <Image
                                key={index}
                                src={image}
                                alt={`Carousel Image ${index + 1}`}
                                width={400}
                                height={224}
                                className="w-full h-full object-cover flex-shrink-0"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </>
}