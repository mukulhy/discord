import { currentProfile } from '@/lib/current-profile';
import { redirect } from 'next/navigation';
import React from 'react'

const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }
  return (
    <div>nvigation-sidebar</div>
  )
}

export default NavigationSidebar