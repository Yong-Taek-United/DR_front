import { GetProjectsRes, getTasks } from '@/api/projects/projects';
import Button from '../Button';
import { SvgPlus, SvgUpdatePencil } from '@/utils/images';
import { useState } from 'react';
import AccordionIcon from '../AccordionIcon';
import { TasksTypes } from '@/types/projects';
import TaskListItem from './task/TaskListItem';
import { useRouter } from 'next/router';

type PropsType = {
  item: GetProjectsRes;
};
export function ProjectListItem({ item }: PropsType) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [didFetch, setDidFetch] = useState(false);
  const [tasksList, setTaskList] = useState<TasksTypes[]>([]);

  const getTasksList = async () => {
    try {
      setIsLoading(true);
      const { status, data } = await getTasks({ projectId: item.id });
      if (status === 200) {
        setTaskList(data?.data);
      }
    } catch (error) {
    } finally {
      setDidFetch(true);
      setIsOpen(true);
      setIsLoading(false);
    }
  };

  const handleAccordion = () => {
    if (didFetch) {
      setIsOpen(!isOpen);
    } else {
      getTasksList();
    }
  };

  return (
    <div className={`relative overflow-hidden border-b p-4 border-gray-400`}>
      <div className="">
        <div className="flex flex-row justify-between w-full align-middle h-28">
          {/* 좌측 */}
          <button
            onClick={handleAccordion}
            className="flex flex-col justify-around w-4/5 md:justify-start bg-pink-0 md:flex-row md:my-auto"
          >
            <div className="mr-4 font-medium lg:text-lg">{`${item.startedAt.replaceAll(
              '-',
              '.'
            )} - ${item.finishedAt.replaceAll('-', '.')}`}</div>
            <div className="font-semibold lg:text-lg">{item.title}</div>
          </button>
          {/* 우측 */}
          <div className="flex flex-col justify-around w-1/5 align-middle md:justify-end md:flex-row md:my-auto">
            <div className="mx-auto flex-end lg:mr-4">
              <Button className="w-16 text-xs h-7 hover:bg-gray-900 md:w-20 md:text-sm lg:w-28">
                기록보기
              </Button>
            </div>
            <button
              onClick={() =>
                router.push({
                  pathname: '/projects/edit',
                  query: { project_id: item.id },
                })
              }
              className="text-center cursor-pointer"
            >
              <SvgUpdatePencil className="mx-auto " />
            </button>
          </div>
        </div>
        <div className="">
          <div onClick={handleAccordion} className="w-6 m-auto cursor-pointer ">
            <AccordionIcon isOpen={isOpen} />
          </div>
        </div>
      </div>
      {isOpen ? (
        <div className={``}>
          <div className="flex justify-end">
            <button className="flex items-center h-auto">
              <div className="mr-2 ">
                <SvgPlus />
              </div>
              <p className="text-gray-800 underline">과제 생성하기</p>
            </button>
          </div>
          {tasksList?.length ? (
            tasksList.map((task, i) => (
              <TaskListItem
                key={i}
                task={task}
                isLastTask={tasksList.length === i + 1}
              />
            ))
          ) : (
            <div className="w-full py-5 text-base font-normal text-gray-500 ">
              <p className="mx-auto text-center">과제가 없습니다.</p>
            </div>
          )}
        </div>
      ) : null}
      {/* 과제 */}
    </div>
  );
}
