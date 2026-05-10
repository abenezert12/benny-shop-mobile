import React from 'react';
import { format } from 'date-fns';
import { Image, FileText, Film, Music, Archive, Table, Presentation, File } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const typeIcons = {
  image: Image, document: FileText, pdf: FileText, video: Film,
  audio: Music, archive: Archive, spreadsheet: Table, presentation: Presentation, other: File,
};

const typeBg = {
  image: 'bg-pink-50 text-pink-600',
  document: 'bg-blue-50 text-blue-600',
  pdf: 'bg-red-50 text-red-600',
  video: 'bg-purple-50 text-purple-600',
  audio: 'bg-amber-50 text-amber-600',
  archive: 'bg-slate-50 text-slate-600',
  spreadsheet: 'bg-emerald-50 text-emerald-600',
  presentation: 'bg-orange-50 text-orange-600',
  other: 'bg-gray-50 text-gray-600',
};

function formatSize(bytes) {
  if (!bytes) return '—';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export default function RecentFiles({ files }) {
  const recent = files.slice(0, 6);

  if (recent.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
        No files uploaded yet
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {recent.map((file, i) => {
        const Icon = typeIcons[file.file_type] || File;
        return (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent/40 transition-colors"
          >
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", typeBg[file.file_type] || typeBg.other)}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">{formatSize(file.size_bytes)}</p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {file.created_date ? format(new Date(file.created_date), 'MMM d') : ''}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}