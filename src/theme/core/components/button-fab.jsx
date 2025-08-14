import { varAlpha } from 'minimal-shared/utils';

import { fabClasses } from '@mui/material/Fab';

// ----------------------------------------------------------------------

const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'];

const FILLED_VARIANTS = ['circular', 'extended'];
const OUTLINED_VARIANTS = ['outlined', 'outlinedExtended'];
const SOFT_VARIANTS = ['soft', 'softExtended'];
const EXTENDED_VARIANTS = ['extended', 'outlinedExtended', 'softExtended'];

const DIMENSIONS = {
  small: { height: 34, minHeight: 34, borderRadius: 34 / 2 },
  medium: { height: 40, minHeight: 40, borderRadius: 40 / 2 },
  large: { height: 48, minHeight: 48, borderRadius: 48 / 2 },
};

function isVariantAllowed(allowed, variant) {
  return !!variant && allowed.includes(variant);
}

/* **********************************************************************
 * 🗳️ Variants
 * **********************************************************************/
const filledVariants = [
  {
    props: (props) => isVariantAllowed(FILLED_VARIANTS, props.variant) && props.color === 'default',
    style: ({ theme }) => ({
      ...theme.mixins.filledStyles(theme, 'default', { hover: true }),
      boxShadow: theme.vars.customShadows.z8,
    }),
  },
  {
    props: (props) => isVariantAllowed(FILLED_VARIANTS, props.variant) && props.color === 'inherit',
    style: ({ theme }) => ({
      ...theme.mixins.filledStyles(theme, 'inherit', { hover: true }),
      boxShadow: theme.vars.customShadows.z8,
    }),
  },
  ...COLORS.map((colorKey) => ({
    props: (props) => isVariantAllowed(FILLED_VARIANTS, props.variant) && props.color === colorKey,
    style: ({ theme }) => ({
      boxShadow: theme.vars.customShadows[colorKey],
    }),
  })),
];

const outlinedVariants = [
  {
    props: (props) => isVariantAllowed(OUTLINED_VARIANTS, props.variant),
    style: ({ theme }) => ({
      borderWidth: 1,
      boxShadow: 'none',
      borderStyle: 'solid',
      backgroundColor: 'transparent',
      '&:hover': {
        borderColor: 'currentColor',
        boxShadow: '0 0 0 0.75px currentColor',
        backgroundColor: theme.vars.palette.action.hover,
      },
    }),
  },
  {
    props: (props) =>
      isVariantAllowed(OUTLINED_VARIANTS, props.variant) && props.color === 'default',
    style: ({ theme }) => ({
      color: theme.vars.palette.text.secondary,
      borderColor: theme.vars.palette.shared.buttonOutlined,
    }),
  },
  {
    props: (props) =>
      isVariantAllowed(OUTLINED_VARIANTS, props.variant) && props.color === 'inherit',
    style: {
      borderColor: 'currentColor',
    },
  },
  ...COLORS.map((colorKey) => ({
    props: (props) =>
      isVariantAllowed(OUTLINED_VARIANTS, props.variant) && props.color === colorKey,
    style: ({ theme }) => ({
      color: theme.vars.palette[colorKey].main,
      borderColor: varAlpha(theme.vars.palette[colorKey].mainChannel, 0.48),
      '&:hover': {
        backgroundColor: varAlpha(theme.vars.palette[colorKey].mainChannel, 0.08),
      },
    }),
  })),
];

const softVariants = [
  {
    props: (props) => isVariantAllowed(SOFT_VARIANTS, props.variant),
    style: {
      boxShadow: 'none',
    },
  },
  {
    props: (props) => isVariantAllowed(SOFT_VARIANTS, props.variant) && props.color === 'default',
    style: ({ theme }) => ({
      ...theme.mixins.softStyles(theme, 'default', { hover: true }),
    }),
  },
  {
    props: (props) => isVariantAllowed(SOFT_VARIANTS, props.variant) && props.color === 'inherit',
    style: ({ theme }) => ({
      ...theme.mixins.softStyles(theme, 'inherit', { hover: true }),
    }),
  },
  ...COLORS.map((colorKey) => ({
    props: (props) => isVariantAllowed(SOFT_VARIANTS, props.variant) && props.color === colorKey,
    style: ({ theme }) => ({
      color: theme.vars.palette[colorKey].dark,
      backgroundColor: varAlpha(theme.vars.palette[colorKey].mainChannel, 0.16),
      ...theme.applyStyles('dark', {
        color: theme.vars.palette[colorKey].light,
      }),
      '&:hover': {
        backgroundColor: varAlpha(theme.vars.palette[colorKey].mainChannel, 0.32),
      },
    }),
  })),
];

const sizeVariants = [
  {
    props: (props) => isVariantAllowed(EXTENDED_VARIANTS, props.variant),
    style: ({ theme }) => ({
      width: 'auto',
      gap: theme.spacing(1),
      padding: theme.spacing(0, 2),
    }),
  },
  {
    props: (props) => isVariantAllowed(EXTENDED_VARIANTS, props.variant) && props.size === 'small',
    style: ({ theme }) => ({
      ...DIMENSIONS.small,
      gap: theme.spacing(0.5),
      padding: theme.spacing(0, 1),
    }),
  },
  {
    props: (props) => isVariantAllowed(EXTENDED_VARIANTS, props.variant) && props.size === 'medium',
    style: { ...DIMENSIONS.medium },
  },
  {
    props: (props) => isVariantAllowed(EXTENDED_VARIANTS, props.variant) && props.size === 'large',
    style: { ...DIMENSIONS.large },
  },
];

const disabledVariants = [
  {
    props: (props) => !!props.disabled && isVariantAllowed(OUTLINED_VARIANTS, props.variant),
    style: ({ theme }) => ({
      [`&.${fabClasses.disabled}`]: {
        backgroundColor: 'transparent',
        borderColor: theme.vars.palette.action.disabledBackground,
      },
    }),
  },
];

/* **********************************************************************
 * 🧩 Components
 * **********************************************************************/
const MuiFab = {
  // ▼▼▼▼▼▼▼▼ ⚙️ PROPS ▼▼▼▼▼▼▼▼
  defaultProps: {
    color: 'primary',
  },
  // ▼▼▼▼▼▼▼▼ 🎨 STYLE ▼▼▼▼▼▼▼▼
  styleOverrides: {
    root: {
      '&:hover': { boxShadow: 'none' },
      variants: [
        ...filledVariants,
        ...outlinedVariants,
        ...softVariants,
        ...sizeVariants,
        ...disabledVariants,
      ],
    },
  },
};

/* **********************************************************************
 * 🚀 Export
 * **********************************************************************/
export const fab = {
  MuiFab,
};
