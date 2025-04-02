import { AxiosInstance } from 'axios';

export const productMutation = {
  addMutation: (client: AxiosInstance) => async (body: string) => {
    return (await client.post<string>('/job/schedule', body)).data;
  },
};
