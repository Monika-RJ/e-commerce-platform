import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

// Styled components for styling within the same file
const ProfileContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProfileTitle = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 16px;
`;

const ProfileDetails = styled.div`
  margin-bottom: 20px;

  p {
    margin: 8px 0;
  }
`;

const ProfileActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  font-weight: bold;
  
  &.edit-button {
    background-color: #007bff;
  }

  &.logout-button {
    background-color: #dc3545;
  }
`;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage
      console.log(token);
      try {
        // Send request to backend to fetch profile with token in headers


        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data); // Set user data if successful
        console.log(response);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false); // Set loading to false once the request is completed
      }
    };
    fetchProfile();
  }, [navigate]);

  // Confirm logout and redirect to login page
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('token'); // Clear token
      navigate('/login');
    }
  };

  // Show loading message while the profile is being fetched
  if (loading) return <p>Loading...</p>;

  if (!user) return <p>No profile found. Please log in again.</p>;

  return (
    <ProfileContainer>
      <ProfileTitle>Profile</ProfileTitle>
      <ProfileDetails>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </ProfileDetails>
      <ProfileActions>
        <Button className="edit-button" onClick={() => navigate('/edit-profile')}>
          Edit Profile
        </Button>
        <Button className="logout-button" onClick={handleLogout}>
          Logout
        </Button>
      </ProfileActions>
    </ProfileContainer>
  );
};

export default Profile;
