import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/api/apiClient';
import { Files, HardDrive, Star, Image } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import FileTypeChart from '../components/dashboard/FileTypeChart';
import RecentFiles from '../components/dashboard/RecentFiles';
import { motion } from 'framer-motion';

function formatSize(bytes) {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export default function Dashboard() {
  const { data: files = [], isLoading } = useQuery({
    queryKey: ['files'],
    queryFn: () => apiClient.entities.UploadedFile.list('-created_date'),
  });

  const totalSize = files.reduce((sum, f) => sum + (f.size_bytes || 0), 0);
  const favCount = files.filter(f => f.is_favorite).length;
  const imageCount = files.filter(f => f.file_type === 'image').length;

  const stats = [
    { title: 'Total Files', value: files.length, subtitle: 'Across all types', icon: Files, color: 'bg-primary/10 text-primary' },
    { title: 'Storage Used', value: formatSize(totalSize), subtitle: `${files.length} files`, icon: HardDrive, color: 'bg-emerald-50 text-emerald-600' },
    { title: 'Favorites', value: favCount, subtitle: 'Starred files', icon: Star, color: 'bg-amber-50 text-amber-600' },
    { title: 'Images', value: imageCount, subtitle: 'Photos & graphics', icon: Image, color: 'bg-pink-50 text-pink-600' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your file vault</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <StatsCard key={stat.title} {...stat} index={i} />
        ))}
      </div>

      {/* Charts & Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl border border-border p-6"
        >
          <h2 className="text-lg font-semibold mb-4">File Types</h2>
          <FileTypeChart files={files} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-2xl border border-border p-6"
        >
          <h2 className="text-lg font-semibold mb-4">Recent Uploads</h2>
          <RecentFiles files={files} />
        </motion.div>
      </div>
    </div>
  );
}