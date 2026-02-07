"use client";

const GlobalErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-8 text-center">
          <h1 className="text-2xl font-bold text-card-foreground">Something went wrong</h1>
          <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
          <button type="button" onClick={reset} className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground">Try again</button>
        </div>
      </body>
    </html>
  );
};

export default GlobalErrorPage;
