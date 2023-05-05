import React, { useEffect, useState } from "react";

import NosisLogo from "../static/Logo.png";
import LensIcon from "../static/search-icon.svg";

import { LoadingSpinner } from "./components/LoadingSpinner";
import { parseInputValue, stringContainOnlyNumbers } from "../helpers/helpers";
import type { IData } from "../types/data";
import { LoadingDots } from "./components/LoadingDots";
import { Table } from "./components/Table";

const MOCKED_DATA: IData[] = [
  {
    Documento: "20400867403",
    Denominacion: "COSCOLLA DIEGO NICOLAS",
    DescripcionActividad:
      "VENTA AL POR MENOR DE PRODUCTOS ALIMENTICIOS EN COMERCIOS NO ESPECIALIZADOS CON PREDOMINIO DE PRODUCTOS ALIMENTICIOS N.C.P.",
    Domicilios: [
      {
        Calle: "ALVAREZ CONDARCO",
        Numero: 16,
        Piso: "",
        Depto: "",
        Detalles: "",
        IdProvincia: 14,
        DescripcionProvincia: "Tucuman",
        Localidad: "LULES",
        CodigoPostal: "4128",
        EsFiscal: true,
        Telefonos: [],
        HayMasTelefonos: false,
      },
    ],
  },
];

export const App = () => {
  const [data, setData] = useState<IData[]>();
  const [loading, setLoading] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  const onSubmit = async (searchQuery: string) => {
    const parsedSearchQuery = parseInputValue(searchQuery);

    const requestUrl = `${process.env.API_URL}${
      stringContainOnlyNumbers(parsedSearchQuery) ? "cuit/" : "razonSocial/"
    }${parsedSearchQuery}`;

    if (requestUrl) {
      setLoading(true);

      setTimeout(() => {
        if (firstRender) {
          setFirstRender(false);
        }
        setLoading(false);
        setData(MOCKED_DATA);
        chrome.storage.local.clear()
      }, 2000);
      // const resp = await fetch(requestUrl, {
      //   headers: {
      //     "x-cookie": process.env.COOKIE,
      //   },
      // });

      // if (resp.ok) {
      //   const parsedResp = await resp.json();

      //   console.log(parsedResp);

      //   setData(parsedResp);
      // } else {
      //   console.log("error");
      // }
    }
  };

  useEffect(() => {
    chrome.storage.local.get("selectedText", (data) => {
      if(data.selectedText !== undefined) {
        console.log(data.selectedText)
        onSubmit(data.selectedText)
      }
    })
  }, [])

  return (
    <div className="bg-slate-400 min-w-[600px] w-full min-h-screen px-10 gap-10 py-10 flex flex-col items-center">
      <img src={NosisLogo} alt="Logo" />
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.currentTarget);
          const searchQuery = formData.get("search") as string;
          onSubmit(searchQuery)
        }}
        className="bg-white flex w-full items-center h-10 rounded-full py-2 px-1 justify-between "
      >
        <input
          type="text"
          id="search"
          name="search"
          className="outline-none h-full w-full bg-transparent pl-4"
          placeholder="Insertar CUIT o Razon Social"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 rounded-full h-8 w-8 flex items-center justify-center text-white"
        >
          {loading ? (
            <LoadingSpinner />
          ) : (
            <img src={LensIcon} className="w-4 h-4" alt="search icon" />
          )}
        </button>
      </form>

      {!firstRender && (loading ? <LoadingDots /> : <Table data={data} />)}
    </div>
  );
};
