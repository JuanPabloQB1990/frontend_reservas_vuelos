import React, { useEffect } from "react";
import FormBusquedaVuelos from "../Components/FormBusquedaVuelos";
import ResultadoVuelos from "../Components/ResultadoVuelos";
import { addFormBusqueda, addScales } from "../features/EscalasSlice";
import { useDispatch, useSelector } from "react-redux";

const FormBuscarVuelos = () => {
  const escalas = useSelector((state) => state.scales.escalas);
  const formBusqueda = useSelector((state) => state.scales.formBusqueda);

  const dispatch = useDispatch();

  useEffect(() => {
    sessionStorage.setItem('ultimaPaginaVisitada', window.location.href)

    if (localStorage.getItem("escalas")) {
      const escalas = JSON.parse(localStorage.getItem("escalas"));
      dispatch(addScales(escalas));
    }

    if (localStorage.getItem("formBuscar")) {
      const formBuscar = JSON.parse(localStorage.getItem("formBuscar"));
      dispatch(addFormBusqueda(formBuscar));
    }
  }, []);

  return (
    <div className="bg-gray-200">
      {escalas.length > 0 && (
        <h1 className="pl-14 py-12 font-semibold text-2xl text-center">
          {escalas.length} vuelos de {formBusqueda.origen} a{" "}
          {formBusqueda.destino}
        </h1>
      )}
      <div className="flex flex-row w-[70%] my-4 mx-auto gap-6 h-auto max-lg:flex-col">
        <div>
          <FormBusquedaVuelos />
        </div>
        <div className="basis-3/4 h-auto">
          <ResultadoVuelos />
        </div>
      </div>
    </div>
  );
};

export default FormBuscarVuelos;
