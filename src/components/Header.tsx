'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from '@nextui-org/react'
import Image from 'next/image'
import NextLink from 'next/link'

export default function Header() {
  return (
    <Navbar height={74} className='bg-white' maxWidth='full'>
      <NavbarBrand className=''>
        <Link href='/' as={NextLink}>
          <Image height={56} width={115} src={'/logo/miki.png'} alt='miki_logo' />
        </Link>
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-x-11' justify='center'>
        <NavbarItem isActive>
          <Link href='/deposit' as={NextLink} className='text-black font-bold'>
            Deposit
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/transfer' as={NextLink} className='text-black font-bold'>
            Magic Transfer
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/dapps' as={NextLink} className='text-black font-bold'>
            Smart Dapps
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/explorer' as={NextLink} className='text-black font-bold'>
            Explorer
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem>
          <ConnectButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
