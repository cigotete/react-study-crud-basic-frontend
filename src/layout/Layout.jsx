import PropTypes from 'prop-types';
import {Layout as AntLayout, Typography } from 'antd';

const { Header, Content, Footer } = AntLayout;
const { Title, Text } = Typography;

export const Layout = ({ children }) => {
  return (
    <AntLayout className="layout">
      {/* <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Title type='secondary'>Product CRUD</Title>
      </Header> */}

      <Content>{children}</Content>

      <Footer><Text>&copy; 2023 Footer</Text></Footer>
    </AntLayout>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};