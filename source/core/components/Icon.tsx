import Compose from '../assets/icons/compose.svg';
import { useTheme } from '../hooks';

const iconMap = {
  compose: Compose,
};

type IconProps = {
  name: keyof typeof iconMap;
  size?: number;
  color?: string;
  style?: any;
};

export const Icon = ({ name, size = 24, color, style }: IconProps) => {
  const { theme } = useTheme();
  const IconComponent = iconMap[name];
  const resolvedColor = color ?? theme.colors.iconPrimary;
  const width = size;
  const height = size;

  return (
    <IconComponent
      width={width}
      height={height}
      color={resolvedColor}
      style={style}
    />
  );
};
