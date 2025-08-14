"use client";

import dynamic from 'next/dynamic';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import PDFModal from 'src/components/PDFModal';
import SessionChat from 'src/components/session/SessionChat';
import SessionLobby from 'src/components/session/SessionLobby';
import { joinCall, leaveCall } from 'src/services/streamService';

const CallUI = dynamic(() => Promise.resolve(CallPlaceholder), { ssr: false });

function CallPlaceholder() {
  return <div style={{ height: 360, background: '#111', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Video Call Placeholder</div>;
}

export default function ProfessionalSessionCallPage() {
  const [inCall, setInCall] = useState(false);
  const [pdfOpen, setPdfOpen] = useState(false);
  const bookingStart = new Date(Date.now() + 2 * 60 * 1000).toISOString();

  const handleJoin = async () => {
    await joinCall({ streamCallId: 'demo-call' });
    setInCall(true);
  };

  const handleLeave = async () => {
    await leaveCall();
    setInCall(false);
  };

  return (
    <div style={{ padding: 24 }}>
      <Stack spacing={2}>
        <Typography variant="h5">Professional Session Call</Typography>
        {!inCall ? (
          <SessionLobby startTime={bookingStart} onJoin={handleJoin} />
        ) : (
          <>
            <CallUI />
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" onClick={() => setPdfOpen(true)}>Open PDF</Button>
              <Button variant="contained" color="error" onClick={handleLeave}>Leave</Button>
            </Stack>
            <SessionChat />
          </>
        )}
      </Stack>
      <PDFModal open={pdfOpen} onClose={() => setPdfOpen(false)} url="https://docs.google.com/gview?embedded=1&url=" />
    </div>
  );
}


