import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/api/apiClient';
import { motion } from 'framer-motion';
import FileGrid from '../components/files/FileGrid';
import FilePreviewModal from '../components/files/FilePreviewModal';

export default function Favorites() {
  const [previewFile, setPreviewFile] = useState(null);
  const queryClient = useQueryClient();

  const { data: files = [], isLoading } = useQuery({
    queryKey: ['files'],
    queryFn: () => apiClient.entities.UploadedFile.list('-created_date'),
  });

  const favorites = files.filter(f => f.is_favorite);

  const toggleFavorite = useMutation({
    mutationFn: (file) => apiClient.entities.UploadedFile.update(file.id, { is_favorite: !file.is_favorite }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['files'] }),
  });

  const deleteFile = useMutation({
    mutationFn: (file) => apiClient.entities.UploadedFile.delete(file.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['files'] }),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold tracking-tight">Favorites</h1>
        <p className="text-muted-foreground mt-1">{favorites.length} starred files</p>
      </motion.div>

      <FileGrid
        files={favorites}
        onPreview={setPreviewFile}
        onToggleFavorite={(file) => toggleFavorite.mutate(file)}
        onDelete={(file) => deleteFile.mutate(file)}
      />

      <FilePreviewModal
        file={previewFile}
        open={!!previewFile}
        onClose={() => setPreviewFile(null)}
        onToggleFavorite={(file) => { toggleFavorite.mutate(file); setPreviewFile({ ...file, is_favorite: !file.is_favorite }); }}
        onDelete={(file) => deleteFile.mutate(file)}
      />
    </div>
  );
}