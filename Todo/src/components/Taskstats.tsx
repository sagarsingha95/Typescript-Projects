
type TaskStatsProps = {
  total: number;
  completed: ()=>number;
  pending: ()=>number;
};

function TaskStats({ total, completed, pending }: TaskStatsProps) {
  return (
    <div className="mt-4 space-y-2">
      <p>Total tasks: {total}</p>
      <p>Completed tasks: {completed()}</p>
      <p>Pending tasks: {pending()}</p>
    </div>
  );
}

export default TaskStats;