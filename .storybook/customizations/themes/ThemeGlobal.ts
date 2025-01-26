const themeGlobal = {
    name: 'Theme',
    description: 'Switch between light and dark theme',
    defaultValue: 'light',
    toolbar: {
        items: [
            { value: 'light', title: 'light theme', icon: 'sun'},
            { value: 'dark', title: 'dark theme', icon: 'moon'}
        ],
    },
}

export default themeGlobal;