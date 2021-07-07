import '../src/App.css'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'dark',
    values: [
      {
        name: 'dark',
        value: '#1D1D1B',
      },
      {
        name: 'gray',
        value: '#646363',
      },
      {
        name: 'light',
        value: '#f6f9fc',
      },
    ],
  },
}
