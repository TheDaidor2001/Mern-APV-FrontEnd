import { Link } from "react-router-dom";
import { useState } from "react";
import {Alerta} from '../components/Alerta';
import clienteAxios from "../config/axios";

export const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || email.length < 6) {
      setAlerta({ msg: "El email es obligatorio", error: true });
      return;
    }

    try {
      const {data} = await clienteAxios.post(`/veterinarios/olvide-password`, {email});
      setAlerta({msg: data.msg});
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  }


  const {msg} = alerta;
  return (
    <>
      <div>
        <h1 className="text-indigo-600 capitalize font-black md:text-6xl text-5xl">
          Recupera tu acceso y no pierdas tus{" "}
          <span className="text-black"> pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} /> }
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label
              className="block text-gray-600 text-xl font-bold uppercase"
              htmlFor="email"
            >
              Contraseña
            </label>
            <input
              type="email"
              placeholder="Ingresa una contraseña"
              className="border w-full p-3 mt-3 bg-gray-50 placeholder-gray-400 rounded-md text-xl"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Recuperar Contraseña"
            className="bg-indigo-600 w-full p-3 px-10 text-white uppercase font-bold rounded-xl hover:bg-indigo-700 cursor-pointer transition-colors md:w-auto "
          />
        </form>

        <nav className="mt-10 md:flex justify-between">
          <Link to="/" className=" block my-5 text-center text-gray-500">
            ¿Ya tienes una cuenta? Iniciar Sesión
          </Link>
          <Link to="/registrar" className=" block my-5 text-center text-gray-500">¿No tienes una cuenta? Registrate</Link>  
        </nav>
      </div>
    </>
  );
};
