import { ThemeProvider } from '@emotion/react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import Root from './navigation/Root';
import { darkTheme, lightTheme } from './common/theme';
import { DarkTheme } from '@react-navigation/native';

export default function App() {
  const isDark = useColorScheme() === 'dark';
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}
