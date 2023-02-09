import express from 'express'
import Correios from 'correios.js'
import z from 'zod'

const app = express()
const correios = new Correios()
app.use(express.json())

app.get('/track', async (req, res) => {
    try {
        const trackQueryParams = z.object({
            code: z.string()
        })

        const {code} = trackQueryParams.parse(req.query)
        const response = await correios.track(code)

        res.send(response).json().status(200)

    } catch (error) {
        res.status(500)
        res.send({error: `Não foi possível completar a requisação: ${error}`}).json()
    }
})

app.listen(3002, () => {
    console.log('Microsserviço iniciado na porta 3002')
})
