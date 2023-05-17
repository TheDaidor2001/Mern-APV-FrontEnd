import { useState } from "react";
import { AdminNav } from "../components/AdminNav";
import { Alerta } from "../components/Alerta";
import useAuth from "../hooks/useAuth";

export const CambiarPassword = () => {

    const [alerta, setAlerta] = useState({})
    const [password, setPassword] = useState({
        pwd_actual: '',
        pwd_nuevo: ''
    })

    const {guardarPassword} = useAuth();

    const handleSubmit = async e => {
        e.preventDefault()

        if(Object.values(password).some(campo => campo === '')){
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            })
            return
        }

        if(password.pwd_nuevo.length < 6){
            setAlerta({
                msg: "La contrasela debe tener mínimo 6 carácteres",
                error: true
            })
            return
        }

        const resultado = await guardarPassword(password)

        setAlerta(resultado)
        
    }


    const {msg} = alerta;
  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10">Cambiar Contraseña</h2>
      <p className="text-xl mt-5 mb-10 text-center">Modifica tu {""} 
        <span className="text-indigo-600 font-bold">Contraseña</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
            {msg && <Alerta alerta={alerta} />}
          <form
            onSubmit={handleSubmit}
          >
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Contraseña Actual
              </label>
              <input
                type="password"
                className="border bg-gray-100 w-full p-2 mt-5 rounded-lg"
                placeholder="Escribe tu Contraseña Actual"
                name="pwd_actual"
                onChange={e => setPassword({
                    ...password,
                    [e.target.name] : e.target.value
                })}
               
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Nueva Contraseña
              </label>
              <input
                type="password"
                className="border bg-gray-100 w-full p-2 mt-5 rounded-lg"
                placeholder="Escribe tu Nueva Contraseña"
                name="pwd_nuevo"
                onChange={e => setPassword({
                    ...password,
                    [e.target.name] : e.target.value
                })}
              />
            </div>

            <input
              type="submit"
              value="Actualizar Contraseña"
              className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 cursor-pointer hover:bg-indigo-800 transition-colors"
            />
          </form>
        </div>
      </div>
    </>
  );
};
