import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Layout } from '../layout/layout';
import { Typography, Button, Form, Input, Card, Space } from 'antd';

const { Title } = Typography;

export const ProductEdit = () => {
  const url= import.meta.env.VITE_CRUD_API_URL;
  const crudApiKey = import.meta.env.VITE_CRUD_API_KEY;
  const { id } = useParams();
  const [message, setMessage] = useState({});
  const [form] = Form.useForm();
  const [uuid, setUuid] = useState('');

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
      setUuid(responseData._uuid);
      form.setFieldsValue({
        name: responseData.name,
        description: responseData.description,
        price: responseData.price,
      });
      }
    } catch (error) {
      console.error('Error al obtener el producto:', error);
    }
  }

  const handleSubmit = async () => {
    try {
      const allFieldValues = form.getFieldsValue();
      if (uuid == id) {
        const respuesta = await axios({
          method: 'PUT',
          url: url,
          data:[{
            id:id,
            name:allFieldValues.name.trim(),
            description: allFieldValues.description.trim(),
            price:allFieldValues.price,
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
      }
    } catch (error) {
      console.error('Error al editar el producto:', error);
    }
  };

  return (
    <Layout>
    <div>
    <Title level={2}>Editar Producto</Title>
      {message.length > 0 ?
        <Card title="Producto editado">
          <Link to={`/`}>
            <Button>Regresar</Button>
          </Link>
        </Card>
      :
      <Card>
        <Form
        form={form}
        onFinish={handleSubmit}
        >
          <Space
          direction="vertical"
          size="small"
          style={{ width: '100%' }}
          >
          <Card>
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
            <Input
            />
          </Form.Item>
          </Card>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          </Space>
        </Form>
      </Card>
      }
    </div>
    </Layout>
  );
}