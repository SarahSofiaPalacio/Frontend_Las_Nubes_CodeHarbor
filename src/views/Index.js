import React from 'react';
import Navbar from '../components/index/Navbar';
import Welcome from '../components/index/Welcome';
import Promoters from '../components/index/Promoters';

function Index() {
    return (
        <>
            <Navbar />
            <main style={{ marginTop: '75px' }} role="main">
                <Welcome />
                <Promoters />
                {/* Otros componentes de sección irían aquí */}
            </main>
        </>
    );
}

export default Index;
