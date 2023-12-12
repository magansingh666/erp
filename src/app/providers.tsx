'use client'

import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react'
import { RecoilRoot } from 'recoil';

export default function Providers({
    children,
  }: {
    children: React.ReactNode;
  }) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
      
      {children}
      </RecoilRoot>
    
    
    </QueryClientProvider>
  )
}