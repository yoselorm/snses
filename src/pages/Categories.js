import { Tag, Search, Settings, Trash, Plus } from 'lucide-react';
import React, { useState } from 'react';
import CategoryForm from '../components/CategoryForm';

const Categories = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Scented Candles',
      image: 'https://images.unsplash.com/photo-1602874801006-47c0fb46c85c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      productCount: 12,
      dateCreated: '2023-01-15',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Raw Candles',
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      productCount: 8,
      dateCreated: '2023-02-20',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Luxury Collection',
      image: 'https://images.unsplash.com/photo-1544967882-6abec37c2c10?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      productCount: 15,
      dateCreated: '2023-03-10',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Home & Garden',
      image: 'https://images.unsplash.com/photo-1602874801006-47c0fb46c85c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      productCount: 6,
      dateCreated: '2023-04-05',
      status: 'Inactive'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const statuses = ['Active', 'Inactive'];

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleDelete = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      setCategories(prev => prev.filter(category => category.id !== categoryId));
    }
  };

  const handleAddNew = () => {
    setEditingCategory(null);
    setShowModal(true);
  };

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || category.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTotalProductCount = () => {
    return categories.reduce((total, category) => total + category.productCount, 0);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Categories</h1>
          <p className="text-gray-500 text-sm">
            Manage your product categories • {categories.length} categories • {getTotalProductCount()} total products
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Category</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Categories</p>
              <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            </div>
            <div className="bg-amber-100 p-3 rounded-lg">
              <Tag className="text-amber-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Categories</p>
              <p className="text-2xl font-bold text-gray-900">
                {categories.filter(c => c.status === 'Active').length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Tag className="text-green-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{getTotalProductCount()}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Tag className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search categories..."
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

      {/* Categories Grid */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            All Categories ({filteredCategories.length})
          </h3>

          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCategories.map((category) => (
                <div key={category.id} className="group relative bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200">
                  {/* Category Image */}
                  <div className="aspect-video w-full bg-gray-200 overflow-hidden">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Tag size={40} className="text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Category Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 text-lg truncate pr-2">
                        {category.name}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(category.status)}`}>
                        {category.status}
                      </span>
                    </div>
                    
                    <div className="space-y-1 mb-4">
                      <p className="text-sm text-gray-600">
                        {category.productCount} products
                      </p>
                      <p className="text-xs text-gray-500">
                        Created: {category.dateCreated}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(category)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Category"
                        >
                          <Settings size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Category"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => handleEdit(category)}
                        className="text-xs text-amber-600 hover:text-amber-700 font-medium"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Tag size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
              <button
                onClick={handleAddNew}
                className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
              >
                Add Your First Category
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <CategoryForm
            categories={categories}
            setCategories={setCategories}
            setShowModal={setShowModal}
            editingCategory={editingCategory}
            setEditingCategory={setEditingCategory}
          />
        </div>
      )}
    </div>
  );
};

export default Categories;