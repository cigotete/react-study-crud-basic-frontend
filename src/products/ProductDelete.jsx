import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export const ProductDelete = () => {
  const url = 'http://backend-products-for-react-frontend.test';
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [message, setMessage] = useState({});

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const respuesta = await axios.get(`${url}?id=${id}`);
      console.log('respuesta data:', respuesta.data);
      setProduct(respuesta.data);
    } catch (error) {
      console.error('Error al obtener el producto:', error);
    }
  }

  const handleSubmit = async () => {
    try {
      const respuesta = await axios({
        method: 'DELETE',
        url: url,
        data:{id:id}
      });
      console.log('respuesta delete:', respuesta.data);
      setMessage(respuesta.data);
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  return (
    <>
      <div>
        <h1>Borrar Producto</h1>
        {message.length > 0 ?
        <h2>
          Producto eliminado.
          <br />
          <Link to={`/`}>
            <button>Regresar</button>
          </Link>
        </h2>
        :
        <div>
          <ul>
            {product.map( (product,i)=>(
              <div key={ product.id }>
              <li>ID: { product.id } </li>
              <li>Nombre { product.name }</li>
              <li>Descripción: { product.description }</li>
              <li>Precio: ${ new Intl.NumberFormat('es-co').format(product.price) }</li>
              </div>
            ))
            }
          </ul>
          <button onClick={handleSubmit}>Eliminar</button>
        </div>
      }
      </div>
    </>
  );
}