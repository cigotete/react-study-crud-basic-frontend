import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const ProductCreate = () => {
  const url = 'http://backend-products-for-react-frontend.test';
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState({});

  const handleSubmit = async () => {
    try {
      const respuesta = await axios({
        method: 'POST',
        url: url,
        data:{
          name:name.trim(),
          description: description.trim(),
          price:price
        }
      });
      console.log('respuesta create:', respuesta.data);
      setMessage(respuesta.data);
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  };

  return (
    <div>
      <h1>Crear Producto</h1>
      {message.length > 0 ?
        <h2>
          Producto creado.
          <br />
          <Link to={`/`}>
            <button>Regresar</button>
          </Link>
        </h2>
      :
      <div>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <button onClick={handleSubmit}>Crear</button>
      </div>
      }
    </div>
  );
}
