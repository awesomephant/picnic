export default {
    title: "Residency",
    name: "residency",
    type: "document",
    fields: [
        {
            title: "Publishing Date",
            name: "date",
            type: "date",
        },
        {
            title: "Artist Name",
            name: "artist_name",
            type: "string",
        },
        {
            title: "Artist Website",
            name: "website",
            type: "url",
        },
        {
            title: "Artist Support Link",
            name: "support_link",
            type: "url",
        },
        {
            title: 'Picnic Code',
            description: '(Copy + Paste from the editor)',
            name: 'code',
            type: 'code',
            options: {
                language: 'json'
            }
        }
    ]
}