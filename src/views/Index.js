import React from 'react';
import Navbar from '../components/index/Navbar';
import WelcomeSection from '../components/index/WelcomeSection';
import PromotersSection from '../components/index/PromotersSection';

function Index() {
    return (
        <>
            <Navbar />
            <main style={{ marginTop: '75px' }} role="main">
                <WelcomeSection />
                <PromotersSection />
                {/* Otros componentes de sección irían aquí */}
            </main>
        </>
    );
}

export default Index;
