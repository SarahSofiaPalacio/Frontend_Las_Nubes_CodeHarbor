// PromotersSection.js
import React from 'react';

function PromotersSection() {
  // Asumiendo que tienes un array de imágenes de los promotores
  const promoters = [
    { src: `${process.env.PUBLIC_URL}/img/promoters_cruz_verde.svg`, alt: 'Cruz Verde' },
    { src: `${process.env.PUBLIC_URL}/img/promoters_colsubsidio.svg`, alt: 'Colsubsidio' },
    { src: `${process.env.PUBLIC_URL}/img/promoters_farmatodo.svg`, alt: 'Farmatodo' },
    { src: `${process.env.PUBLIC_URL}/img/promoters_coopidrogas.svg`, alt: 'Coopidrogas' },
    { src: `${process.env.PUBLIC_URL}/img/promoters_cafam.svg`, alt: 'Cafam' },
    { src: `${process.env.PUBLIC_URL}/img/promoters_colsanitas.svg`, alt: 'Colsanitas' }
  ];

return (
  <section className="bg-light shadow" id="promotores">
    <div className="container py-3">
      <div className="row">
        {promoters.map((promoter, index) => (
          <div className="col-2 col-lg-2 d-flex justify-content-center align-items-center" key={index}>
            <img src={promoter.src} alt={promoter.alt} className="img-fluid" />
          </div>
        ))}
      </div>
    </div>
  </section>
);
}

export default PromotersSection;
