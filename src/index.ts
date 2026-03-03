import Typewriter from './Typewriter';
import Cursor from './Cursor';

export { Typewriter, Cursor };
export { useTypewriter } from './useTypewriter';
export { type, pause, deleteAll, deleteChars } from './actions';
export type {
  Action,
  TypeAction,
  DeleteAction,
  PauseAction,
  DelayRange,
  Phase,
  ActionBuilders,
  TypewriterOptions,
  TypewriterProps,
  CursorProps,
  UseTypewriterResult,
} from './types';

export default Typewriter;
