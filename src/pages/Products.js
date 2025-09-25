import { Package, Search, Settings, Trash } from 'lucide-react';
import React, { useState } from 'react'
import AddProductForm from '../components/AddProductForm';

const Products = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Makola Candle',
      category: 'Scented',
      price: 1200,
      stock: 15,
      status: 'Active',
      dateAdded: '2020-12-12',
      image: 'https://unsplash.com/photos/white-and-brown-candle-holder-b5n0WOrLjQM',
      description: 'Professional display with stunning 5K resolution and P3 wide color gamut',
      story: 'Designed for creative professionals who demand the best visual experience for their work.',
      topNotes: 'Premium aluminum construction',
      middleNotes: 'Ultra-thin design',
      baseNotes: 'Powerful performance',
      diameter: '24 inches',
      height: '18.8 inches',
      netWeight: '9.88 kg',
      burnTime: 'N/A',
      features: ['5K Retina Display', 'P3 Wide Color', 'True Tone Technology']
    },
    {
      id: 2,
      name: 'Aburi Candles',
      category: 'Raw',
      price: 299,
      stock: 8,
      status: 'Active',
      dateAdded: '2021-01-28',
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Premium wireless headphones with active noise cancelling and superior sound quality',
      story: 'Engineered for music lovers who want to immerse themselves in pure, uninterrupted sound.',
      topNotes: 'Active Noise Cancelling',
      middleNotes: 'Wireless Freedom',
      baseNotes: 'All-day Comfort',
      diameter: 'N/A',
      height: '7.4 inches',
      netWeight: '267g',
      burnTime: '22 hours',
      features: ['Active Noise Cancelling', 'Wireless', 'Fast Fuel Charging']
    },
    {
      id: 3,
      name: 'Gold Coast Candle',
      category: 'Components',
      price: 115,
      stock: 25,
      status: 'Active',
      dateAdded: '2021-03-22',
      image: 'https://images.unsplash.com/photo-1544967882-6abec37c2c10?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'High-performance processor designed for efficiency and speed',
      story: 'Built to power the next generation of computing with intelligent performance.',
      topNotes: 'Quad-core processing',
      middleNotes: 'Energy efficient',
      baseNotes: 'Integrated graphics',
      diameter: '37.5mm',
      height: '37.5mm',
      netWeight: '45g',
      burnTime: 'N/A',
      features: ['Quad Core', '2.4GHz Base Clock', 'Intel UHD Graphics']
    },
    {
      id: 4,
      name: 'The North Candle',
      category: 'Home & Garden',
      price: 50,
      stock: 12,
      status: 'Active',
      dateAdded: '2021-09-15',
      image: 'https://images.unsplash.com/photo-1602874801006-47c0fb46c85c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Sultry blend of creamy shea butter, smoky wood and earthy spices infused with a hint of honey',
      story: 'THE NORTH embodies the raw beauty and warmth of Ghana\'s northern landscapes, where endless horizons stretch across sunbaked earth. Inspired by the richness of shea butter, this scent unfolds in layers of velvety, buttery depth, intertwined with smoky, earthy undertones and lingering sweetness.',
      topNotes: 'Shea butter, Honey',
      middleNotes: 'Floral, Nut, Spice',
      baseNotes: 'Cedar, Musk, Vanilla, Amber, Vetiver',
      diameter: '3.11 inches',
      height: '3.66 inches',
      netWeight: '250g',
      burnTime: '80 hours',
      features: ['Cruelty-Free & Vegan', 'Clean Burn Cotton Wicks', 'Made in USA', 'Recyclable Packaging']
    },
    {
      id: 5,
      name: 'Sobolo Candles',
      category: 'Tablets',
      price: 599,
      stock: 12,
      status: 'Active',
      dateAdded: '2021-06-10',
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Powerful tablet with A14 Bionic chip and stunning Liquid Retina display',
      story: 'Designed for creativity and productivity, bringing professional capabilities to a portable form.',
      topNotes: 'A14 Bionic chip',
      middleNotes: '10.9-inch display',
      baseNotes: 'All-day battery',
      diameter: 'N/A',
      height: '9.74 inches',
      netWeight: '458g',
      burnTime: '10 hours',
      features: ['A14 Bionic Chip', 'Liquid Retina Display', 'Touch ID', 'Apple Pencil Support']
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [imagePreview, setImagePreview] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    status: 'Active',
    description: '',
    story: '',
    topNotes: '',
    middleNotes: '',
    baseNotes: '',
    diameter: '',
    height: '',
    netWeight: '',
    burnTime: '',
    features: [],
    image: ''
  });

  const statuses = ['Active', 'Inactive', 'Out of Stock'];









  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      status: product.status,
      description: product.description || '',
      story: product.story || '',
      topNotes: product.topNotes || '',
      middleNotes: product.middleNotes || '',
      baseNotes: product.baseNotes || '',
      diameter: product.diameter || '',
      height: product.height || '',
      netWeight: product.netWeight || '',
      burnTime: product.burnTime || '',
      features: product.features || [],
      image: product.image || ''
    });
    setImagePreview(product.image || '');
    setShowModal(true);
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(product => product.id !== productId));
    }
  };



  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 ">Products</h1>
          <p className="text-gray-500 text-sm">Manage your store's products</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center space-x-2"
        >
          <Package size={20} />
          <span>Add Product</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full"
              />
            </div>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            All Products ({filteredProducts.length})
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-sm font-medium text-gray-500 pb-3">Product</th>
                  <th className="text-left text-sm font-medium text-gray-500 pb-3">Category</th>
                  <th className="text-left text-sm font-medium text-gray-500 pb-3">Price</th>
                  <th className="text-left text-sm font-medium text-gray-500 pb-3">Stock</th>
                  <th className="text-left text-sm font-medium text-gray-500 pb-3">Status</th>
                  <th className="text-left text-sm font-medium text-gray-500 pb-3">Date Added</th>
                  <th className="text-left text-sm font-medium text-gray-500 pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  return (
                    <tr key={product.id} className="border-b border-gray-50">
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                            {product.image ? (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Package size={20} className="text-gray-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{product.name}</p>
                            {product.description && (
                              <p className="text-xs text-gray-500 mt-1 truncate max-w-xs">
                                {product.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-gray-600">{product.category}</td>
                      <td className="py-4 text-sm font-medium text-gray-900">£{product.price}</td>
                      <td className="py-4 text-sm text-gray-600">{product.stock}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-gray-600">{product.dateAdded}</td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            title="Edit"
                          >
                            <Settings size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                            title="Delete"
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <AddProductForm products={products} setProducts={setProducts} setShowModal={setShowModal} setFormData={setFormData} formData={formData} editingProduct={editingProduct} setEditingProduct={setEditingProduct} />
        </div>
      )}
    </div>
  );
};

export default Products