import React from "react";
import { Card, Button, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return date.toLocaleDateString(undefined, options).replace(/\//g, "-");
};

interface Project {
  id: number;
  name: string;
  description: string;
  language: string;
  updated_at: string;
}

interface ProjectProps {
  project: Project;
  username: string;
}

const ProjectCard: React.FC<ProjectProps> = ({ project, username }) => {
  return (
    <Card hoverable className="card-style">
      <div className="card-container">
        <div className="card-header">
          <Title level={3} code className="card-title">
            {project.name}
          </Title>
          <Text keyboard className="card-project-id">ID: {project.id}</Text>
        </div>
        <div className="span-container">
          <p>
            <span className="span-desc">Desc:</span>
            {project.description}
          </p>
          <p>
            <span className="span-lang">Lang:</span>
            {project.language}
          </p>
          <p>
            <span className="span-updated">Updated:</span>
            {formatDate(project.updated_at)}
          </p>
        </div>
      </div>
      <Link to={`/project/${username}/${project.name}`}>
        <Button className="card-button" type="text">
          Read More
        </Button>
      </Link>
    </Card>
  );
};

export default ProjectCard;
