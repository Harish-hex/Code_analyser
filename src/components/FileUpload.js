import React, { useState, useRef } from 'react';
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react';

const FileUpload = ({ onFileSelect, selectedFile }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const allowedTypes = [
    'application/zip',
    'application/x-zip-compressed',
    'application/octet-stream',
    'application/x-rar-compressed'
  ];

  const maxFileSize = 100 * 1024 * 1024; // 100MB

  const validateFile = (file) => {
    if (!allowedTypes.includes(file.type) && !file.name.endsWith('.zip')) {
      setError('Please upload a valid ZIP file');
      return false;
    }

    if (file.size > maxFileSize) {
      setError('File size must be less than 100MB');
      return false;
    }

    setError('');
    return true;
  };

  const handleFileSelect = (file) => {
    if (validateFile(file)) {
      onFileSelect(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemoveFile = () => {
    onFileSelect(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 text-blue-100 mb-2">
          <Upload size={20} />
          <span className="font-medium">Project File Upload</span>
        </div>
        <p className="text-sm text-blue-200">
          Upload a ZIP file containing your project source code
        </p>
      </div>

      {!selectedFile ? (
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
            isDragOver
              ? 'border-primary-400 bg-primary-400/20'
              : 'border-white/30 hover:border-white/50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <Upload size={48} className="mx-auto text-white/60 mb-4" />
          <p className="text-white text-lg mb-2">
            Drag and drop your project file here
          </p>
          <p className="text-blue-200 text-sm mb-4">
            or click to browse files
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg transition-all"
          >
            Choose File
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".zip,.rar"
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="bg-white/20 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-500/20 p-3 rounded-full">
              <CheckCircle size={24} className="text-green-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <File size={20} className="text-blue-200" />
                <span className="font-medium text-white">{selectedFile.name}</span>
              </div>
              <p className="text-blue-200 text-sm">
                {formatFileSize(selectedFile.size)}
              </p>
            </div>
            <button
              onClick={handleRemoveFile}
              className="text-red-400 hover:text-red-300 transition-colors"
              title="Remove file"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-500/20 border border-red-400 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <AlertCircle size={18} className="text-red-400" />
            <span className="text-red-200 text-sm">{error}</span>
          </div>
        </div>
      )}

      <div className="bg-white/10 rounded-lg p-4">
        <h4 className="font-medium text-white mb-2">Supported formats:</h4>
        <ul className="text-blue-200 text-sm space-y-1">
          <li>• ZIP files (.zip)</li>
          <li>• RAR files (.rar)</li>
          <li>• Maximum file size: 100MB</li>
          <li>• File should contain project source code</li>
        </ul>
      </div>
    </div>
  );
};

export default FileUpload;

