import { useState, useEffect } from 'react'
import './forms.css'
import api from '../../../main/api'
import { useForm } from "react-hook-form";

export function Forms() {
  const [origem, setOrigem] = useState([]);
  const [destino, setDestino] = useState([]);
  const [planosFalemais, setPlanosFalemais] = useState([]);
  const [enviarDados, setEnviarDados] = useState({});
  const [resultadoTarifa, setResultadoTarifa] = useState({});
  const [errorResponse, setErrorResponse] = useState('');
  const [loadingResponse, setLoadingResponse] = useState(null);
  const [calculoFeito, setCalculoFeito] = useState(false)

  const { register, handleSubmit, formState: {errors} } = useForm();

  useEffect(() => {
    const fetchDataPlanos = async () => {
      try {
        setLoadingResponse(true)
        const response = await api.get('/buscar/ddd')
        const { origem, destino, planosFalemais } = response.data
  
        setOrigem(origem)
        setDestino(destino)
        setPlanosFalemais(planosFalemais)
      } catch(err) {
        setErrorResponse(err)
      } finally {
        setLoadingResponse(false)
      }
    }

    fetchDataPlanos()
  }, []);

  const handleSelectChange = (event) => {
    const { value, name } = event.target
    setEnviarDados((state) => {
      return {
        ...state,
        [name]: value
      }
    })
  }

  const calcularTarifasComESemPlano = async () => {
    const response = await api.post("/simulacao", enviarDados)

    const { valorComPlano, valorSemPlano } = response.data
    const resultadoTarifas = {
      valorComPlano,
      valorSemPlano
    }
    setResultadoTarifa(resultadoTarifas)
    setCalculoFeito(true)
  }
  
  return (
    <div className="container-form">
      {errorResponse ? (
        <p>Aconteceu algo inesperado, por favor tente novamente!</p>
      ) : (
        loadingResponse ? (<p>Carregando...</p>) : (
          <form onSubmit={handleSubmit(calcularTarifasComESemPlano)}>
            <section className="section__form">                  
              <div className="form-group">
                <select 
                  className="form-control"
                  name="origem"
                  {...register("origem", { required: true })}
                  onChange={handleSelectChange}
                  >
                  <option>Origem</option>
                  {origem?.map((valorOrigem, i) => (
                    <option key={`item-${valorOrigem}-${i}`}>{valorOrigem}</option>
                  ))}
                </select> 
              </div>       
              <div className="form-group">
                <select
                  className="form-control"
                  name="destino"
                  {...register("destino", { required: true })}
                  onChange={handleSelectChange}>
                  <option>Destino</option>
                  {destino.map((valueDestino, i) => (
                    <option key={`${valueDestino}-${i}`}>{valueDestino}</option>
                  ))}
                </select>
              </div>       
              <div className="form-group">
                <select
                  className="form-control"
                  name="planosFalemais"
                  required
                  {...register("planosFalemais")}
                  onChange={handleSelectChange}>
                  <option>Planos Falemais</option>
                  {planosFalemais.map((valuePlanosFaleMais, i) => (
                    <option key={`${valuePlanosFaleMais}-${i}`} value={valuePlanosFaleMais}>
                      {valuePlanosFaleMais}
                    </option>
                  ))}
                </select>
              </div>          
              <div className="form-group">
                <input 
                  type="text"
                  className="form-control"
                  name="tempo"
                  {...register("tempo", { required: true })}
                  onChange={handleSelectChange}
                  placeholder="Tempo da sua ligação" />
                  {errors.tempo && (<span className="errors">Campo obrigatório.</span>)}
              </div>
            </section>      
            <button 
              type="submit"
              className="btn button"
            >
              Calcular
            </button>
          </form>
        )
      )}
      
      {calculoFeito && (
          <section className="section">
            <div className="section-card">
              <p>
                Valor da tarifa com plano: {`R$ ${resultadoTarifa.valorComPlano}`}      
              </p>
              <p>
                Valor da tarifa sem o plano: {`R$ ${resultadoTarifa.valorSemPlano}`}     
              </p>
            </div>
          </section>
        )
      }
    </div>
  );
}
 
export default Forms
