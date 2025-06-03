"use client";

import React, { Suspense, memo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

// Carga dinámica de componentes para mejorar LCP
const SearchCode = dynamic(
  () => import("@/components/certificate/SearchCode"),
  { suspense: true }
);
const SearchDNI = dynamic(() => import("@/components/certificate/SearchDNI"), {
  suspense: true,
});
const SearchName = dynamic(
  () => import("@/components/certificate/SearchName"),
  { suspense: true }
);

// Componente memoizado para evitar re-renders innecesarios
const Logo = memo(
  ({
    src,
    alt,
    width,
    height,
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }) => (
    <div
      className="relative flex justify-center items-center w-full"
      style={{ height, width }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: "contain" }} // Mantener el estilo de la imagen
        priority
      />
    </div>
  )
);

const TestingPage: React.FC = () => {
  const handleSearch = (data: any) => {
    console.log(data);
  };

  return (
    <section className="relative bg-fixed bg-cover bg-center min-h-[400px] w-full bg-[url('/image/panorama.jpg')]">
      {/* Overlay con color semitransparente */}
      <div className="absolute inset-0 bg-blue-600 opacity-50"></div>

      <div className="relative py-12 mx-auto max-w-screen-lg px-4 w-full">
        <div className=" bg-transparent rounded-lg shadow-lg p-8 md:p-12 mb-12 w-full">
          {/* Nueva estructura de contenedor para centrar los logos */}
          <div className="flex justify-center items-center gap-12 mb-6 w-full">
            {/* Logotipo de Corporación Inalta */}
            <Logo
              src="/image/inaltlogwhite.png"
              alt="Logo Inalta"
              width={200}
              height={200}
            />

            {/* Logotipo de la Universidad Nacional de Piura */}
            <Logo
              src="/image/uni_dark.png"
              alt="UNP"
              width={200}
              height={200}
            />
          </div>

          {/* Título y Pestañas */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-100 mb-6 md:text-4xl">
              VERIFICAR CERTIFICADO
            </h2>
            <p className="text-gray-100 text-lg mb-8">
              Verifica la validez de tu certificado introduciendo tu DNI, nombre
              completo o código de certificado. Nos esforzamos en proteger la
              privacidad y el manejo confidencial de tus datos personales.
            </p>

            {/* Pestañas optimizadas para carga diferida */}
            <Tabs
              aria-label="Opciones de búsqueda"
              color="secondary"
              classNames={{
                tabList:
                  "w-full flex flex-col md:flex-row bg-transparent border border-gray-300/40",
                cursor: "bg-gray-100/30 text-gray-100",
                tab: "py-2 px-4 rounded-t-lg text-gray-100",
                tabContent:
                  "group-data-[selected=true]:text-gray-100 text-g-100 ",
              }}
            >
              <Tab key="dni" title="Buscar por DNI">
                <Suspense fallback={<div className="loader">Cargando...</div>}>
                  <Card>
                    <CardBody className="bg-gray-100 w-full">
                      <SearchDNI onSearchDNI={handleSearch} />
                    </CardBody>
                  </Card>
                </Suspense>
              </Tab>
              <Tab key="code" title="Buscar por Código">
                <Suspense fallback={<div className="loader">Cargando...</div>}>
                  <Card>
                    <CardBody className="bg-gray-100 dark:bg-gray-900 w-full">
                      <SearchCode onSearchCode={handleSearch} />
                    </CardBody>
                  </Card>
                </Suspense>
              </Tab>
              <Tab key="name" title="Buscar por Nombres">
                <Suspense fallback={<div className="loader">Cargando...</div>}>
                  <Card>
                    <CardBody className="bg-gray-100 dark:bg-gray-900 w-full">
                      <SearchName onSearchName={handleSearch} />
                    </CardBody>
                  </Card>
                </Suspense>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestingPage;
