import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FileUploader from '../components/files/FileUploader';

export default function UploadPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return (
    <div className="p-6 lg:p-10 max-w-3xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold tracking-tight">Upload Files</h1>
        <p className="text-muted-foreground mt-1">Add files to your vault</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <FileUploader
          onUploadComplete={() => {
            queryClient.invalidateQueries({ queryKey: ['files'] });
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <button
          onClick={() => navigate('/files')}
          className="text-sm text-primary font-medium hover:underline"
        >
          View all files →
        </button>
      </motion.div>
    </div>
  );
}