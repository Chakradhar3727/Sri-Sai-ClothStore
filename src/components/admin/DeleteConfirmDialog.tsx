import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-md border border-red-500/40 bg-zinc-950 p-6 text-white sm:rounded-2xl shadow-2xl">
        <DialogHeader className="text-left space-y-2">
          <div className="flex items-center gap-2 text-rose-400">
            <AlertTriangle className="h-5 w-5" />
            <span className="text-xs font-bold tracking-widest uppercase">Destructive Action</span>
          </div>
          <DialogTitle className="font-serif text-xl font-bold text-white">
            Remove Saree Consignment?
          </DialogTitle>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Are you sure you want to delete this saree consignment from the catalog? This action will remove it from all storefront grids and customer search indices.
          </p>
        </DialogHeader>

        <div className="mt-5 flex justify-end gap-2.5">
          <Button variant="outline" onClick={onClose} className="border-zinc-800 text-zinc-300 text-xs">
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs"
          >
            Confirm Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
