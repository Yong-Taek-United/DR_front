import { AxiosResponse } from 'axios';
import { instance } from '../instance';
import { TasksTypes } from '@/types/projects';

export type GetProjectsParams = {
  listSkip: number;
  listTake: number;
  projectStatus: 'ONGOING' | 'SCHEDULED' | 'COMPLETED';
};

export type GetProjectsRes = {
  id: number;
  title: string;
  description: string;
  startedAt: string;
  finishedAt: string;
  isActive: boolean;
  isCompleted: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: string;
};

export async function getProjects({
  listSkip,
  listTake,
  projectStatus,
}: GetProjectsParams): Promise<AxiosResponse<{ data: GetProjectsRes[] }, any>> {
  return await instance.get('/projects/list', {
    params: { listSkip, listTake, projectStatus },
  });
}

export async function getTasks({
  projectId,
}: {
  projectId: number;
}): Promise<AxiosResponse<{ data: TasksTypes[] }>> {
  return await instance.get(`/tasks/list/${projectId}`);
}
