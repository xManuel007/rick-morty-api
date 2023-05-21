import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Card from '../../components/card';
import CardDetails from '../../components/cardDetails';

const MainPage: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Card />} />
        <Route path="/details/:id" element={<CardDetails />} />
      </Routes>
    </Router>
  );
};

export default MainPage;
