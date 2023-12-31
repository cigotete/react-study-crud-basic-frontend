import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Layout } from '../layout/Layout';
import { Typography, Card, Button, Space } from 'antd';

const { Title } = Typography;

export const ProductDelete = () => {
  const url= import.meta.env.VITE_CRUD_API_URL;
  const crudApiKey = import.meta.env.VITE_CRUD_API_KEY;
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [message, setMessage] = useState({});

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const respuesta = await axios.get(`${url}/${id}`, {
        data:[
          {
          _uuid:id,
          }
        ],
        headers: {
          Authorization: `Bearer ${crudApiKey}`
        }
      });
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
        data:[
          {
            _uuid:id
          }
        ],
        headers: {
          'Authorization': `Bearer ${crudApiKey}`
        }
      });
      console.log('respuesta delete:', respuesta.data);
      if (respuesta.data.items[0]) {
        setMessage('200');
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  return (
    <>
    <Layout>
      <div>
      <Title level={2}>Borrar Producto</Title>
        {message.length > 0 ?
        <Card title="Producto eliminado">
          <Link to={`/`}>
            <Button type='primary'>Regresar</Button>
          </Link>
        </Card>
        :
        <Card title={product.name}>
          <Space direction="vertical" size="small">
            <Card key={ product._uuid }>
            <li>Nombre: { product.name }</li>
            <li>Descripción: { product.description }</li>
            <li>Precio: ${ new Intl.NumberFormat('es-co').format(product.price) }</li>
            </Card>
            <Space direction='horizontal'>
            <Button onClick={handleSubmit} type="primary" danger htmlType="submit">
              Eliminar
            </Button>
            <Link to={`/`}>
              Cancelar
            </Link>
            </Space>
          </Space>
        </Card>
      }
      </div>
      </Layout>
    </>
  );
}