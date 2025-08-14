'use client';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

export default function PDFModal({ open, onClose, url }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>Materials</DialogTitle>
      <DialogContent dividers sx={{ p: 0 }}>
        {url ? (
          <iframe title="pdf" src={url} style={{ width: '100%', height: '80vh', border: 0 }} />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}


