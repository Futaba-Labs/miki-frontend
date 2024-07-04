'use client'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Link,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/react'
import Image from 'next/image'
import NextLink from 'next/link'
import { useState } from 'react'
import { CustomConnectButton } from '.'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { name: 'Deposit', href: '/deposit' },
    { name: 'Magic Transfer', href: '/transfer' },
    { name: 'Smart Dapps', href: '/dapps' },
    { name: 'Explorer', href: '/explorer' },
  ]

  return (
    <Navbar className='bg-white px-0 sm:px-6' maxWidth='full' isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarBrand className=''>
        <Link href='/' as={NextLink}>
          <Image height={56} width={115} src={'/logo/miki.png'} alt='miki_logo' />
        </Link>
      </NavbarBrand>
      <NavbarContent className='sm:hidden' justify='start'>
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
      </NavbarContent>
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
          <CustomConnectButton />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link as={NextLink} className='text-black font-bold' href={item.href} onPress={() => setIsMenuOpen(false)}>
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
