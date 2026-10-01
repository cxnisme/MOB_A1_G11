// Design tokens: colors, radii, fonts, hairline borders. Member 1 (Product and UX lead) owns this file.

// Turn the XDR light filter overlay on or off (see components/XdrFilter.tsx).
export const XDR_FILTER_ENABLED = true;

export const colors = {
  bg: '#F5F4F1',
  surface: '#FFFFFF',
  surfaceSoft: '#FCFCFB',
  surfaceGlass: 'rgba(255,255,255,0.55)',
  ink: '#16161A',
  ink2: '#4A4A52',
  ink3: '#6E6E76',
  nav: '#048475',
  nav2: '#036A5E',
  danger: '#C02E2E',
  tile: '#EFEDE8',
};

export const radii = { xl: 25.5, lg: 23.5, md: 17.5, sm: 11.5, xs: 8.5 };

export const fonts = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  extrabold: 'Inter_800ExtraBold',
  mono: 'JetBrainsMono_500Medium',
  monoBold: 'JetBrainsMono_600SemiBold',
};

// Gradient hairline borders (the 1px gradient outlines of the design).
export const hairlines = {
  default: {
    colors: ['rgba(22,22,26,0.15)', 'rgba(22,22,26,0.04)', 'rgba(4,132,117,0.15)'],
    locations: [0, 0.45, 1],
  },
  focus: {
    colors: ['rgba(4,132,117,0.65)', 'rgba(4,132,117,0.2)', 'rgba(4,132,117,0.2)'],
    locations: [0, 0.6, 1],
  },
  error: {
    colors: ['rgba(224,82,82,0.75)', 'rgba(224,82,82,0.3)', 'rgba(224,82,82,0.3)'],
    locations: [0, 0.6, 1],
  },
  dock: {
    colors: ['rgba(255,255,255,0.85)', 'rgba(22,22,26,0.1)', 'rgba(4,132,117,0.24)'],
    locations: [0, 0.5, 1],
  },
} as const;

export type HairlineTone = keyof typeof hairlines;

// Dot colors for Low / Medium / High.
export const levelColors = { Low: '#22C55E', Medium: '#F97316', High: '#E05252' } as const;
