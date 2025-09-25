import React, { useState, useEffect } from 'react'
import {  X, Image as ImageIcon, Upload } from 'lucide-react';


const AddProductForm = ({products,setProducts,setShowModal,editingProduct,setEditingProduct,setFormData,formData}) => {

    const [mainImagePreview, setMainImagePreview] = useState('');
    const [backupImagePreview, setBackupImagePreview] = useState('');
    const [mainDragOver, setMainDragOver] = useState(false);
    const [backupDragOver, setBackupDragOver] = useState(false);

    // Initialize image previews when editing
    useEffect(() => {
        if (editingProduct) {
            setMainImagePreview(formData.image || '');
            setBackupImagePreview(formData.backupImage || '');
        }
    }, [editingProduct, formData.image, formData.backupImage]);

    const categories = ['Electronics', 'Audio', 'Components', 'Laptops', 'Tablets', 'Accessories', 'Home & Garden', 'Candles', 'Scented', 'Raw'];
    const statuses = ['Active', 'Inactive', 'Out of Stock'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'features') {
            const featuresArray = value.split(',').map(f => f.trim()).filter(f => f);
            setFormData(prev => ({
                ...prev,
                [name]: featuresArray
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // Handle main image upload
    const handleMainImageUpload = (file) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                setMainImagePreview(imageUrl);
                setFormData(prev => ({
                    ...prev,
                    image: imageUrl
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle backup image upload
    const handleBackupImageUpload = (file) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                setBackupImagePreview(imageUrl);
                setFormData(prev => ({
                    ...prev,
                    backupImage: imageUrl
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle main image URL input
    const handleMainImageUrl = (e) => {
        const url = e.target.value;
        setMainImagePreview(url);
        setFormData(prev => ({
            ...prev,
            image: url
        }));
    };

    // Handle backup image URL input
    const handleBackupImageUrl = (e) => {
        const url = e.target.value;
        setBackupImagePreview(url);
        setFormData(prev => ({
            ...prev,
            backupImage: url
        }));
    };

    // Handle drag and drop for main image
    const handleMainDrop = (e) => {
        e.preventDefault();
        setMainDragOver(false);
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            handleMainImageUpload(files[0]);
        }
    };

    const handleMainDragOver = (e) => {
        e.preventDefault();
        setMainDragOver(true);
    };

    const handleMainDragLeave = (e) => {
        e.preventDefault();
        setMainDragOver(false);
    };

    // Handle drag and drop for backup image
    const handleBackupDrop = (e) => {
        e.preventDefault();
        setBackupDragOver(false);
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            handleBackupImageUpload(files[0]);
        }
    };

    const handleBackupDragOver = (e) => {
        e.preventDefault();
        setBackupDragOver(true);
    };

    const handleBackupDragLeave = (e) => {
        e.preventDefault();
        setBackupDragOver(false);
    };

    // Handle file input change for main image
    const handleMainFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleMainImageUpload(file);
        }
    };

    // Handle file input change for backup image
    const handleBackupFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleBackupImageUpload(file);
        }
    };

    // Remove main image
    const removeMainImage = () => {
        setMainImagePreview('');
        setFormData(prev => ({
            ...prev,
            image: ''
        }));
    };

    // Remove backup image
    const removeBackupImage = () => {
        setBackupImagePreview('');
        setFormData(prev => ({
            ...prev,
            backupImage: ''
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingProduct) {
            // Update existing product
            setProducts(prev => prev.map(product =>
                product.id === editingProduct.id
                    ? { ...product, ...formData, price: Number(formData.price), stock: Number(formData.stock) }
                    : product
            ));
        } else {
            // Add new product
            const newProduct = {
                id: Date.now(),
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock),
                dateAdded: new Date().toISOString().split('T')[0]
            };
            setProducts(prev => [...prev, newProduct]);
        }

        resetForm();
    };

    const resetForm = () => {
        setFormData({
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
            image: '',
            backupImage: ''
        });
        setMainImagePreview('');
        setBackupImagePreview('');
        setEditingProduct(null);
        setShowModal(false);
    };

    // Image upload component
    const ImageUploadSection = ({ 
        title, 
        preview, 
        onDrop, 
        onDragOver, 
        onDragLeave, 
        onFileChange, 
        onUrlChange, 
        onRemove, 
        dragOver, 
        inputId,
        isRequired = false 
    }) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {title} {isRequired && '*'}
            </label>

            {preview ? (
                <div className="relative inline-block mb-4">
                    <img
                        src={preview}
                        alt="Product preview"
                        className="w-full max-w-sm h-48 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                        type="button"
                        onClick={onRemove}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                        <X size={14} />
                    </button>
                </div>
            ) : (
                <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors mb-4 ${
                        dragOver
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                >
                    <ImageIcon size={48} className="mx-auto text-gray-400 mb-4" />
                    <div className="space-y-2">
                        <p className="text-gray-600">
                            <label htmlFor={inputId} className="cursor-pointer text-amber-600 hover:text-amber-700">
                                Click to upload
                            </label> or drag and drop
                        </p>
                        <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                    <input
                        id={inputId}
                        type="file"
                        accept="image/*"
                        onChange={onFileChange}
                        className="hidden"
                    />
                </div>
            )}

            {/* OR separator */}
            <div className="flex items-center my-4">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="px-3 text-sm text-gray-500">OR</span>
                <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Image URL Input */}
            <div className="mb-6">
                <input
                    type="url"
                    placeholder="Enter image URL"
                    onChange={onUrlChange}
                    value={preview}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
            </div>
        </div>
    );

    return (
        <div className="bg-white rounded-xl w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Product Images Upload */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ImageUploadSection
                            title="Main Product Image"
                            preview={mainImagePreview}
                            onDrop={handleMainDrop}
                            onDragOver={handleMainDragOver}
                            onDragLeave={handleMainDragLeave}
                            onFileChange={handleMainFileChange}
                            onUrlChange={handleMainImageUrl}
                            onRemove={removeMainImage}
                            dragOver={mainDragOver}
                            inputId="main-image-upload"
                            isRequired={true}
                        />

                        <ImageUploadSection
                            title="Backup Product Image"
                            preview={backupImagePreview}
                            onDrop={handleBackupDrop}
                            onDragOver={handleBackupDragOver}
                            onDragLeave={handleBackupDragLeave}
                            onFileChange={handleBackupFileChange}
                            onUrlChange={handleBackupImageUrl}
                            onRemove={removeBackupImage}
                            dragOver={backupDragOver}
                            inputId="backup-image-upload"
                        />
                    </div>

                    {/* Basic Information */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Product Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category *
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            >
                                <option value="">Select Category</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Product Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="Brief description of the product..."
                        />
                    </div>

                    {/* Story */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Product Story
                        </label>
                        <textarea
                            name="story"
                            value={formData.story}
                            onChange={handleInputChange}
                            rows="4"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="Tell the story behind this product..."
                        />
                    </div>

                    {/* Olfactive Notes / Features */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Top Notes / Primary Features
                            </label>
                            <input
                                type="text"
                                name="topNotes"
                                value={formData.topNotes}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                placeholder="e.g., Shea butter, Honey"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Middle Notes / Secondary Features
                            </label>
                            <input
                                type="text"
                                name="middleNotes"
                                value={formData.middleNotes}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                placeholder="e.g., Floral, Nut, Spice"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Base Notes / Core Features
                            </label>
                            <input
                                type="text"
                                name="baseNotes"
                                value={formData.baseNotes}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                placeholder="e.g., Cedar, Musk, Vanilla"
                            />
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Price (£) *
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                required
                                min="0"
                                step="0.01"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Stock *
                            </label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleInputChange}
                                required
                                min="0"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Diameter/Width
                            </label>
                            <input
                                type="text"
                                name="diameter"
                                value={formData.diameter}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                placeholder="e.g., 3.11 inches"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Height
                            </label>
                            <input
                                type="text"
                                name="height"
                                value={formData.height}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                placeholder="e.g., 3.66 inches"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Net Weight
                            </label>
                            <input
                                type="text"
                                name="netWeight"
                                value={formData.netWeight}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                placeholder="e.g., 250g"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Burn Time / Duration
                            </label>
                            <input
                                type="text"
                                name="burnTime"
                                value={formData.burnTime}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                placeholder="e.g., 80 hours"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status *
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            >
                                {statuses.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Features */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Key Features
                        </label>
                        <input
                            type="text"
                            name="features"
                            value={Array.isArray(formData.features) ? formData.features.join(', ') : formData.features}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="e.g., Cruelty-Free & Vegan, Clean Burn Cotton Wicks, Made in USA (separate with commas)"
                        />
                        <p className="text-xs text-gray-500 mt-1">Separate multiple features with commas</p>
                    </div>

                    <div className="flex space-x-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={resetForm}
                            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                        >
                            {editingProduct ? 'Update Product' : 'Add Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProductForm