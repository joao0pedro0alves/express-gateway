import express from 'express'
import Kurzer from 'kurzer-url'
import z from 'zod'

const kurzer = new Kurzer()
const app = express()
app.use(express.json())

app.get('/short', async (req, res) => {
    try {
        const shortQueryParams = z.object({
            url: z.string().url(),
        })

        const {url} = shortQueryParams.parse(req.query)
        const response = await kurzer.short(url)

        res.send(response).json().status(200)

    } catch (error) {
        res.status(500)
        res.send({error: `Não foi possível completar a requisação: ${error}`}).json()
    }
})

app.listen(3001, () => {
    console.log('Microsserviço iniciado na porta 3001')
})
