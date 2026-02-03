import { useAuth } from '../hooks';
import { Button } from '../components/ui/Button';

export const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">My Profile</h1>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
              <p className="text-gray-500">{user?.email}</p>
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 mt-2 capitalize">
                {user?.role}
              </span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Account Details</h3>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">User ID</dt>
                <dd className="mt-1 text-sm text-gray-900">{user?._id}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Verification</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {user?.isVerified ? (
                    <span className="text-green-600">Verified</span>
                  ) : (
                    <span className="text-yellow-600">Unverified</span>
                  )}
                </dd>
              </div>
            </dl>
          </div>

          <div className="border-t border-gray-200 pt-6 flex justify-end">
            <Button variant="outline" onClick={logout} className="w-auto border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
              Sign out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
