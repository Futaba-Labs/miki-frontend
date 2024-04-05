'use client'

import AccountOperations from '@/components/AccountOperations'
import YourDeoisits from '@/components/YourDeposits'

export default function Component() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <div style={{ marginRight: '20px' }}>
       
        <YourDeoisits />
        
      </div>
      <div style={{ marginLeft: '20px' }}>
      <AccountOperations />
      
      </div>
    </div>
  )
}
