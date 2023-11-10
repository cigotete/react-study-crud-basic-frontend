import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ProductList } from './products/ProductList';
import { ProductCreate } from './products/ProductCreate';
import { ProductEdit } from './products/ProductEdit';
import { ProductDelete } from './products/ProductDelete';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create" element={ <ProductCreate /> } />
        <Route path="/edit/:id" element={ <ProductEdit />} />
        <Route path="/delete/:id" element={ <ProductDelete />} />
        <Route path="/" element={ <ProductList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
