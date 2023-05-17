import { useState } from "react";
import { Link } from "react-router-dom";
import { Alerta } from "../components/Alerta";
import clienteAxios from "../config/axios";

export const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({ msg: "Hay campos vacios", error: true });
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({ msg: "Las contraseñas no son iguales", error: true });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "La contraseña debe tener mínimo 6 caracteres",
        error: true,
      });
      return;
    }
    setAlerta({});
    //Crear el usuario en la API

    try {
      const url = `/veterinarios`;
      await clienteAxios.post(url, {nombre, email, password});
      
      setAlerta({msg: "Creado correctamente, revisa tu email para confirmar tu cuenta", error: false});
      setNombre("");
      setEmail("");
      setPassword("");
      setRepetirPassword("");
    
    } catch (error) {
      setAlerta({msg: error.response.data.msg, error: true});
    }
    
  };

  const {msg} = alerta;





  return (
    <>
      <div>
        <h1 className="text-indigo-600 capitalize font-black md:text-6xl text-5xl">
          Crea tu cuenta y administra tus{" "}
          <span className="text-black">pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label
              className="block text-gray-600 text-xl font-bold uppercase"
              htmlFor="nombre"
            >
              Nombre
            </label>
            <input
              type="text"
              placeholder="Ingresa tu nombre"
              className="border w-full p-3 mt-3 bg-gray-50 placeholder-gray-400 rounded-md text-xl"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="block text-gray-600 text-xl font-bold uppercase"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Email de registro"
              className="border w-full p-3 mt-3 bg-gray-50 placeholder-gray-400 rounded-md text-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="block text-gray-600 text-xl font-bold uppercase"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Ingresa una contraseña"
              className="border w-full p-3 mt-3 bg-gray-50 placeholder-gray-400 rounded-md text-xl"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="block text-gray-600 text-xl font-bold uppercase"
              htmlFor="repetirPassword"
            >
              Repetir contraseña
            </label>
            <input
              type="password"
              placeholder="Repite tu contraseña"
              className="border w-full p-3 mt-3 bg-gray-50 placeholder-gray-400 rounded-md text-xl"
              id="repetirPassword"
              value={repetirPassword}
              onChange={(e) => setRepetirPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Crear Cuenta"
            className="bg-indigo-600 w-full p-3 px-10 text-white uppercase font-bold rounded-xl hover:bg-indigo-700 cursor-pointer transition-colors md:w-auto "
          />
        </form>
        <nav className="mt-10 md:flex justify-between">
          <Link to="/" className=" block my-5 text-center text-gray-500">
            ¿Ya tienes una cuenta? Iniciar Sesión
          </Link>
          <Link
            to="/olvide-password"
            className="block my-5 text-center text-gray-500"
          >
            Olvidé mi contraseña
          </Link>
        </nav>
      </div>
    </>
  );
};
