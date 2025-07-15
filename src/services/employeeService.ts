// src/services/employeeService.ts
import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/employees`;

const employeeService = {
  async getAll() {
    const response = await axios.get(API_URL);
    return response.data;
  },

  async create(employee: any) {
    const response = await axios.post(API_URL, employee);
    return response.data;
  },

  async update(id: number, employee: any) {
    const response = await axios.put(`${API_URL}/${id}`, employee);
    return response.data;
  },

  async remove(id: number) {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  }
};

export default employeeService;
