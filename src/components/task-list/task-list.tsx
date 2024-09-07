import { useEffect, useRef } from "react";
import type { BarTask } from "../../types/bar-task";
import type { Task } from "../../types/public-types";
import type { TaskListTableProps } from "./task-list-table";
import type { TaskListHeaderProps } from "./task-list-header";

export type TaskListProps = {
	headerHeight: number;
	rowWidth: string;
	fontFamily: string;
	fontSize: string;
	rowHeight: number;
	ganttHeight: number;
	scrollY: number;
	locale: string;
	tasks: Task[];
	taskListRef: React.RefObject<HTMLDivElement>;
	horizontalContainerClass?: string;
	selectedTask: BarTask | undefined;
	setSelectedTask: (task: string) => void;
	onExpanderClick: (task: Task) => void;
	TaskListHeader: React.FC<TaskListHeaderProps>;
	TaskListTable: React.FC<TaskListTableProps>;
	showFromTo: boolean;
};

export const TaskList: React.FC<TaskListProps> = ({
	headerHeight,
	fontFamily,
	fontSize,
	rowWidth,
	rowHeight,
	scrollY,
	tasks,
	selectedTask,
	setSelectedTask,
	onExpanderClick,
	locale,
	ganttHeight,
	taskListRef,
	horizontalContainerClass,
	TaskListHeader,
	TaskListTable,
	showFromTo,
}) => {
	const horizontalContainerRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (horizontalContainerRef.current) {
			horizontalContainerRef.current.scrollTop = scrollY;
		}
	}, [scrollY]);

	const headerProps = {
		headerHeight,
		fontFamily,
		fontSize,
		rowWidth,
		showFromTo,
	};
	const selectedTaskId = selectedTask ? selectedTask.id : "";
	const tableProps = {
		rowHeight,
		rowWidth,
		fontFamily,
		fontSize,
		tasks,
		locale,
		selectedTaskId: selectedTaskId,
		setSelectedTask,
		onExpanderClick,
	};

	return (
		<div ref={taskListRef}>
			<TaskListHeader {...headerProps} />
			<div
				ref={horizontalContainerRef}
				className={horizontalContainerClass}
				style={ganttHeight ? { height: ganttHeight } : {}}
			>
				<TaskListTable {...tableProps} />
			</div>
		</div>
	);
};
