'use client';
import React from 'react';
import NavLinks from "./nav-links"; 
import Header from '@/app/navBar';
import Footer from '@/components/footer/Footer';
import ScrollToTopButton from '@/components/home/slideup';
import { ThemeProvider } from '@/components/ThemeProvider';
import Whatsapp from '@/components/whatsapp/Index';


export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-roboto bg-white ">
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        {/* Aquí puedes poner el favicon si es necesario */}
        {/* <link rel="icon" href="/image/iconoinalt.png" /> */}

        {/* Puedes descomentar el Header si lo necesitas */}
        {/* <Header /> */}
        <main>{children}</main>
        <Whatsapp />
        <Footer />
        <ScrollToTopButton />
      </ThemeProvider>
    </div>
  );
}
