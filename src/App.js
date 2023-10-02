import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<ListPage />} />
          <Route path='pokemon/:id' element={<DetailPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
