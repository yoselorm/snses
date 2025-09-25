import React, { useState, useEffect } from 'react';
import { X, Upload, Tag, Eye } from 'lucide-react';

const CategoryForm = ({
  categories,
  setCategories,
  setShowModal,
  editingCategory,
  setEditingCategory
}) => {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    status: 'Active'
  });
  const [imagePreview, setImagePreview] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [errors, setErrors] = useState({});

  const statuses = ['Active', 'Inactive'];

  // Initialize form when editing
  useEffect(() => {
    if (editingCategory) {
      setFormData({
        name: editingCategory.name || '',
        image: editingCategory.image || '',
        status: editingCategory.status || 'Active'
      });
      setImagePreview(editingCategory.image || '');
      setIsViewMode(false);
    } else {
      // Reset form for new category
      setFormData({
        name: '',
        image: '',
        status: 'Active'
      });
      setImagePreview('');
      setIsViewMode(false);
    }
    setErrors({});
  }, [editingCategory]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Category name must be at least 2 characters';
    }

    // Check for duplicate names (exclude current category if editing)
    const existingCategory = categories.find(cat => 
      cat.name.toLowerCase() === formData.name.toLowerCase() && 
      (!editingCategory || cat.id !== editingCategory.id)
    );
    
    if (existingCategory) {
      newErrors.name = 'A category with this name already exists';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          image: 'Please select a valid image file'
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          image: 'Image size must be less than 5MB'
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setImagePreview(imageUrl);
        setFormData(prev => ({
          ...prev,
          image: imageUrl
        }));
        setErrors(prev => ({
          ...prev,
          image: ''
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrl = (e) => {
    const url = e.target.value;
    setFormData(prev => ({
      ...prev,
      image: url
    }));
    setImagePreview(url);
    if (errors.image) {
      setErrors(prev => ({
        ...prev,
        image: ''
      }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      // Create a fake input event to reuse handleImageChange logic
      const fakeEvent = {
        target: {
          files: [file]
        }
      };
      handleImageChange(fakeEvent);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const categoryData = {
      ...formData,
      name: formData.name.trim()
    };

    if (editingCategory) {
      // Update existing category
      setCategories(prev =>
        prev.map(category =>
          category.id === editingCategory.id
            ? { ...category, ...categoryData }
            : category
        )
      );
    } else {
      // Add new category
      const newCategory = {
        id: Math.max(0, ...categories.map(c => c.id)) + 1,
        ...categoryData,
        productCount: 0,
        dateCreated: new Date().toISOString().split('T')[0]
      };
      setCategories(prev => [...prev, newCategory]);
    }

    handleClose();
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({
      name: '',
      image: '',
      status: 'Active'
    });
    setImagePreview('');
    setErrors({});
    setIsViewMode(false);
  };

  const toggleViewMode = () => {
    setIsViewMode(!isViewMode);
  };

  return (
    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="bg-amber-100 p-2 rounded-lg">
            <Tag className="text-amber-600" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {editingCategory ? (isViewMode ? 'View Category' : 'Edit Category') : 'Add New Category'}
            </h2>
            <p className="text-sm text-gray-500">
              {editingCategory ? (isViewMode ? 'Category details' : 'Update category information') : 'Create a new product category'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {editingCategory && (
            <button
              type="button"
              onClick={toggleViewMode}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title={isViewMode ? 'Edit Mode' : 'View Mode'}
            >
              <Eye size={20} />
            </button>
          )}
          <button
            onClick={handleClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Category Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            disabled={isViewMode}
            placeholder="e.g., Scented Candles, Raw Candles, etc."
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed ${
              errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            disabled={isViewMode}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category Image
          </label>
          
          {/* Image Preview */}
          {imagePreview && (
            <div className="mb-4">
              <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Category preview"
                  className="w-full h-full object-cover"
                />
                {!isViewMode && (
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview('');
                      setFormData(prev => ({ ...prev, image: '' }));
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          )}

          {!isViewMode && (
            <>
              {/* Drag & Drop Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  dragOver ? 'border-amber-500 bg-amber-50' : 'border-gray-300'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Drag and drop an image here, or click to select
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="imageUpload"
                />
                <label
                  htmlFor="imageUpload"
                  className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors"
                >
                  Choose File
                </label>
              </div>

              {/* OR separator */}
              <div className="flex items-center my-4">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="px-3 text-sm text-gray-500">OR</span>
                <div className="flex-1 border-t border-gray-200"></div>
              </div>

              {/* Image URL Input */}
              <div>
                <input
                  type="url"
                  placeholder="Enter image URL"
                  value={formData.image}
                  onChange={handleImageUrl}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              {errors.image && (
                <p className="mt-2 text-sm text-red-600">{errors.image}</p>
              )}
            </>
          )}
        </div>

        {/* Action Buttons */}
        {!isViewMode && (
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              {editingCategory ? 'Update Category' : 'Add Category'}
            </button>
          </div>
        )}

        {/* View Mode Actions */}
        {isViewMode && editingCategory && (
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => setIsViewMode(false)}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              Edit Category
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CategoryForm;