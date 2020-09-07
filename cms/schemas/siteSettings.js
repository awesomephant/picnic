export default {
    name: 'siteSettings',
    type: 'document',
    title: 'Site Settings',
    __experimental_actions: ['update', 'publish'],
    fields: [
        {
            name: 'currentResidency',
            title: 'Active Residency',
            description: 'This will be linked on the homepage. Leave empty to hide the link.',
            type: 'reference',
            to: [{type: 'residency'}]
        },
    ]
}