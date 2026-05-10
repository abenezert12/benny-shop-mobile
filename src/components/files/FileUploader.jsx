import React, { useState, useCallback, useRef } from 'react';
import { Upload, X, FileText, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { apiClient } from '@/api/apiClient';
import { cn } from '@/lib/utils';

function getFileCategory(file) {
  const type = file.type;
  if (type.startsWith('image/')) return 'image';
  if (type.startsWith('video/')) return 'video';
  if (type.startsWith('audio/')) return 'audio';
  if (type === 'application/pdf') return 'pdf';
  if (type.includes('spreadsheet') || type.includes('csv') || type.includes('excel')) return 'spreadsheet';
  if (type.includes('presentation') || type.includes('powerpoint')) return 'presentation';
  if (type.includes('document') || type.includes('word') || type.includes('text')) return 'document';
  if (type.includes('zip') || type.includes('rar') || type.includes('tar') || type.includes('gzip')) return 'archive';
  return 'other';
}

function formatSize(bytes) {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export default function FileUploader({ onUploadComplete }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploads, setUploads] = useState([]);
  const inputRef = useRef(null);

  const processFiles = useCallback(async (fileList) => {
    const files = Array.from(fileList);
    const newUploads = files.map(f => ({
      id: crypto.randomUUID(),
      file: f,
      name: f.name,
      size: f.size,
      status: 'uploading',
    }));

    setUploads(prev => [...newUploads, ...prev]);

    for (const upload of newUploads) {
      const { file } = upload;
      const { file_url } = await apiClient.integrations.Core.UploadFile({ file });
      await apiClient.entities.UploadedFile.create({
        name: file.name,
        file_url,
        file_type: getFileCategory(file),
        mime_type: file.type,
        size_bytes: file.size,
        tags: [],
        is_favorite: false,
      });
      setUploads(prev =>
        prev.map(u => u.id === upload.id ? { ...u, status: 'done' } : u)
      );
    }

    onUploadComplete?.();
  }, [onUploadComplete]);

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => { e.preventDefault(); setIsDragging(false); processFiles(e.dataTransfer.files); };

  const removeUpload = (id) => {
    setUploads(prev => prev.filter(u => u.id !== id));
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300",
          isDragging
            ? "border-primary bg-primary/5 scale-[1.01]"
            : "border-border hover:border-primary/40 hover:bg-accent/30"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => processFiles(e.target.files)}
        />
        <motion.div
          animate={isDragging ? { scale: 1.1, y: -4 } : { scale: 1, y: 0 }}
          className="flex flex-col items-center gap-4"
        >
          <div className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center transition-colors",
            isDragging ? "bg-primary/10" : "bg-accent"
          )}>
            <Upload className={cn("w-7 h-7", isDragging ? "text-primary" : "text-muted-foreground")} />
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground">
              {isDragging ? 'Drop files here' : 'Drag & drop files here'}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              or <span className="text-primary font-medium">browse</span> to choose files
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            Supports images, documents, PDFs, videos, and more
          </p>
        </motion.div>
      </div>

      <AnimatePresence>
        {uploads.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            {uploads.map((upload) => (
              <motion.div
                key={upload.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-3 bg-card rounded-xl p-3 border border-border"
              >
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                  <FileText className="w-5 h-5 text-accent-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{upload.name}</p>
                  <p className="text-xs text-muted-foreground">{formatSize(upload.size)}</p>
                </div>
                {upload.status === 'uploading' ? (
                  <Loader2 className="w-5 h-5 text-primary animate-spin" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                )}
                {upload.status === 'done' && (
                  <button onClick={() => removeUpload(upload.id)} className="text-muted-foreground hover:text-foreground">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}