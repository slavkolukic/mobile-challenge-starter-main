import ArrowDown from '../assets/icons/arrow-down.svg';
import Compose from '../assets/icons/compose.svg';
import Menu from '../assets/icons/menu.svg';
import More from '../assets/icons/more.svg';
import TemporaryChatOff from '../assets/icons/temporary-chat-off.svg';
import TemporaryChatOn from '../assets/icons/temporary-chat-on.svg';
import { useTheme } from '../hooks';

const iconMap = {
  compose: Compose,
  menu: Menu,
  'temporary-chat-off': TemporaryChatOff,
  'temporary-chat-on': TemporaryChatOn,
  more: More,
  'arrow-down': ArrowDown,
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
