import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import { Alerta } from "../components/Alerta";

export const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`);
        setAlerta({
          msg: "Coloca tu nueva contraseña",
        });

        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: "Hubo un error con el enlace",
          error: true,
        });
      }
    };

    comprobarToken();
  }, []);

  const { msg } = alerta;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        msg: "La contraseña debe tener al menos 6 caracteres",
        error: true,
      });
      return;
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });

      setAlerta({
        msg: data.msg,
      });
      setPasswordModificado(true);

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  return (
    <>
      <div>
        <h1 className="text-indigo-600 capitalize font-black md:text-6xl text-5xl">
          Restablece tu contraseña y no pierdas tus{" "}
          <span className="text-black"> pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        {tokenValido && (
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label
                className="block text-gray-600 text-xl font-bold uppercase"
                htmlFor="password"
              >
                Nueva contraseña
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
            <input
              type="submit"
              value="Restablecer contraseña"
              className="bg-indigo-600 w-full p-3 px-10 text-white uppercase font-bold rounded-xl hover:bg-indigo-700 cursor-pointer transition-colors md:w-auto "
            />
          </form>
        )}

        {passwordModificado && (
          <Link to="/" className=" block my-5 text-center text-gray-500">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </>
  );
};
