"use client";
import Curso from "./diplomadosAccordion";
import Image from 'next/image';

const DiploDerecho = () => {
  // Array de objetos que contienen los datos de cada curso
  const cursosData = [
    {
      area: "DERECHO",
      titulo: "PERITO FORENSE Y CRIMINALÍSTICO",
      imagen: "/image/diplomados/dip/perito-forense.webp",
      fechaInicio: "próximamente",
      modalidad: "Virtual",
      duracion: "4 meses",
      horas: "420 horas correspondientes a 26 créditos.",
      descripcion:
        "Bachilleres y estudiantes universitarios y técnicos de los últimos ciclos de Psicología, medicina, tecnología médica, abogados; efectivos de las Fuerzas Armadas y la Policía Nacional del Perú; así como profesionales que ejercen la labor pericial, ya sea oficialmente o de manera particular.",
      modulos: [
        "Psicopatología de la violencia y perfiles criminales",
        "Criminalística y ciencias forenses en el proceso penal",
        "Medicina forense y autopsia médico legal",
        "Escena del crimen, cadena de custodia, metodología para indicios y evidencia ",
        "Grafotecnia",
        "Documentoscopia",
        "Dactiloscopia forense",
        "Balística forense",
        "Técnicas de laboratorio forense",
      ],
    },
    // Puedes agregar más cursos aquí si es necesario
  ];

  return (
    <div>
      {cursosData.map((curso, index) => (
        <Curso key={index} curso={curso} />
      ))}
    </div>
  );
};

export default DiploDerecho;
