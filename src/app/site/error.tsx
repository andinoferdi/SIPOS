"use client";

interface SiteErrorProps {
  error: Error;
  reset: () => void;
}

const SiteError = ({ error, reset }: SiteErrorProps) => {
  return (
    <div className="wrapper py-20 text-center">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Page error
      </h2>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        {error.message}
      </p>
      <button
        className="mt-5 rounded-full bg-primary-500 px-5 py-2 text-sm font-medium text-white"
        onClick={reset}
        type="button"
      >
        Try again
      </button>
    </div>
  );
};

export default SiteError;
