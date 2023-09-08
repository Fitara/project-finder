import React, { useEffect, useState } from 'react';
import { LeftOutlined } from '@ant-design/icons'
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import { Button, Typography, Spin} from 'antd';

const { Text } = Typography;

interface Project {
  id: number;
  name: string;
  description: string;
  readmeContent: string;
}

const ProjectDetail: React.FC = () => {
  const [project, setProject] = useState<Project | null>(null);
  const { username, projectName } = useParams()

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${username}/${projectName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch project details');
        }
        const data: Project = await response.json();

        const readmeResponse = await fetch(`https://api.github.com/repos/${username}/${projectName}/readme`);
        if (readmeResponse.ok) {
          const readmeData = await readmeResponse.json();
          const readmeContentBase64 = readmeData.content;
          const readmeContent = atob(readmeContentBase64);
          data.readmeContent = readmeContent;
        } else {
          data.readmeContent = 'README.md not found.';
        }

        setProject(data);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetails();
  }, [username, projectName]);

  if (!project) {
    return <Spin className="spin-loading" size="large" />;
  }

  return (
    <>
      <Link to="/">
        <Button style={{fontWeight: 600}} type="text" icon={<LeftOutlined />}>
          Back to Home
        </Button>
      </Link>
      <div className='project-detail'>
        <div className='detail-container'>
          <Text className='detail-project'><span className='detail-project-span'>Project :</span>{project.name}</Text>
          <Text className='detail-description'><span className='detail-description-span'>Description :</span>{project.description}</Text>
          <Text className='detail-readme-title'>README.md</Text>
          <ReactMarkdown className='detail-readme'>{project.readmeContent}</ReactMarkdown>
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
