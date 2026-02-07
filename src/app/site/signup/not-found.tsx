import Link from "next/link";

const SegmentNotFound = () => {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 px-5 text-center">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Page not found
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        The page you are looking for is not available.
      </p>
      <Link
        className="rounded-full bg-primary-500 px-5 py-2 text-sm font-medium text-white"
        href="/"
      >
        Back to home
      </Link>
    </div>
  );
};

export default SegmentNotFound;
