export interface IData {
  Documento: string;
  Denominacion: string;
  DescripcionActividad: string;
  Domicilios: {
      Calle: string;
      Numero: number;
      Piso: string;
      Depto: string;
      Detalles: string;
      IdProvincia: number;
      DescripcionProvincia:string,
      Localidad: string,
      CodigoPostal: string,
      EsFiscal: boolean,
      Telefonos: any[],
      HayMasTelefonos: boolean,
  }[]
}