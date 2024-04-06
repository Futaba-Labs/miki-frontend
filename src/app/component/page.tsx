'use client'

import { TabTest, AccountOperations, YourDeposits } from '@/components'

export default function Component() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <div style={{ marginRight: '20px' }}>
          <YourDeposits />
        </div>
        <div style={{ marginLeft: '20px' }}>
          <AccountOperations />
        </div>
      </div>
      <div>
        <TabTest />
      </div>
    </div>
  )
}
