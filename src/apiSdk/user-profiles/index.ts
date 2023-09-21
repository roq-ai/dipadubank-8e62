import axios from 'axios';
import queryString from 'query-string';
import { UserProfileInterface, UserProfileGetQueryInterface } from 'interfaces/user-profile';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getUserProfiles = async (
  query?: UserProfileGetQueryInterface,
): Promise<PaginatedInterface<UserProfileInterface>> => {
  const response = await axios.get('/api/user-profiles', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createUserProfile = async (userProfile: UserProfileInterface) => {
  const response = await axios.post('/api/user-profiles', userProfile);
  return response.data;
};

export const updateUserProfileById = async (id: string, userProfile: UserProfileInterface) => {
  const response = await axios.put(`/api/user-profiles/${id}`, userProfile);
  return response.data;
};

export const getUserProfileById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/user-profiles/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteUserProfileById = async (id: string) => {
  const response = await axios.delete(`/api/user-profiles/${id}`);
  return response.data;
};
