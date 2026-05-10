import React from 'react';
import { motion } from 'framer-motion';
import { Star, Download, Trash2, Eye, Image, FileText, Film, Music, Archive, Table, Presentation, File } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const typeIcons = {
  image: Image,
  document: FileText,
  pdf: FileText,
  video: Film,
  audio: Music,
  archive: Archive,
  spreadsheet: Table,
  presentation: Presentation,
  other: File,
};

const typeColors = {
  image: 'bg-pink-50 text-pink-600 border-pink-100',
  document: 'bg-blue-50 text-blue-600 border-blue-100',
  pdf: 'bg-red-50 text-red-600 border-red-100',
  video: 'bg-purple-50 text-purple-600 border-purple-100',
  audio: 'bg-amber-50 text-amber-600 border-amber-100',
  archive: 'bg-slate-50 text-slate-600 border-slate-100',
  spreadsheet: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  presentation: 'bg-orange-50 text-orange-600 border-orange-100',
  other: 'bg-gray-50 text-gray-600 border-gray-100',
};

function formatSize(bytes) {
  if (!bytes) return '—';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export default function FileCard({ file, onPreview, onToggleFavorite, onDelete }) {
  const Icon = typeIcons[file.file_type] || File;
  const colorClass = typeColors[file.file_type] || typeColors.other;
  const isImage = file.file_type === 'image';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      className="group bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300"
    >
      {/* Preview Area */}
      <div
        className="relative aspect-[4/3] overflow-hidden cursor-pointer"
        onClick={() => onPreview(file)}
      >
        {isImage ? (
          <img
            src={file.file_url}
            alt={file.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={cn("w-full h-full flex flex-col items-center justify-center gap-3", colorClass)}>
            <Icon className="w-12 h-12 opacity-60" />
            <span className="text-xs font-medium uppercase tracking-wider opacity-50">
              {file.file_type}
            </span>
          </div>
        )}

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <button
            onClick={(e) => { e.stopPropagation(); onPreview(file); }}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-white transition-all shadow-lg"
          >
            <Eye className="w-4 h-4" />
          </button>
          <a
            href={file.file_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-white transition-all shadow-lg"
          >
            <Download className="w-4 h-4" />
          </a>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(file); }}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-destructive hover:bg-white transition-all shadow-lg"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Favorite Badge */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(file); }}
          className="absolute top-3 right-3 z-10"
        >
          <Star
            className={cn(
              "w-5 h-5 transition-all drop-shadow",
              file.is_favorite
                ? "fill-amber-400 text-amber-400"
                : "text-white/70 group-hover:text-white"
            )}
          />
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-sm font-semibold truncate text-foreground">{file.name}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-muted-foreground">{formatSize(file.size_bytes)}</span>
          <span className="text-xs text-muted-foreground">
            {file.created_date ? format(new Date(file.created_date), 'MMM d, yyyy') : ''}
          </span>
        </div>
      </div>
    </motion.div>
  );
}