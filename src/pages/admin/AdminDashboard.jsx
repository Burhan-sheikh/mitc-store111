const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="text-4xl font-bold text-primary-500 mb-2">0</div>
          <p className="text-gray-600">Total Products</p>
        </div>
        <div className="card p-6">
          <div className="text-4xl font-bold text-green-500 mb-2">0</div>
          <p className="text-gray-600">Active Customers</p>
        </div>
        <div className="card p-6">
          <div className="text-4xl font-bold text-yellow-500 mb-2">0</div>
          <p className="text-gray-600">Pending Reviews</p>
        </div>
      </div>
      <div className="mt-8 card p-6">
        <p className="text-gray-600">Dashboard content - To be implemented</p>
        <p className="text-sm text-gray-500 mt-2">See IMPLEMENTATION_GUIDE.md for details</p>
      </div>
    </div>
  );
};

export default AdminDashboard;