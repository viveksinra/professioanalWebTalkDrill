"use client";

import { useCallback, useEffect, useMemo, useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';

import { professionalService } from 'src/services/professionalService';
import PayoutSettingsDialog from 'src/components/PayoutSettingsDialog';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'date', headerName: 'Date', width: 150 },
  { field: 'amount', headerName: 'Amount', width: 120 },
  { field: 'type', headerName: 'Type', width: 120 },
];

export default function EarningsPage() {
  const [rows, setRows] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 25 });
  const [sortingModel, setSortingModel] = useState([]);
  const [query, setQuery] = useState('');
  const [openPayout, setOpenPayout] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const sort = sortingModel?.[0];
      const params = {
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
        search: query || undefined,
        sortBy: sort?.field,
        sortDir: sort?.sort,
      };
      const data = await professionalService.getTransactions(params).catch(() => ({ items: [], total: 0 }));
      const items = data?.items || [];
      const total = data?.total || 0;
      setRows(items.map((it, idx) => ({ id: it.id ?? `${params.page}-${idx}`, ...it })));
      setRowCount(total);
    } finally {
      setLoading(false);
    }
  }, [paginationModel, sortingModel, query]);

  useEffect(() => {
    const t = setTimeout(fetchData, 300);
    return () => clearTimeout(t);
  }, [fetchData]);

  const slots = useMemo(
    () => ({
      toolbar: () => (
        <Stack direction="row" spacing={1} sx={{ p: 1 }}>
          <TextField
            size="small"
            placeholder="Search transactions"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button variant="outlined" onClick={() => setOpenPayout(true)}>Payout Settings</Button>
        </Stack>
      ),
    }),
    [query]
  );

  return (
    <div style={{ padding: 24 }}>
      <div style={{ height: 520, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          rowCount={rowCount}
          paginationMode="server"
          sortingMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          sortingModel={sortingModel}
          onSortingModelChange={setSortingModel}
          slots={slots}
        />
      </div>

      <PayoutSettingsDialog open={openPayout} onClose={() => setOpenPayout(false)} onSave={() => {}} />
    </div>
  );
}


