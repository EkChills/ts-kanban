import React from "react";
import SingleTask from "./SingleTask";
import { useAppSelector } from "../hooks/reduxHooks";
import ReactDOM from 'react-dom'
import SingleTaskDetails from "../pages/SingleTaskDetails";

type TaskList =
  | {
      name: string;
      columns: {
        name: string;
        tasks: {
          id:number | string;
          title: string;
          description: string;
          status: string;
          subtasks: {
            title: string;
            isCompleted: boolean;
          }[];
        }[];
      }[];
    }
  | undefined;

const BoardColumn = ({
  colName,
  tasksList,
}: {
  colName: string;
  tasksList: TaskList;
}) => {
  const {isDetailModalOpen} = useAppSelector((store) => store.eventsActions)
  const columnList = tasksList?.columns.find(
    (column) => column.name === colName
  );
  return (
    <div className="max-w-[260px] w-full min-w-[260px] min-h-screen mb-auto flex flex-col">
      <div className="flex items-center mb-[1.5rem] space-x-[.75rem]">
        <span
          className={`w-[15px] h-[15px] rounded-full ${
            colName.trim().toLowerCase() === "todo"
              ? "bg-[#49C4E5]"
              : colName.trim().toLowerCase() === "doing"
              ? "bg-[#8471F2]"
              : "bg-[#67E2AE]"
          }`}
        ></span>
        <h5 className="text-[.75rem] font-bold text-[#828FA3]">
          {colName} ({columnList?.tasks.length})
        </h5>
      </div>
      <div className="flex flex-col space-y-[1.25rem]">
        {columnList?.tasks.map((column, index) => {

          return <SingleTask key={index} {...column} />;
        })}
      </div>
    </div>
  );
};

export default BoardColumn;
