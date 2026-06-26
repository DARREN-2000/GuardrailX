import { Link, useRouteError } from "react-router-dom";

export default function NotFoundPage() {
  const error: any = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground">
          {error?.statusText || error?.message || "The page you are looking for doesn't exist or has been moved."}
        </p>
        <div className="pt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
