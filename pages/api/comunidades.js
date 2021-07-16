import { SiteClient } from 'datocms-client'

export default async function requestReciever (req, res) {

    if (req.method === 'POST'){
        const TOKEN = '4fc29f9f1ce5ad8532bd261adb7e5b'
        const client = new SiteClient(TOKEN);
    
        const registroCriado = await client.items.create({
            itemType: '972338',
            ...req.body, //deixamos de forma responsiva os dados
/*             title: 'Comunidade teste',
            imageUrl: 'https://github.com/brunolbahiense.png',
            creatorSlug: 'Bluis', */
    
        })

        res.json({
            dados: 'dado AQUI 🚀',
            registroCriado: registroCriado,
        })

        return
    }

    res.status(404).json({
        messsage: 'Infelizmente ainda não recebemos o GET 🙁'
    })
}