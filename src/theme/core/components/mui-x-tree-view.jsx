// ----------------------------------------------------------------------

const MuiTreeItem = {
  // ▼▼▼▼▼▼▼▼ 🎨 STYLE ▼▼▼▼▼▼▼▼
  styleOverrides: {
    label: ({ theme }) => ({
      ...theme.typography.body2,
    }),
    iconContainer: {
      width: 'auto',
    },
  },
};

/* **********************************************************************
 * 🚀 Export
 * **********************************************************************/
export const treeView = {
  MuiTreeItem,
};
