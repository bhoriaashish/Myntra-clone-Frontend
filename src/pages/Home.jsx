import React from 'react';
import Navbar from '../components/Navbar';
import ProductList from '../features/products/ProductList';
// import SearchBar from '../components/SearchBar';
// import BannerSlider from '../components/BannerSlider';
// import OffersSection from '../components/OffersSection';
// import FloatingRibbon from '../components/FloatingRibbon';

const Home = () => {
  return (
    <div>
      <Navbar/>
      <div>
        <ProductList/>
      {/* <img src="https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/> */}
      </div>
      {/* <SearchBar />
      <BannerSlider />
      <OffersSection />
      <FloatingRibbon /> */}
    </div>
    
  );
};

export default Home;
