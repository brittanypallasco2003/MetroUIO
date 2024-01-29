import { useEffect, useState } from 'react'
import logoMetro from '../assets/tren.webp'
import Mensajes from './Mensajes'

const Listar = ({estado}) => {
    const [rutas, setRutas] = useState([])
    
    useEffect(() => {
        //Verificar si la variable estado se ha cambiado
        //Verificar el tamaño del arreglo rutas
        if(estado || rutas.length>=0)
        {
            (async function () {
                //FETCH a la api y convertir en un JSON la respuesta
                try {
                    const respuesta = await (await fetch("http://localhost:3000/metro")).json()
                    //Asignar el resultado a la variable setRutas
                    setRutas(respuesta)
                    console.log("petición");
                }
                catch (error) {
                    console.log(error);
                }
            })()
        }
    }, [estado])
    return (
        <>
            {
          rutas.length === 0
              ?
              //Presentar el mensaje de alerta
              <Mensajes tipo={"bg-green-900"}>"No existe rutas creadas"</Mensajes>
              :
              //Recorrer el arreglo
              rutas.map((ruta) => (
                  <div key={ruta.id} className="p-2 rounded-xl sm:flex gap-12 bg-gray-200 shadow-xl mb-5">

                      <img src={logoMetro} alt="art cover" className="sm:w-3/12 object-cover rounded-lg" />

                      <div className="h-auto p-3 w-full">
                          <h4 className="text-2xl font-semibold text-cyan-900">{ruta.nombre}</h4>
                          <hr className="w-full border border-gray-300 my-2" />
                          <p className="text-gray-500">Sector: {ruta.sector}</p>
                          <p className="text-gray-500">Punto de salida: {ruta.salida}</p>
                          <p className="text-gray-500">Punto de llegada: {ruta.llegada}</p>
                          <p className="text-gray-500">Maquinista: {ruta.maquinista}</p>
                          <p className="text-gray-500">Detalles: {ruta.detalles}</p>
                          <div className='flex justify-between mt-3 lg:justify-end md:justify-end gap-3'>
                              <button className='bg-sky-900 text-white px-6 py-1 rounded-full'>Actualizar</button>
                              <button className='bg-red-900 text-white px-6 py-1 rounded-full'>Eliminar</button>
                          </div>
                      </div>
                  </div>
              ))
      }

        </>

    )
}

export default Listar