import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Layout } from '../layout/layout';
import { Typography, Button, Form, Input } from 'antd';

const { Title } = Typography;

export const ProductCreate = () => {
  const url= import.meta.env.VITE_CRUD_API_URL;
  const crudApiKey = import.meta.env.VITE_CRUD_API_KEY;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState({});

  const handleSubmit = async () => {
    try {
      const respuesta = await axios({
        method: 'POST',
        url: url,
        data:[{
          name:name.trim(),
          description: description.trim(),
          price:price,
        }],
        headers: {
          'Authorization': `Bearer ${crudApiKey}`
        }
      });
      console.log('respuesta create:', respuesta.data.items);
      if (respuesta.data.items[0]) {
        setMessage('200');
      }
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  };

  return (
    <Layout>
    <div>
    <Title level={2}>Crear Producto</Title>
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
        <Form
        onFinish={handleSubmit}
        >
          <Form.Item
            label="Nombre"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input product name!',
              },
            ]}
          >
            <Input
            onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Descripción"
            name="description"
            rules={[
              {
                required: true,
                message: 'Please input product description!',
              },
            ]}
          >
            <Input
            onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Precio"
            name="price"
            rules={[
              {
                required: true,
                message: 'Please input product price!',
              },
            ]}
          >
            <Input onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      }
    </div>
    </Layout>
  );
}
