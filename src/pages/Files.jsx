import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/api/apiClient';
import { Search, SlidersHorizontal, Grid3X3, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import FileGrid from '../components/files/FileGrid';
import FilePreviewModal from '../components/files/FilePreviewModal';

const FILE_TYPES = ['all', 'image', 'document', 'pdf', 'video', 'audio', 'spreadsheet', 'archive', 'other'];

export default function Files() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [previewFile, setPreviewFile] = useState(null);
  const queryClient = useQueryClient();

  const { data: files = [], isLoading } = useQuery({
    queryKey: ['files'],
    queryFn: () => apiClient.entities.UploadedFile.list('-created_date'),
  });

  const toggleFavorite = useMutation({
    mutationFn: (file) => apiClient.entities.UploadedFile.update(file.id, { is_favorite: !file.is_favorite }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['files'] }),
  });

  const deleteFile = useMutation({
    mutationFn: (file) => apiClient.entities.UploadedFile.delete(file.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['files'] }),
  });

  const filtered = useMemo(() => {
    return files.filter(f => {
      const matchSearch = !search || f.name?.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === 'all' || f.file_type === typeFilter;
      return matchSearch && matchType;
    });
  }, [files, search, typeFilter]);

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
        <h1 className="text-3xl font-bold tracking-tight">All Files</h1>
        <p className="text-muted-foreground mt-1">{files.length} files in your vault</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 rounded-xl bg-card"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-44 rounded-xl bg-card">
            <SlidersHorizontal className="w-4 h-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Filter type" />
          </SelectTrigger>
          <SelectContent>
            {FILE_TYPES.map(type => (
              <SelectItem key={type} value={type}>
                {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* File Grid */}
      <FileGrid
        files={filtered}
        onPreview={setPreviewFile}
        onToggleFavorite={(file) => toggleFavorite.mutate(file)}
        onDelete={(file) => deleteFile.mutate(file)}
      />

      {/* Preview Modal */}
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