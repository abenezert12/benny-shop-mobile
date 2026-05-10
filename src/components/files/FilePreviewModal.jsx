import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Star, Trash2, Calendar, HardDrive, FileType } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

function formatSize(bytes) {
  if (!bytes) return '—';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export default function FilePreviewModal({ file, open, onClose, onToggleFavorite, onDelete }) {
  if (!file) return null;

  const isImage = file.file_type === 'image';
  const isPdf = file.file_type === 'pdf';
  const isVideo = file.file_type === 'video';
  const isAudio = file.file_type === 'audio';

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        {/* Preview */}
        <div className="bg-muted rounded-t-lg">
          {isImage && (
            <img src={file.file_url} alt={file.name} className="w-full max-h-[50vh] object-contain rounded-t-lg" />
          )}
          {isPdf && (
            <iframe src={file.file_url} className="w-full h-[50vh] rounded-t-lg" title={file.name} />
          )}
          {isVideo && (
            <video src={file.file_url} controls className="w-full max-h-[50vh] rounded-t-lg" />
          )}
          {isAudio && (
            <div className="p-12 flex items-center justify-center">
              <audio src={file.file_url} controls className="w-full max-w-md" />
            </div>
          )}
          {!isImage && !isPdf && !isVideo && !isAudio && (
            <div className="p-12 flex flex-col items-center justify-center gap-4">
              <FileType className="w-16 h-16 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Preview not available</p>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="p-6 space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-xl font-bold truncate">{file.name}</h2>
              {file.description && (
                <p className="text-sm text-muted-foreground mt-1">{file.description}</p>
              )}
            </div>
            <div className="flex gap-2 shrink-0">
              <Button
                variant="outline"
                size="icon"
                onClick={() => onToggleFavorite(file)}
                className="rounded-xl"
              >
                <Star className={cn("w-4 h-4", file.is_favorite ? "fill-amber-400 text-amber-400" : "")} />
              </Button>
              <a href={file.file_url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" className="rounded-xl">
                  <Download className="w-4 h-4" />
                </Button>
              </a>
              <Button
                variant="outline"
                size="icon"
                onClick={() => { onDelete(file); onClose(false); }}
                className="rounded-xl text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-accent/50 rounded-xl p-4 flex items-center gap-3">
              <FileType className="w-5 h-5 text-accent-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Type</p>
                <p className="text-sm font-medium capitalize">{file.file_type}</p>
              </div>
            </div>
            <div className="bg-accent/50 rounded-xl p-4 flex items-center gap-3">
              <HardDrive className="w-5 h-5 text-accent-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Size</p>
                <p className="text-sm font-medium">{formatSize(file.size_bytes)}</p>
              </div>
            </div>
            <div className="bg-accent/50 rounded-xl p-4 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-accent-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Uploaded</p>
                <p className="text-sm font-medium">
                  {file.created_date ? format(new Date(file.created_date), 'MMM d, yyyy') : '—'}
                </p>
              </div>
            </div>
          </div>

          {file.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {file.tags.map((tag, i) => (
                <Badge key={i} variant="secondary" className="rounded-full">{tag}</Badge>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}