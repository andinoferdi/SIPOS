"use client";

interface DashboardErrorProps {
  error: Error;
  reset: () => void;
}

const DashboardError = ({ error, reset }: DashboardErrorProps) => {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 px-5 text-center">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Dashboard error
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">{error.message}</p>
      <button
        className="rounded-full bg-primary-500 px-5 py-2 text-sm font-medium text-white"
        onClick={reset}
        type="button"
      >
        Retry
      </button>
    </div>
  );
};

export default DashboardError;
