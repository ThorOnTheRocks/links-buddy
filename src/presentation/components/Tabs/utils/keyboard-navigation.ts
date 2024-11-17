export const KEYS = {
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  HOME: 'Home',
  END: 'End',
} as const;

type Orientation = 'horizontal' | 'vertical';

export const createKeyboardNavigationHandler = (
  selector: string,
  orientation: Orientation = 'horizontal'
) => {
  return (event: React.KeyboardEvent) => {
    const availableTabs = Array.from(
      document.querySelectorAll<HTMLElement>(selector)
    ).filter((tab) => !tab.hasAttribute('disabled'));

    const currentIndex = availableTabs.indexOf(
      document.activeElement as HTMLElement
    );

    if (currentIndex === -1 || availableTabs.length === 0) {
      return;
    }

    let nextIndex = currentIndex;

    switch (event.key) {
      case orientation === 'horizontal'
        ? KEYS.ARROW_LEFT
        : KEYS.ARROW_UP:
        event.preventDefault();
        nextIndex = currentIndex - 1;
        if (nextIndex < 0) {
          nextIndex = availableTabs.length - 1;
        }
        break;

      case orientation === 'horizontal'
        ? KEYS.ARROW_RIGHT
        : KEYS.ARROW_DOWN:
        event.preventDefault();
        nextIndex = currentIndex + 1;
        if (nextIndex >= availableTabs.length) {
          nextIndex = 0;
        }
        break;

      case KEYS.HOME:
        event.preventDefault();
        nextIndex = 0;
        break;

      case KEYS.END:
        event.preventDefault();
        nextIndex = availableTabs.length - 1;
        break;

      default:
        return;
    }

    availableTabs[nextIndex]?.focus();
  };
};
