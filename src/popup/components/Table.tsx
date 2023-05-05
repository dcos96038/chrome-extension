import React from 'react'
import { IData } from '../../types/data'

interface Props {
  data: IData[]
}

export const Table = ({data}: Props) => {
  const onClickRow = (cuit: string) => {
    chrome.tabs.create({ url: `https://informes.nosis.com/?source=SitioNosis&q=${cuit}&UrlReferer=` })
  }

  return (
    <table className="w-full border-collapse rounded-md overflow-hidden">
      <thead>
        <tr className="bg-blue-600 text-white">
          <th className="py-2">Nombre</th>
          <th className="py-2">Actividad</th>
          <th className="py-2">Provincia</th>
          <th className="py-2">CUIT</th>
        </tr>
      </thead>
      <tbody>
        {data.map((p, i) => (
          <tr onClick={() => {
            onClickRow(p.Documento.replaceAll("-", ""))
          }} key={i} className="even:bg-amber-100 even:hover:bg-amber-200 odd:hover:bg-blue-200 odd:bg-blue-100 text-[10px] cursor-pointer">
            <td className="border text-center max-w-[100px] text-ellipsis overflow-hidden whitespace-nowrap px-1 py-2">
              {p.Denominacion}
            </td>
            <td className="border text-center max-w-[100px] text-ellipsis overflow-hidden whitespace-nowrap px-1 py-2">
              {p.DescripcionActividad || "-"}
            </td>
            <td className="border text-center max-w-[100px] text-ellipsis overflow-hidden whitespace-nowrap px-1 py-2">
              {p.Domicilios[0].DescripcionProvincia || "-"}
            </td>
            <td className="border text-center max-w-[100px] text-ellipsis overflow-hidden whitespace-nowrap px-1 py-2">
              {p.Documento}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
