'use client'
import React, { useEffect, useState } from 'react'
import NavLink from '../navbar/NavLink'
import NavSlctLink from '../navbar/NavSlctLink'
import ChangeLang from '../navbar/ChangeLang'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { FaBars } from 'react-icons/fa6'
import { RxCross1 } from 'react-icons/rx'
import MobileSlctLink from '../navbar/MobileSlctLink'
import Link from 'next/link'

const projects = [{name: 'Bilgah Beach Hotel', id: 1}, {name: 'Intourist Hotel Baku', id: 2}, {name: 'Baku Marriott Hotel Boulevard', id: 3}]

const Header = () => {
  // İnternationalization
  const t = useTranslations("Navigation")
    
  // Change navbar color when scrolling
  const [color, setColor] = useState(false)
  useEffect(() => {
    const changeColor = () => {
      if(window.scrollY >= 90){
        setColor(true)
      } else{
        setColor(false)
      }  
    }

    window.addEventListener('scroll', changeColor)

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', changeColor);
    };
  })
    
  

  // Mobile menu toggle
  const [menu, setMenu] = useState(false)
  
  return (
    <div className={`flex flex-row-reverse md:flex-row fixed items-center justify-between top-0 z-50 w-full px-3 sm:px-8 lg:px-16 duration-300 ${color ? 'bg-[rgba(21,42,56,0.95)]': 'bg-transparent'}`}>     
      {/* Logo */}
      <div className="relative z-[-1] flex gap-6 place-items-center">
        <div className='flex md:hidden'><ChangeLang /></div> {/* Change language button */}
        {/* Logo */}
        <Link href={'/'}>
          <Image
            src="/logo.png"
            alt="ProSAS Logo"
            width={50}
            height={50}
            priority
          />
        </Link>
      </div>
      

      {/* Links */}
      <div className='hidden md:flex gap-8 lg:gap-12 items-center'>
        <NavLink text={t('home')} link='/' />
        <NavLink text={t('about')} link='/about' />
        <NavSlctLink 
          text={t('projects')}
          options={projects}
        />
        <NavLink text={t('contact')} link='#footer' />
        {/* Change language button */}
        <ChangeLang />
      </div>

      {/* Mobile navigation toggle */}
      <button
       className='md:hidden text-2xl'
       onClick={() => setMenu(!menu)}
       aria-label='Open menu'
       title='Open menu'
       >
        <FaBars aria-hidden />
      </button>

      {/* Mobile menu */}
      <div className={`absolute top-0 min-h-screen pt-6 w-full bg-[rgba(27,44,59,0.95)] duration-300 ${menu ? 'left-0' : '-left-full'}`}>
        {/* Mobile navigation toggle */}
        <button
         className='text-2xl ms-3 sm:ms-8'
         onClick={() => setMenu(!menu)}
         aria-label={menu ? 'Close menu' : 'Open menu'}
         title={menu ? 'Close menu' : 'Open menu'}
        >
          <RxCross1 aria-hidden="true"/>
        </button>
        {/* Links */}
        <div className='flex flex-col gap-6 lg:gap-12 items-center'>
          <Link className='font-[600] tracking-wide text-cloud-1 active:text-primary px-1 py-3 capitalize' href={'/'} onClick={() => setMenu(!menu)}>{t('home')}</Link>
          <Link className='font-[600] tracking-wide text-cloud-1 active:text-primary px-1 py-3 capitalize' href={'#about'} onClick={() => setMenu(!menu)}>{t('about')}</Link>
          <Link className='font-[600] tracking-wide text-cloud-1 active:text-primary px-1 py-3 capitalize' href={'#services'} onClick={() => setMenu(!menu)}>{t('services')}</Link>
          <MobileSlctLink />
          <Link className='font-[600] tracking-wide text-cloud-1 active:text-primary px-1 py-3 capitalize' href={'#footer'} onClick={() => setMenu(!menu)}>{t('contact')}</Link>
          {/* Change language button */}
          <ChangeLang />
        </div>
      </div>
    </div>

    
  )
}

export default Header
