import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Suspense } from "react";

const DiplomadosNav = dynamic(
  () => import("@/components/diplomadosComponents/diplomadosNav")
);
const DashboardSkeleton = dynamic(() => import("@/components/home/skeletons"));

export default function Main() {
  return (
    <div className="bg-transparent  mx-auto max-w-screen-2xl px-4 md:px-8 mb-12">
      
      <div className="mb-8">
        <h2 className="mb-4 mt-8 text-center text-2xl font-bold text-primaryblue dark:text-black md:mb-6 lg:text-4xl">
          Nuestros Diplomados
        </h2>
        <p className="mx-auto text-center dark:text-black md:text-xl">
          Explora Nuestra Trayectoria Educativa: Descubre Nuestros Programas de
          Formación
        </p>
      </div>
      <div>
        <Suspense fallback={<DashboardSkeleton />}>
          <DiplomadosNav />
        </Suspense>
      </div>
      
    </div>
  );
}