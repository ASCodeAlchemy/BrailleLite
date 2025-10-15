// src/services/authService.ts
import axios from 'axios';

export interface UserLoginDTO {
    email: string;
    password: string;
}

export interface NGOLoginDTO {
    email: string;
    password: string;
}

export interface ResponseDTO {
    message: string;
    [key: string]: any; // if there are additional fields
}

// For Users
export const loginUser = async (data: UserLoginDTO): Promise<ResponseDTO> => {
    const response = await axios.post('api/users/login', data, { withCredentials: true });
    return response.data;
};

// For NGOs
export const loginNGO = async (data: NGOLoginDTO): Promise<ResponseDTO> => {
    const response = await axios.post('api/ngo/login', data, { withCredentials: true });
    return response.data;
};
