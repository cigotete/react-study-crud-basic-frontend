import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Layout } from '../layout/layout';

export const ProductEdit = () => {
  const url= import.meta.env.VITE_CRUD_API_URL;
  const crudApiKey = import.meta.env.VITE_CRUD_API_KEY;
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState({});

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const respuesta = await axios.get(`${url}/${id}`, {
        headers: {
          Authorization: `Bearer ${crudApiKey}`
        }
      });
      console.log('respuesta data:', respuesta.data);
      if (respuesta.data._uuid === id) {
      const responseData = respuesta.data;
      setName(responseData.name);
      setDescription(responseData.description);
      setPrice(responseData.price);
      }
    } catch (error) {
      console.error('Error al obtener el producto:', error);
    }
  }

  const handleSubmit = async () => {
    try {
      const respuesta = await axios({
        method: 'PUT',
        url: url,
        data:[{
          id:id,
          name:name.trim(),
          description: description.trim(),
          price:price,
          _uuid:id
        }],
        headers: {
          'Authorization': `Bearer ${crudApiKey}`
        }
      });
      console.log('respuesta edit:', respuesta.data.items);
      if (respuesta.data.items[0]._uuid == id) {
        setMessage('200');
      }
    } catch (error) {
      console.error('Error al editar el producto:', error);
    }
  };

  return (
    <Layout>
    <div>
      <h1>Editar Producto</h1>
      {message.length > 0 ?
        <h2>
          Producto editado.
          <br />
          <Link to={`/`}>
            <button>Regresar</button>
          </Link>
        </h2>
      :
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <button onClick={handleSubmit}>Guardar Cambios</button>
      </div>
      }
    </div>
    </Layout>
  );
}