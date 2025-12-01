import { useNavigate } from 'react-router-dom';

const AdminProductForm = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          ← Back
        </button>
        <h1 className="text-3xl font-bold">Add Product</h1>
      </div>
      <div className="card p-8">
        <p className="text-gray-600">Product form - To be implemented</p>
        <p className="text-sm text-gray-500 mt-2">
          Include: title, brand, model, price, specs, images (Cloudinary upload)
        </p>
      </div>
    </div>
  );
};

export default AdminProductForm;