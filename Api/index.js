const express = require('express')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const swaggerDocs = require('./swagger.json')
const {body, validationResult} = require('express-validator')
//const mysql = require('./mysql').pool
const db = require("./db")

const api = express()

api.use(express.json())
api.use(cors())

api.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs))

const tarifa = [
    {
        origem: 11, 
        destino: 16,
        tarifa: 1.90
    },
    
    {
        origem: 16, 
        destino: 11,
        tarifa: 2.90
    },
    
    {
        origem: 11,
        destino: 17,
        tarifa: 1.70
    },
    
    {
        origem: 17,
        destino: 11,
        tarifa: 2.70
    },
    
    {
        origem: 11,
        destino: 18,
        tarifa: 0.90
    },
    
    {
        origem: 18,
        destino: 11,
        tarifa: 1.90
    }
]

const planos = [
    {
        nomePlano: "FaleMais30",
        valor: 30
    },
    
    {
        nomePlano: "FaleMais60",
        valor: 60
    },
    
    {
        nomePlano: "FaleMais120",
        valor: 120
    }
]

api.get("/buscar/ddd", async (req, res) => {
    
     try {
        /* const ddd = {
            origem: [11,16,17,18],
            destino: [11,16,17,18],
            planosFalemais:["FaleMais30", "FaleMais60", "FaleMais120"]
        } */
        const tarifas = await db.selectTarifas()
            const planosBanco = await db.selectPlanos()
            //console.log(tarifas, planosBanco)
        
            return res.json(200, {tarifas, planosBanco})
    } catch (error) {
        return res.status(500).json({msgErro: "Erro interno do servidor"})
    } 
     
}) 

api.post("/simulacao", [
    body("origem").isNumeric().withMessage("DDD de origem precisa ser selecionado."),
    body("destino").isNumeric().withMessage("DDD de destino precisa ser selecionado."),
    body("planosFalemais").isString().withMessage("Um plano Vxtel FaleMais precisa ser selecionado."),
    body("tempo").isNumeric().withMessage("É necessário informar o tempo da ligação.")
], (req, res) => {
    try {
        const errors = validationResult(req)
        const error = errors.array()
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: error.map(function(item){
            return item.msg
        })})
    }
    

        const dados = {
            origem: req.body.origem,
            destino: req.body.destino, 
            planos: req.body.planosFalemais, 
            tempo: req.body.tempo
        }
        
        const tarifa = [
    {
        origem: 11, 
        destino: 16,
        tarifa: 1.90
    },
    
    {
        origem: 16, 
        destino: 11,
        tarifa: 2.90
    },
    
    {
        origem: 11,
        destino: 17,
        tarifa: 1.70
    },
    
    {
        origem: 17,
        destino: 11,
        tarifa: 2.70
    },
    
    {
        origem: 11,
        destino: 18,
        tarifa: 0.90
    },
    
    {
        origem: 18,
        destino: 11,
        tarifa: 1.90
    }
]

const planos = [
    {
        nomePlano: "FaleMais30",
        valor: 30
    },
    
    {
        nomePlano: "FaleMais60",
        valor: 60
    },
    
    {
        nomePlano: "FaleMais120",
        valor: 120
    }
]

        const findTarifa = tarifa.filter(function(item) {
            return (
                item.origem == dados.origem && item.destino == dados.destino
            )
        })
        
        const semPlano = findTarifa[0].tarifa * dados.tempo
    
        const tempoPlano = planos.filter(function(item) {
            return (
                item.nomePlano == dados.planos
            )
        })
        
        let comPlano = 0
        
        if (tempoPlano.length > 0 && dados.tempo > tempoPlano[0].valor) {
            const tempoAcobrar = dados.tempo - tempoPlano[0].valor
            const tarifaAdcional = findTarifa[0].tarifa * tempoAcobrar * 0.10
            comPlano = tarifaAdcional + (tempoAcobrar * findTarifa[0].tarifa)
        }
        
        const valorCalculado = {
            valorComPlano: comPlano,
            valorSemPlano: semPlano
        }
        
        return res.status(200).json(valorCalculado)

    } catch (e) {
        return res.status(500).json({msgErro: "Erro interno do servidor"})

    }
})

const rodolfao = {
    tipoRodolfao: "cumendo todas casadas!"
}

api.get("/buscar/casadas", (req, res) => {
   return res.json(rodolfao)
})


api.listen(3001, () => {
    console.log("Servidor iniciado na porta 3001: http://localhost:3001/")
})