export default {
    widgets: [
        {
            name: 'project-users'
        },
        {
            name: 'document-list',
            options: {
                title: 'Last Edited Residencies',
                order: '_updatedAt desc',
                types: ['residency'],
            },
            layout: {
                width: 'auto',
                height: 'large'
            }
        },
        {
            name: 'netlify',
            options: {
                title: 'Netlify Deploys',
                sites: [
                    {
                        title: 'itspicnic.co',
                        apiId: 'b3f05e53-1092-431f-a01e-1c9aad4a34e0',
                        buildHookId: '5f55efa5c1f09715d9158965',
                        name: 'itspicnic'
                    }
                ]
            }
        }
    ]
}