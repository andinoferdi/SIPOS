const GlobalNotFoundPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-8 text-center">
        <h1 className="text-2xl font-bold text-card-foreground">Page not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">The page you are looking for does not exist.</p>
      </div>
    </main>
  );
};

export default GlobalNotFoundPage;
