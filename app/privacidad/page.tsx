import type { Metadata } from 'next'
import { site } from '@/content/site'

export const metadata: Metadata = {
  title: 'Aviso de privacidad',
  description: 'Aviso de privacidad de LAND, arquitectura de paisaje en San Pedro Garza García.',
  alternates: { canonical: '/privacidad' },
}

/**
 * Aviso de privacidad conforme a la LFPDPPP. Los datos entre corchetes y resaltados
 * deben confirmarse con LAND (razón social o nombre del responsable) antes de publicar.
 */
export default function PrivacyPage() {
  const a = site.address
  return (
    <article className="doc grid container">
      <div className="col-12">
        <h1>Aviso de privacidad</h1>
        <p className="doc__meta">Última actualización: septiembre de 2026</p>
      </div>
      <div className="col-8 doc__body">
        <h2>Responsable</h2>
        <p>
          <mark className="pending">[Razón social o nombre del responsable]</mark>, en adelante LAND, con domicilio en {a.street}, {a.neighborhood},
          C.P. {a.postalCode}, {a.city}, {a.region}, México, es responsable del tratamiento de los datos personales que usted proporcione,
          conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.
        </p>
        <h2>Datos que recabamos</h2>
        <p>
          Al escribirnos por correo electrónico o teléfono podemos recabar su nombre, correo electrónico, número telefónico, dirección del
          predio o proyecto y la información que decida compartir sobre su terreno u obra. Este sitio no utiliza formularios de captura ni
          cookies de seguimiento.
        </p>
        <h2>Finalidades</h2>
        <ul>
          <li>Atender su solicitud de información o cotización.</li>
          <li>Elaborar propuestas de diseño y obra de paisaje.</li>
          <li>Dar seguimiento a la relación profesional durante el proyecto.</li>
        </ul>
        <p>No transferimos sus datos a terceros salvo obligación legal o cuando sea necesario para ejecutar un proyecto contratado, en cuyo caso se lo informaremos.</p>
        <h2>Derechos ARCO</h2>
        <p>
          Puede acceder, rectificar, cancelar u oponerse al tratamiento de sus datos, así como revocar su consentimiento, escribiendo a{' '}
          <a href={`mailto:${site.email}`}>{site.email}</a> con el asunto «Datos personales». Responderemos en un plazo máximo de veinte días hábiles.
        </p>
        <h2>Cambios al aviso</h2>
        <p>Cualquier modificación a este aviso se publicará en esta misma página con la fecha de actualización.</p>
      </div>
    </article>
  )
}
