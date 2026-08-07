import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center">
            <h1 className="text-6xl font-bold text-blue-600">404</h1>
            <p className="mt-4 text-gray-600">This page does not exist.</p>
            <Link to="/" className="mt-6 text-blue-600 hover:underline">Go back home</Link>
        </div>
    );
}