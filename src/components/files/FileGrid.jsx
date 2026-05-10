import React from 'react';
import { AnimatePresence } from 'framer-motion';
import FileCard from './FileCard';
import { FolderOpen } from 'lucide-react';

export default function FileGrid({ files, onPreview, onToggleFavorite, onDelete }) {
  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-3xl bg-accent flex items-center justify-center mb-4">
          <FolderOpen className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">No files found</h3>
        <p className="text-sm text-muted-foreground mt-1">Upload some files to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <AnimatePresence>
        {files.map((file) => (
          <FileCard
            key={file.id}
            file={file}
            onPreview={onPreview}
            onToggleFavorite={onToggleFavorite}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}