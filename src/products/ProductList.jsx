import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Layout } from '../layout/layout';
import { Typography, Table, Button, Space } from 'antd';

const { Title } = Typography;
const columns = [
  {
    title: 'Id',
    dataIndex: '_uuid',
    key: '_uuid',
    hidden: true,
  },
  {
    title: 'Product',
    dataIndex: 'name',
    key: '_uuid',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: '_uuid',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: '_uuid',
    render: (text, record) => (
      <span>
        ${new Intl.NumberFormat('es-co').format(record.price)}
      </span>
    ),
  },
  {
    title: 'Edit',
    key: '_uuid',
    render: (text, record) => (
      <span>
        <Link to={`/edit/${record._uuid}`}>
          <Button>Edit</Button>
        </Link>
      </span>
    ),
  },
  {
    title: 'Delete',
    key: '_uuid',
    render: (text, record) => (
      <span>
        <Link to={`/delete/${record._uuid}`}>
          <Button>Delete</Button>
        </Link>
      </span>
    ),
  },
].filter(item => !item.hidden);

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
      console.log('respuesta data:', respuesta.data.items);
    } catch (error) {
      // Manejo de errores
      console.error("Error al obtener productos:", error);
    }
  }

  return (
    <Layout>
      <Title level={2}>Lista de Productos</Title>
      <Space direction="vertical" size="small">
        <Link to={`/create`}>
          <Button>Añadir</Button>
        </Link>
      <Table
        columns={columns}
        dataSource={products.map((record) => ({ ...record, key: record._uuid }))}
      />
      </Space>
    </Layout>
  );
}
