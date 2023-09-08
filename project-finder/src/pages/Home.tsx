import { useState } from "react";
import { Layout, Input, Typography, Button, Spin } from "antd";
import {
  GithubOutlined,
  LinkedinOutlined,
  WhatsAppOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ProjectCard from "../components/Card";
import { fetchUserFromAPI, fetchUserProjects } from "../utils/api";
import { toast } from 'react-toastify'


const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

interface Project {
  id: number;
  name: string;
  description: string;
  language: string;
  updated_at: string;
}

const title: string = "GitHub Project Finder";
const text: string = "Search for a GitHub user and view their projects";
const description: string = `GitHub Project Finder simplifies your GitHub project exploration, making it effortless to discover and collaborate with GitHub users and their projects, all conveniently located in a single, user-friendly platform.`;

const Home = () => {
  const [username, setUsername] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  
  const handleSearch = async () => {
    console.log('Start handleSearch');

    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      toast.error('Username is required.');
      return;
    }

  setLoading(true);

  try {
    const userData = await fetchUserFromAPI(trimmedUsername);

    if (!userData) {
        toast.error('User not found.');
        setLoading(false);
      return;
    }

    const userProjects = await fetchUserProjects(trimmedUsername);

    if (userProjects.length === 0) {
        toast.info('No projects found for this user.');
    } else {
        toast.success('Projects found.');
    }

    console.log('User projects:', userProjects);
        setProjects(userProjects);

        setLoading(false);
    } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
        toast.error('An unexpected error occurred.');
    }
  };

  return (
    <Layout>
      <div className="main-page">
        <Title>{title}</Title>
        <Text>{text}</Text>
        <div className="social-icons">
          <Button
            type="link"
            icon={<GithubOutlined style={{fontSize: '24px'}} />}
            size="large"
            className="social-icon"
            href="https://github.com/Fitara"
            style={{borderRadius: '50%'}}
          />
          <Button
            type="link"
            icon={<LinkedinOutlined style={{fontSize: '24px'}} />}
            size="large"
            className="social-icon"
            href="https://www.linkedin.com/in/fitra11/"
            style={{borderRadius: '50%'}}
          />
          <Button
            type="link"
            icon={<WhatsAppOutlined style={{fontSize: '24px'}} />}
            size="large"
            className="social-icon"
            href="https://wa.me/081226336116"
            style={{borderRadius: '50%'}}
          />
        </div>
        <Paragraph className="paragraph">{description}</Paragraph>
        <Input
          className="search"
          placeholder="Enter a Github username"
          prefix={<UserOutlined />}
          spellCheck="false"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          size="large"
          suffix={
            <Button
              type="text"
              icon={<SearchOutlined />}
              onClick={handleSearch}
              loading={loading}
            />
          }
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSearch()
          }}
        />
        <Content className="content-style">
          {loading ? (
            <Spin className="spin-loading" size="large" />
          ) : (
            <div className="content-container">
                {projects.map((project: Project) => (
                    <ProjectCard key={project.id} project={project} username={username} />
              ))}
            </div>
          )}
        </Content>
      </div>
    </Layout>
  );
};

export default Home;
