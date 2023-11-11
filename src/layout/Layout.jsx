import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Layout as AntLayout,
  Typography,
  ConfigProvider,
  ColorPicker,
  Flex,
  Space
  } from 'antd';

const { Header, Content, Footer } = AntLayout;
const { Title, Text } = Typography;

export const Layout = ({ children }) => {
  const [primaryBgComp, setPrimaryBgComp] = useState('#FFFFFF ');
  const [primaryText, setPrimaryText] = useState('#000000');
  const [backgroundLayout, setBackgroundLayout] = useState('#EFEFEF');
  const [backgroundLayoutHeader, setBackgroundLayoutHeader] = useState('#505ADE');

  return (
    <>
    <Flex horizontal>
      <Space>
      <Text>BG comp</Text>
      <ColorPicker showText value={primaryBgComp} onChangeComplete={(color) => setPrimaryBgComp(color.toHexString())} />
      <Text>Text</Text>
      <ColorPicker showText value={primaryText} onChangeComplete={(color) => setPrimaryText(color.toHexString())} />
      <Text>BG layout</Text>
      <ColorPicker showText value={backgroundLayout} onChangeComplete={(color) => setBackgroundLayout(color.toHexString())} />
      <Text>BG Layout Header</Text>
      <ColorPicker showText value={backgroundLayoutHeader} onChangeComplete={(color) => setBackgroundLayoutHeader(color.toHexString())} />
      </Space>
    </Flex>
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: primaryBgComp,
          colorTextBase: primaryText,
          colorBgLayout: backgroundLayout,
          borderRadius: '0px',
        },
        components: {
          Layout: {
            colorBgHeader: backgroundLayoutHeader,
          },
        },
        //algorithm: theme.darkAlgorithm,
      }}
    >
      <AntLayout className="layout" style={{ marginTop: '10px'}}>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <Title type='primary'>Products CRUD</Title>
        </Header>

        <Content style={{ margin: '16px' }}>{children}</Content>

        <Footer><Text>&copy; 2023 text footer here</Text></Footer>
      </AntLayout>
    </ConfigProvider>
    </>

  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};