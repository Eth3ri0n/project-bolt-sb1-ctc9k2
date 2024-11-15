import React, { useState, useRef } from 'react';
import Modal from '../shared/Modal';
import { Upload, X, File, Folder } from 'lucide-react';

interface DocumentUploadProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DocumentUpload({ isOpen, onClose }: DocumentUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedFolder, setSelectedFolder] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const folders = [
    { id: '1', name: 'Documents administratifs' },
    { id: '2', name: 'Stages et alternance' },
    { id: '3', name: 'Relevés de notes' }
  ];

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (size: number) => {
    if (size < 1024) return size + ' B';
    if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB';
    return (size / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Déposer des documents" size="lg">
      <div className="space-y-6">
        {/* Upload area */}
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center ${
            isDragging
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
              : 'border-gray-200 dark:border-gray-700'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />
          <div className="space-y-4">
            <div className="w-12 h-12 mx-auto bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center">
              <Upload className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-gray-700 dark:text-gray-300">
                Glissez-déposez vos fichiers ici ou
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
              >
                parcourez vos fichiers
              </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              PDF, Word, Excel, PowerPoint (max. 10 MB)
            </p>
          </div>
        </div>

        {/* Selected files */}
        {selectedFiles.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 dark:text-white">
              Fichiers sélectionnés
            </h3>
            <div className="space-y-2">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <File className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatFileSize(file. size)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Folder selection */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-white">
            Dossier de destination
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setSelectedFolder(folder.id)}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  selectedFolder === folder.id
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
              >
                <Folder className="w-5 h-5" />
                <span className="text-sm">{folder.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            Annuler
          </button>
          <button
            disabled={selectedFiles.length === 0 || !selectedFolder}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Déposer
          </button>
        </div>
      </div>
    </Modal>
  );
}