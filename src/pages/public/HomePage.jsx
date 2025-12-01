const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="container-custom py-20 text-center">
        <h1 className="text-5xl font-bold text-primary-900 mb-6">
          Welcome to MITC Store
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Premium Laptops in Kashmir - Coming Soon
        </p>
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary-700">Setup Instructions</h2>
          <ol className="text-left space-y-3 text-gray-700">
            <li>1. Configure Firebase credentials in <code className="bg-gray-100 px-2 py-1 rounded">.env</code></li>
            <li>2. Set up Cloudinary account and add credentials</li>
            <li>3. Create admin user in Firebase Authentication</li>
            <li>4. Implement remaining components (see IMPLEMENTATION_GUIDE.md)</li>
            <li>5. Deploy Firestore security rules</li>
          </ol>
          <p className="mt-6 text-sm text-gray-500">
            Check the README.md and IMPLEMENTATION_GUIDE.md for detailed instructions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;