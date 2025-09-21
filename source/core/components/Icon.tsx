import ArrowDown from '../assets/icons/arrow-down.svg';
import ArrowUpAlt from '../assets/icons/arrow-up-alt.svg';
import Checkmark from '../assets/icons/checkmark.svg';
import Compose from '../assets/icons/compose.svg';
import Menu from '../assets/icons/menu.svg';
import Microphone from '../assets/icons/microphone.svg';
import More from '../assets/icons/more.svg';
import Plus from '../assets/icons/plus.svg';
import Soundwave from '../assets/icons/soundwave.svg';
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
  checkmark: Checkmark,
  plus: Plus,
  'arrow-up-alt': ArrowUpAlt,
  soundwave: Soundwave,
  microphone: Microphone,
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
