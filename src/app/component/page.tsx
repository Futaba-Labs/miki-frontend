'use client'

import { Tab, Tabs } from '@nextui-org/react'
import { useState } from 'react'
import { AccountOperations } from '@/components'

export default function Component() {
  /* タブでETHとUSDCを分け、それに応じてAccountOperations.tsxとYourDepositsのtxボタンを切り替えてます
  実際には、ユーザーのETHとUSDCの残高をfetchして、表示する必要があります。(現在は1.24ETH と124USDCに固定してあります。)
  */
  const [selected, setSelected] = useState('ETH')

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '80px' }}>
        <Tabs
          key='coin'
          variant='solid'
          aria-label='Tabs variants'
          selectedKey={selected}
          onSelectionChange={(key) => setSelected(key.toString())}
        >
          <Tab key='ETH' title='ETH' />
          <Tab key='USDC' title='USDC' />
        </Tabs>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ marginRight: '0px' }}>{/* <DepositCard tab={selected} /> */}</div>
        <div style={{ marginLeft: '0px' }}>
          <AccountOperations tab={selected} />
        </div>
      </div>
    </div>
  )
}
