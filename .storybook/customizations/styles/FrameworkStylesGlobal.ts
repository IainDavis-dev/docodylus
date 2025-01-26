const frameworkStyles = {
    name: 'Framework Styles',
    description: 'Switch between styles of various frameworks',
    defaultValue: 'default',
    toolbar: {
        items: [
            { value: 'default', title: 'Default styles'},
            { value: 'docusaurus', title: 'Docusaurus styles'}
        ],
        dynamicTitle: true
    },
}

export default frameworkStyles;