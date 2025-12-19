import LandingPageCMS from '@/components/admin/cms/LandingPageCMS';
import React, { Suspense } from 'react'

export const dynamic = 'force-dynamic';

const Page = async () => {

  return (
    <Suspense>
      <LandingPageCMS />
    </Suspense>
  )
}

export default Page