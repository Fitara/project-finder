import React, { useState } from "react";
import { Layout, Button, Modal, Form, Input, Typography, Select } from "antd";
import {
  UserOutlined,
  MailOutlined,
  DollarCircleOutlined,
  GithubOutlined,
  LinkedinOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import "../index.css";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const Display: React.FC = () => {
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [subscriptionEmail, setSubscriptionEmail] = useState("");
  const [donationAmount, setDonationAmount] = useState("10");

  const showLoginModal = () => {
    setLoginModalVisible(true);
  };

  const handleLoginCancel = () => {
    setLoginModalVisible(false);
  };

  return (
    <Layout>
      <Header className="header">
        <div className="header-left">
          <Title level={3} className="project-title">
            Project Finder™
          </Title>
          <Button type="text" size="large" className="button-header">
            Resources
          </Button>
          <Button type="text" size="large" className="button-header">
            About Us
          </Button>
        </div>
        <div className="header-right">
          <Button
            type="text"
            icon={<UserOutlined />}
            size="large"
            className="login-button"
            onClick={showLoginModal}
          >
            Login
          </Button>
        </div>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Layout style={{ padding: "24px 0" }}>
          <Outlet />
        </Layout>
      </Content>
      <Footer className="footer">
        <div className="footer-container">
          <div className="subscribe">
            <Text strong className="subscribe-title">
              Join the Newsletter
            </Text>
            <p className="subscribe-intro">
              Stay up to date with new feature releases!
            </p>
            <div className="subscribe-container">
              <MailOutlined className={"mail-icon"} />
              <Input
                placeholder="Enter your email to subscribe"
                value={subscriptionEmail}
                spellCheck="false"
                onChange={(e) => setSubscriptionEmail(e.target.value)}
                className="subscribe-input"
                size="middle"
              />
              <Button type="text" size="middle" className="subscribe-button">
                Subscribe
              </Button>
            </div>
            <p className="subscribe-finish">
              We won't send you spam. Unsubscribe at any time.
            </p>
          </div>
          <div className="donate">
            <Text className="donate-title" strong>
              Donate
            </Text>
            <p className="donate-intro">
              Support our project with your contribution
            </p>
            <div className="donate-container">
              <DollarCircleOutlined className={"donate-icon"} />
              <Select
                value={donationAmount}
                onChange={(value) => setDonationAmount(value)}
                className="donate-input"
              >
                <Option value="10">$ 10.00</Option>
                <Option value="15">$ 15.00/month</Option>
                <Option value="100">$ 100.00/year</Option>
              </Select>
              <Button type="text" size="middle" className="donate-button">
                Donate
              </Button>
            </div>
            <p className="donate-finish">Thank you for your support!</p>
          </div>
        </div>
        <div className="footer-splitter">
          <div className="footer-trademark">
            <Title level={4} className="footer-project-title">
              Project Finder™
            </Title>
            <Text className="created">
              GitHub Project ©2023 Created by Fitara
            </Text>
          </div>
          <div className="footer-icon-container">
            <Text className="connect-text">
              Connect with us
            </Text>
            <div className="footer-icons">
              <a href="https://github.com/Fitara">
                <GithubOutlined className="footer-icon" />
              </a>
              <a href="https://www.linkedin.com/in/fitra11">
                <LinkedinOutlined className="footer-icon" />
              </a>
              <a href="https://wa.me/081226336116">
                <WhatsAppOutlined className="footer-icon" />
              </a>
            </div>
          </div>
        </div>
      </Footer>
      <Modal
        title="Login"
        open={isLoginModalVisible}
        onCancel={handleLoginCancel}
        footer={null}
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={(values) => {
            console.log("Received values:", values);
          }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input spellCheck="false" className="login-input" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password spellCheck="false" className="login-input" />
          </Form.Item>

          <Form.Item style={{ textAlign: "center" }}>
            <Button type="default" htmlType="submit" className="login-button">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Display;
