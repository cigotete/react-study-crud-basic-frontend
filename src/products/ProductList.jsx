import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Layout } from '../layout/layout';
import { Typography } from 'antd';

const { Title } = Typography;

export const ProductList = () => {
  const url= import.meta.env.VITE_CRUD_API_URL;
  const crudApiKey = import.meta.env.VITE_CRUD_API_KEY;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const respuesta = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${crudApiKey}`
        }
      });
      setProducts(respuesta.data.items);
    } catch (error) {
      // Manejo de errores
      console.error("Error al obtener productos:", error);
    }
  }

  return (
    <Layout>
    <div>
      <Title level={2}>Lista de Productos</Title>
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
              <tr key={product._uuid}>
                <td>{(i+1)}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${new Intl.NumberFormat('es-co').format(product.price)}</td>
                <td>
                  <Link to={`/edit/${product._uuid}`}>
                    <button>Editar</button>
                  </Link>
                    &nbsp; 
                    <Link to={`/delete/${product._uuid}`}>
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
    </Layout>
  );
}
