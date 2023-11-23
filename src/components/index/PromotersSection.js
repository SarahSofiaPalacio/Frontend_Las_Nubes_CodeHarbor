// PromotersSection.js
import React from 'react';

function PromotersSection() {
  // Asumiendo que tienes un array de imágenes de los promotores
  const promoters = [
    { src: 'img/promoters_cruz_verde.png', alt: 'Cruz Verde' },
    { src: 'img/promoters_colsubsidio.png', alt: 'Colsubsidio' },
    { src: 'img/promoters_farmatodo.png', alt: 'Farmatodo' },
    { src: 'img/promoters_coopidrogas.png', alt: 'Coopidrogas' },
    { src: 'img/promoters_cafam.png', alt: 'Cafam' },
    { src: 'img/promoters_colsanitas.png', alt: 'Colsanitas' }
  ];

return (
  <section className="bg-light" id="promotores">
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
