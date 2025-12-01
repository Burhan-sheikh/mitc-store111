const AdminSettings = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Site Settings</h1>
      <div className="space-y-6">
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Branding</h2>
          <p className="text-gray-600">Logo, slogan, contact info - To be implemented</p>
        </div>
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Pages</h2>
          <p className="text-gray-600">About, Terms, Privacy, Contact - To be implemented</p>
        </div>
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Integrations</h2>
          <p className="text-gray-600">Cloudinary, Firebase config - To be implemented</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;