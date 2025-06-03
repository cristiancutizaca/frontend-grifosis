'use client';
import Curso from "./diplomadosAccordion";
import Image from 'next/image';


const DiploAlimentarias = () => {


    // Array de objetos que contienen los datos de cada curso
    const cursosData = [
        {
            area: 'INGENIERÍA EN ALIMENTOS',
            titulo: 'Gestión de la calidad e inocuidad alimentaria',
            imagen: '/image/diplomados/inocuidad.webp',
            fechaInicio: 'proximamente',
            modalidad: 'Virtual',
            duracion: '4 meses',
            horas: '420 horas correspondientes a 26 créditos.',
            descripcion: 'Bachilleres, titulados y profesionales de las carreras de ingeniería de industria alimentarias, agroindustriales, agrónomos, biólogos y carreras afines a la calidad e inocuidad, jefes, supervisores y personal técnico involucrado en actividades relacionadas con alguna etapa de la cadena alimentaria: producción primaria, transporte, almacenamiento y elaboración.',
            modulos: [
                'Análisis de peligros y puntos críticos de control (HACCP)',
                'Esquema FSSC 22000',
                'Fundamentos e Interpretación de los Sistemas de Gestión de la Calidad ISO 9001',
                'Inspección y muestreo de alimentos',
                'Trazabilidad y etiquetado',
                'Implementación del Protocolo GLOBALGAP VERSIÓN 5.2. 2020 – 1',
                'Auditoría de sistemas integrados de gestión de la calidad e inocuidad alimentaria',
                'Calidad e Inocuidad alimentaria',
                'Higiene, Saneamiento y control de plagas en la industria alimentaria',
                'Interpretación e implementación de la norma ISO 31000 -Gestión de Riesgos',
                'Programas Pre-requisitos con base en ISO 22002-1 y BRC v.09',
                
            ]
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

export default DiploAlimentarias;

