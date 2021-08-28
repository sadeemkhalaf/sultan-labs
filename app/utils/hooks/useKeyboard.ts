import {useEffect, useState} from 'react';
import {Keyboard, KeyboardEvent} from 'react-native';

export const useKeyboard = (): [boolean, number] => {
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const onKeyboardDidShow = (event: KeyboardEvent): void => {
      setKeyboardOpen(true);
      setKeyboardHeight(event.endCoordinates.height);
    };

    const onKeyboardDidHide = (): void => {
      setKeyboardOpen(false);
      setKeyboardHeight(0);
    };

    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);

    return (): void => {
      Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
    };
  }, []);

  return [keyboardOpen, keyboardHeight];
};
