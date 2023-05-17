import { Link } from "react-router-dom";
import { useState } from "react";
import clienteAxios from "../config/axios";
import { Alerta } from "../components/Alerta";
import { useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';


export const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const {setAuth} = useAuth();

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    if([email, password].includes('')) {
      return setAlerta({
        msg: 'Todos los campos son obligatorios',
        error:true
      }) 
    }

    try {
      const {data} = await clienteAxios.post('/veterinarios/login', {email, password});
      localStorage.setItem('token', data.token);
      setAuth(data);
      navigate('/admin');
    
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error:true
      })
    }
  }
  

  const {msg} = alerta;


  return (
    <>
      <div className="">
        <h1 className="text-indigo-600 capitalize font-black md:text-6xl text-5xl">
          Inicia sesión y administra tus {" "} 
          <span className="text-black">pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

        {msg && <Alerta  alerta={alerta} />}
        <form onSubmit={handleSubmit}>
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
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
              placeholder="Tu contraseña"
              className="border w-full p-3 mt-3 bg-gray-50 placeholder-gray-400 rounded-md text-xl"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <input 
            type="submit"
            value="Iniciar sesión"
            className="bg-indigo-600 w-full p-3 px-10 text-white uppercase font-bold rounded-xl hover:bg-indigo-700 cursor-pointer transition-colors md:w-auto "
          />
        </form>

        <nav className="mt-10 md:flex justify-between">
          <Link to="/registrar" className=" block my-5 text-center text-gray-500">¿No tienes una cuenta? Registrate</Link>        
          <Link to="/olvide-password" className="block my-5 text-center text-gray-500">Olvidé mi contraseña</Link>    
        </nav> 
      </div>
    </>
  );
};
