import { Link } from 'react-router-dom';
import { IoAdd } from 'react-icons/io5';

const AdminProducts = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link to="/admin/products/new" className="btn btn-primary flex items-center gap-2">
          <IoAdd size={20} /> Add Product
        </Link>
      </div>
      <div className="card p-8 text-center">
        <p className="text-gray-600">Product management - To be implemented</p>
        <p className="text-sm text-gray-500 mt-2">See IMPLEMENTATION_GUIDE.md for table example</p>
      </div>
    </div>
  );
};

export default AdminProducts;