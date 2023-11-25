import React from 'react';

function Home() {
  return (
    <div className="row justify-content-center align-items-center" style={{height: '80vh'}}>
      <div className="col-12 text-center">
        <img src={`${process.env.PUBLIC_URL}/img/home.svg`} alt="Imagen de inicio" width="300" style={{opacity: 0.5}}/>
      </div>
    </div>
  );
}

export default Home;