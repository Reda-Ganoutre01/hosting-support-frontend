import { Link } from 'react-router-dom';

export default function UnauthorizedPage() {
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center">
            <h1 className="text-4xl font-bold text-red-600">403</h1>
            <p className="mt-4 text-gray-600">You don&apos;t have permission to view this page.</p>
            <Link to="/" className="mt-6 text-blue-600 hover:underline">Go back home</Link>
        </div>
    );
}