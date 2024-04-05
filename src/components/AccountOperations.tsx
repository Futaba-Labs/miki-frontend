'use client'
import { Button } from '@nextui-org/react'
import { Tabs, Tab } from '@nextui-org/react'

export default function AccountOperations() {
  return (
    <div>
      <Button radius='full' className='bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg'>
        Button
      </Button>
      <div className='flex w-full flex-col'>
        <Tabs disabledKeys={['music']} aria-label='Disabled Options'>
          <Tab key='photos' title='Photos'></Tab>
          <Tab key='music' title='Music'></Tab>
          <Tab key='videos' title='Videos'></Tab>
        </Tabs>
      </div>
    </div>
  )
}
