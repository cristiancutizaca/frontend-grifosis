"use client";
import React, { useState, useEffect } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

import DiploCivil from "./diplomadosCivil";
import DiploAmbiental from "./diplomadosAmbient";
import DiploAlimentarias from "./diplomadosAlimentarias";
import DiploAgronoma from "./diplomadosAgronoma";
import DiploDerecho from "./diplomadosDerecho";

const Graduate = () => {
  return (
    <section id="/diplomados">
      <div className=" p-5 flex flex-col">
        <div id='civil' className="flex text-primaryblue text-center text-3xl  lg:text-5xl xl:text-5xl lg:w-3/4 mb-4 font-bold font-poppins lg:ml-72">
            DIPLOMADOS EN INGENIERÍA CIVIL
        </div>
          <div id='graduateAmbientaly' className='mb-20 lg:mb-10'>
            <DiploCivil />
          </div>
          <div id='ambiental' className="flex text-primaryblue text-center text-3xl  lg:text-5xl xl:text-5xl lg:w-3/4 mb-4 font-bold font-poppins lg:ml-72">
            DIPLOMADOS EN INGENIERÍA AMBIENTAL
        </div>
          <div className='mb-20 lg:mb-10'>
            <DiploAmbiental />
          </div>
          <div id='alimentarias' className="flex text-primaryblue text-center text-3xl  lg:text-5xl xl:text-5xl lg:w-3/4 mb-4 font-bold font-poppins lg:ml-72">
            DIPLOMADOS EN INGENIERÍA AGRÓNOMA
        </div>
          <div className='mb-20 lg:mb-10'>
            <DiploAlimentarias />
          </div>
          <div id='agronoma' className="flex text-primaryblue text-center text-3xl  lg:text-5xl xl:text-5xl lg:w-3/4 mb-4 font-bold font-poppins lg:ml-72">
            DIPLOMADOS EN INGENIERÍA ALIMENTOS
        </div>
          <div className='mb-20 lg:mb-10'>
            <DiploAgronoma />
          </div>
        <div id='derecho' className="ml-15flex text-primaryblue text-center text-3xl  lg:text-5xl xl:text-5xl lg:w-3/4 mb-4 font-bold font-poppins lg:ml-72">
            DIPLOMADOS EN DERECHO
        </div>
          <div className='mb-20 lg:mb-10'>
            <DiploDerecho />
          </div>
          
      </div>
{/*       <Whatsapp />
 */}    </section>
  )
}

export default Graduate;