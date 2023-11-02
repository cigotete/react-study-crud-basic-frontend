import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const ProductList = () => {
  const url='http://backend-products-for-react-frontend.test';
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const respuesta = await axios.get(url);
    setProducts(respuesta.data);
  }

  return (
    <div>
      <h1>Lista de Productos</h1>
      <div>
      <Link to={`/create`}>
          <button>Añadir</button>
        </Link>
      </div>
      <div className='table-responsive'>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>#</th>
              <th>PRODUCTO</th>
              <th>DESCRIPCION</th>
              <th>PRECIO</th>
              <th></th>
              </tr>
          </thead>
          <tbody className='table-group-divider'>
            {products.map( (product,i)=>(
              <tr key={product.id}>
                <td>{(i+1)}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${new Intl.NumberFormat('es-co').format(product.price)}</td>
                <td>
                  <Link to={`/edit/${product.id}`}>
                    <button>Editar</button>
                  </Link>
                    &nbsp; 
                    <Link to={`/delete/${product.id}`}>
                    <button>Borrar</button>
                  </Link>
                </td>
              </tr>
            ))
            }
          </tbody>
        </table>
    </div>
    </div>
  );
}
