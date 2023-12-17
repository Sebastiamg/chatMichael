import {Alert} from 'react-native';

export function checkInputs(...args: string[]) {
  for (let i = 0; i < args.length; i++) {
    if (!args[i].length) {
      return false;
    }
  }

  return true;
}

export function AlertError(
  title = '',
  body = '',
  isError = false,
  error?: any,
) {
  return Alert.alert(
    isError ? `Error ${error.response.status}` : title,
    isError ? error.response.data.error : body,
    [
      {
        style: 'cancel',
      },
    ],
  );
}
