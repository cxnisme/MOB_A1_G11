// All icons, drawn as SVG. Member 1 owns this file.
import React from 'react';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';

export type IconName =
  | 'home' | 'plus' | 'list' | 'camera' | 'image' | 'arrow' | 'back' | 'search' | 'close' | 'check'
  | 'status-draft' | 'status-progress' | 'status-review' | 'status-done'
  | 'cat-veg' | 'cat-grain' | 'cat-fruit' | 'cat-dairy' | 'cat-textile' | 'cat-meat';

type Props = { name: IconName; size?: number; color?: string };

function glyph(name: IconName, c: string) {
  const line = { fill: 'none', stroke: c, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
  switch (name) {
    case 'search':
      return (<><Circle cx={11} cy={11} r={6.4} {...line} strokeWidth={2} /><Path d="M15.6 15.6 20 20" {...line} strokeWidth={2} /></>);
    case 'home':
      return <Path d="M3.6 11 12 3.8 20.4 11V20a1 1 0 0 1-1 1h-4.2v-6.2H8.8V21H4.6a1 1 0 0 1-1-1v-9Z" {...line} strokeWidth={1.8} />;
    case 'plus':
      return (<><Circle cx={12} cy={12} r={8.6} {...line} strokeWidth={1.8} /><Path d="M12 8.3v7.4M8.3 12h7.4" {...line} strokeWidth={1.8} /></>);
    case 'list':
      return (<><Rect x={3.8} y={4.6} width={16.4} height={14.8} rx={3.2} {...line} strokeWidth={1.8} /><Path d="M7.8 9.4h8.4M7.8 13.2h5.2" {...line} strokeWidth={1.8} /></>);
    case 'camera':
      return (<><Path d="M3 8.6A2.4 2.4 0 0 1 5.4 6.2h1.7l1.1-1.6a1.4 1.4 0 0 1 1.2-.6h5.2a1.4 1.4 0 0 1 1.2.6l1.1 1.6h1.7A2.4 2.4 0 0 1 21 8.6v7.8a2.4 2.4 0 0 1-2.4 2.4H5.4A2.4 2.4 0 0 1 3 16.4V8.6Z" {...line} strokeWidth={1.7} /><Circle cx={12} cy={12.4} r={3.3} {...line} strokeWidth={1.7} /></>);
    case 'image':
      return (<><Rect x={3.8} y={4.8} width={16.4} height={14.4} rx={3.2} {...line} strokeWidth={1.7} /><Circle cx={9} cy={10} r={1.6} {...line} strokeWidth={1.7} /><Path d="M4.5 17l4.8-4.8 3.6 3.6 2.6-2.6 4 3.8" {...line} strokeWidth={1.7} /></>);
    case 'arrow':
      return <Path d="M5 12h13M12.5 6l6 6-6 6" {...line} strokeWidth={2.2} />;
    case 'back':
      return <Path d="M19 12H6M11.5 6 5.5 12l6 6" {...line} strokeWidth={2.2} />;
    case 'close':
      return <Path d="M6.5 6.5l11 11M17.5 6.5l-11 11" {...line} strokeWidth={2.2} />;
    case 'check':
      return <Path d="M5 12.5l4.5 4.5L19 7.5" {...line} strokeWidth={2.4} />;
    case 'status-draft':
      return <Circle cx={12} cy={12} r={8.5} {...line} strokeWidth={2.2} strokeDasharray="3.1 3.4" />;
    case 'status-progress':
      return (<><Circle cx={12} cy={12} r={8.5} fill={c} opacity={0.22} /><Path d="M12 3.5 A8.5 8.5 0 0 1 12 20.5 L12 12 Z" fill={c} /></>);
    case 'status-review':
      return (<><Circle cx={12} cy={12} r={8.5} fill={c} opacity={0.22} /><Path d="M12 3.5 A8.5 8.5 0 1 1 3.5 12 L12 12 Z" fill={c} /></>);
    case 'status-done':
      return (<><Circle cx={12} cy={12} r={8.5} fill={c} /><Path d="M8.3 12.3l2.5 2.5 4.9-5.2" fill="none" stroke="#FFFFFF" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" /></>);
    case 'cat-veg':
      return (<><Path d="M4.5 19.5C4.5 11 10.5 5 19.5 4.5c-.5 9-6.5 15-15 15Z" {...line} strokeWidth={1.7} /><Path d="M4.5 19.5 13 11" {...line} strokeWidth={1.7} /></>);
    case 'cat-grain':
      return (<><Path d="M12 21V6" {...line} strokeWidth={1.7} /><Path d="M12 10 8.6 7.6M12 10l3.4-2.4M12 14.2l-3.4-2.4M12 14.2l3.4-2.4M12 18.4l-3.4-2.4M12 18.4l3.4-2.4" {...line} strokeWidth={1.7} /></>);
    case 'cat-fruit':
      return (<><Circle cx={12} cy={14} r={6.6} {...line} strokeWidth={1.7} /><Path d="M12 7.4V5.4" {...line} strokeWidth={1.7} /><Path d="M12 5.2c1.8-.4 3.2-1.5 3.7-3-1.9-.2-3.3.9-3.7 3Z" {...line} strokeWidth={1.6} /></>);
    case 'cat-dairy':
      return <Path d="M12 3.6S5.2 11 5.2 15a6.8 6.8 0 0 0 13.6 0c0-4-6.8-11.4-6.8-11.4Z" {...line} strokeWidth={1.7} />;
    case 'cat-textile':
      return (<><Path d="M12 3.6 3.6 8 12 12.4 20.4 8 12 3.6Z" {...line} strokeWidth={1.7} /><Path d="M3.6 12 12 16.4 20.4 12M3.6 16 12 20.4 20.4 16" {...line} strokeWidth={1.7} /></>);
    case 'cat-meat':
      return (<><Ellipse cx={12} cy={12} rx={8.4} ry={6.6} {...line} strokeWidth={1.7} /><Ellipse cx={12} cy={12} rx={3} ry={2.2} {...line} strokeWidth={1.7} /></>);
  }
}

export function Icon({ name, size = 20, color = '#16161A' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityElementsHidden importantForAccessibility="no">
      {glyph(name, color)}
    </Svg>
  );
}
