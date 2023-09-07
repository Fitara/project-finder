const GITHUB_API_BASE_URL = 'https://api.github.com';

export const fetchUserFromAPI = async (username: string) => {
  const response = await fetch(`${GITHUB_API_BASE_URL}/users/${username}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  return response.json();
};


export const fetchUserProjects = async (username: string) => {
  const response = await fetch(`${GITHUB_API_BASE_URL}/users/${username}/repos`);
  if (!response.ok) {
    throw new Error('Failed to fetch user projects');
  }
  return response.json();
};
