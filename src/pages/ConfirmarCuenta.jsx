import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import { Alerta } from "../components/Alerta";

export const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `veterinarios/confirmar/${id}`;
        const { data } = await clienteAxios(url);
        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg,
        });
      } catch (e) {
        setAlerta({
          msg: e.response.data.msg,
          error: true,
        });
      }

      setCargando(false);
    };
    confirmarCuenta();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-indigo-600 capitalize font-black md:text-6xl text-5xl">
          Confirma tu cuenta y comienza a administrar tus{" "}
          <span className="text-black">pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {!cargando && <Alerta alerta={alerta} />}

        {cuentaConfirmada && (
          <Link to="/" className=" block my-5 text-center text-gray-500">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </>
  );
};
