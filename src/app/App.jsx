import { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '@/app/store';
import AppRoutes from '@/routes/AppRoutes';
import Spinner from '@/components/ui/Spinner';
import { fetchCurrentUser, bootstrapWithNoToken } from '@/features/auth/authSlice';
import { selectBootstrapStatus } from '@/features/auth/authSelectors';
import { tokenStorage } from '@/features/auth/utils/tokenStorage';

/**
 * Runs once on app load: if a token exists in localStorage,
 * verify it against the backend (GET /users/me) to restore
 * the session. Blocks rendering the routes until this resolves,
 * so an authenticated user never sees a flash of the login page.
 */
function SessionBootstrap({ children }) {
    const dispatch = useDispatch();
    const bootstrapStatus = useSelector(selectBootstrapStatus);

    useEffect(() => {
        if (tokenStorage.getAccessToken()) {
            dispatch(fetchCurrentUser());
        } else {
            dispatch(bootstrapWithNoToken());
        }
    }, [dispatch]);

    if (bootstrapStatus === 'loading') {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spinner size="lg" />
            </div>
        );
    }

    return children;
}

export default function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <SessionBootstrap>
                    <AppRoutes />
                </SessionBootstrap>
            </BrowserRouter>
        </Provider>
    );
}