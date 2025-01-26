const themeGlobal = {
    name: 'Theme',
    description: 'Switch between light and dark theme',
    defaultValue: 'light',
    toolbar: {
        items: [
            { value: 'light', title: 'light theme', icon: 'circle'},
            { value: 'dark', title: 'dark theme', icon: 'circlehollow'}
        ],
        dynamicTitle: true
    },
}

export default themeGlobal;