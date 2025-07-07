'use client'

import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const lastSegment = (() => {
    if (!pathname) return ''
    const segments = pathname.split('/').filter(Boolean)
    if (segments.length < 2) return ''
    return segments[1]
  })()

  const tabs = [
    {
      key: '',
      label: 'Accueil',
      route: '/ms',
      activeImg: '/assets/tabs/Home.png',
      inactiveImg: '/assets/tabs/HOME1.png',
      alt: 'Home',
    },
    {
      key: 'join',
      label: 'Scanner',
      route: '/ms/join',
      activeImg: '/assets/tabs/energy.png',
      inactiveImg: '/assets/tabs/ENERGY1.png',
      alt: 'Scan',
    },
    {
      key: 'execute',
      label: 'Exécuter',
      route: '/ms/execute',
      activeImg: '/assets/tabs/EAPB.png',
      inactiveImg: '/assets/tabs/EAPB1.png',
      alt: 'Ride',
    },
    {
      key: 'share',
      label: 'Partager',
      route: '/ms/share',
      activeImg: '/assets/tabs/share.png',
      inactiveImg: '/assets/tabs/SHARE1.png',
      alt: 'Share',
    },
    {
      key: 'my',
      label: 'Mon',
      route: '/ms/my',
      activeImg: '/assets/tabs/my.png',
      inactiveImg: '/assets/tabs/MY1.png',
      alt: 'My',
    },
  ]

  return (
    <div className="min-h-screen relative bg-[url('/assets/main-bg-1.png')] bg-cover bg-center bg-no-repeat overflow-auto">
      {/* Header */}
      {pathname === '/ms' && (
        <>
          <header className="relative h-12 flex bg-white/20 backdrop-blur-xs items-center justify-between px-4">
            <button className="text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              <a href="#" className="text-blue-500">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
                </svg>
              </a>
              <a href="https://t.me/lssc_admin" className="text-red-500">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </header>
          <div className="flex flex-row items-center justify-start w-full px-4 py-1 bg-white/30 backdrop-blur-xs">
            <div className="flex flex-row items-center space-x-4">
              <Image src="/assets/home/logo.png" alt="Logo" width={24} height={24} className="mr-2" />
              <h4 className="text-black text-sm">
                Welcome to Lighting Shared Scooter Co., Ltd
              </h4>
            </div>
          </div>
        </>
      )}

      {children}

      {/* Bottom Tabbar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around items-center h-14">
          {tabs.map(tab => {
            const isActive = lastSegment === tab.key
              || (tab.key === '' && (lastSegment === '' || lastSegment === undefined))
            return (
              <div
                key={tab.route}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => router.push(tab.route)}
              >
                <div className="w-8 h-8 mb-1">
                  <img
                    src={isActive ? tab.activeImg : tab.inactiveImg}
                    alt={tab.alt}
                    className="w-full h-full"
                  />
                </div>
                <span className="text-xs text-gray-500">{tab.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}