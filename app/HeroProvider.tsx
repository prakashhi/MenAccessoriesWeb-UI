'use client'
import {HeroUIProvider} from "@heroui/react";

export default function HeroProvider({children}:{children:React.ReactNode}) {
  // 2. Wrap HeroUIProvider at the root of your app
  return (
    <HeroUIProvider>
      {children}
    </HeroUIProvider>
  );
}