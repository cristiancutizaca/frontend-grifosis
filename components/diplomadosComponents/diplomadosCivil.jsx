"use client"; // Si estás utilizando Next.js, esta línea se asegura de que este componente se renderice en el cliente.
import Curso from "./diplomadosAccordion";
import Image from 'next/image';

const DiploCivil = () => {
  // Array de objetos que contienen los datos de cada curso
  const cursosData = [

    {
      area: "INGENIERÍA CIVIL",
      titulo: "Ingeniería Vial",
      imagen: "/image/test1.webp",
      fechaInicio: "próximamente",
      modalidad: "Virtual",
      duracion: "4 meses",
      horas: "420 horas académicas (26 créditos)",
      descripcion:
        "Bachilleres, Gerentes y administradores de proyectos de la construcción y jefes de área. Ingenieros civiles, topógrafos, arquitectos residentes y supervisores de obras. Profesionales del sector público y privado relacionados con proyectos viales.",
      modulos: [
        "Estructuras en carreteras - puentes",
        "Metrados, costos y presupuesto - cronograma en obras viales",
        "Arqueología en proyectos viales",
        "Estudios ambientales en proyectos viales",
        "Diseño, construcción y mantenimiento de túneles",
        "Tráfico y carga en proyectos viales.",
        "Topografía, diseño geométrico, señalización y seguridad vial",
        "Geología - Geotecnia en obras viales",
        "Mecánica de suelos en carretera",
        "Suelos y pavimentos en proyectos viales",
        "Hidrología e hidráulica",
        "Integración de proyectos de infraestructura vial",
      ],
    },

    {
      area: "INGENIERÍA CIVIL",
      titulo: "Residencia y supervisión de obras",
      imagen: "/image/diplomados/dip/Residencia.webp",
      fechaInicio: "próximamente",
      modalidad: "Virtual",
      duracion: "4 meses",
      horas: "420 horas académicas (26 créditos)",
      descripcion:
        "Gerente de proyectos relacionados a construcción, supervisor de obras, consultores en servicios de ingeniería, ingenieros, arquitectos, topógrafos, bachilleres de la especialidad de ingeniería civil, y/o especialistas afines. Profesionales del sector público y privado relacionados con proyectos de obras civiles.",
      modulos: [
        "Ampliaciones de plazo, adicionales de obra y penalidades en obra",
        "Recepción - liquidación de obras y medios de solución de controversia",
        "Expediente técnico como herramienta para la ejecución y supervisión de obra",
        "Valorización y liquidación de obras administración directa",
        "Plan de gestión de seguridad y salud en obra",
        "Contratación y ejecución de obras",
        "Preliminares para inicio de obra",
        "Metrados y valorizaciones de obra",
        "Planeamiento y programación de obras",
        "Informes de obra",
        "Control técnico y calidad en obras",
      ],
    },
    
    {
      area: "INGENIERÍA CIVIL",
      titulo: "Ingeniería de Puentes",
      imagen: "/image/diplomados/dip/Puentes.webp",
      fechaInicio: "próximamente",
      modalidad: "Virtual",
      duracion: "4 meses",
      horas: "420 horas académicas (26 créditos)",
      descripcion:
        "Bachilleres, Gerentes y administradores de proyectos y jefes de área. Ingenieros civiles, ingenieros estructurales, arquitectos residentes y supervisores de obras. Profesionales del sector público y privado relacionados con proyectos viales.",
      modulos: [
        "Diseño de puentes, pontones",
        "Estudios de Hidrología e hidráulica en puentes",
        "Estudios geológicos y geotécnicos en puentes",
        "Diseño y modelamiento de puentes con SAP 2000",
        "Diseño y modelamiento de puentes con CSI Bridge",
        "Modelamiento y análisis estructural de puentes",
        "Diseño sísmico en puentes AASHTO-LRFD",
        "Mantenimiento y conservación de puentes",
        "Inspección, evaluación de puentes bajo la metodología SCAP",
      ],
    },

    {
      area: "INGENIERÍA CIVIL",
      titulo: "Asistente Técnico en Obras",
      imagen: "/image/diplomados/dip/tec-obras.webp",
      fechaInicio: "próximamente",
      modalidad: "Virtual",
      duracion: "4 meses",
      horas: "420 horas correspondientes a 26 créditos.",
      descripcion:
        "Bachilleres, titulados y profesionales de las carreras de ingeniería civil, industriales, sanitarios, arquitectos y ramas afines.",
      modulos: [
        "Cuaderno de obra físico y digital",
        "Costos y Presupuestos con S10",
        "Valorización de obras",
        "Liquidación de obras",
        "Formulación y planificación de proyectos con MS Project",
        "Análisis y diseño de instituciones educativas",
        "Seguridad, salud ocupacional y medio ambiente en obras públicas",
        "Expediente técnico en obras",
        "Régimen laboral en construcción civil",
        "Planificación y programación de obras",
        "Control de obras",
        "Metrados en edificaciones",
      ],
    },
    
  ];

  return (
    <div>
      {cursosData.map((curso, index) => (
        <Curso key={index} curso={curso} />
      ))}
    </div>
  );
};

export default DiploCivil;