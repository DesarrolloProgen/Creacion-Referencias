import { type } from "@testing-library/user-event/dist/type";

const campos = {
  copiarReferencia: "Copia referencia desde",
  skuRefProveedor: "SKU o Referencia del Proveedor",
  descripcion: "Descripción",
  unidadMedida1: "Unidad de Medida",
  unidadMedida2: "Segunda Unidad de Medida",
  factorConversion: "Factor de Conversion",
  costoEstandar: "Costo Estandar",
  codigoArancelario: "Codigo Arancelario",
  cantidad_embalaje: "Cantidad de Embalaje",
  lote_minimo: "Lote minimo",
  stockMaximo: "Stock Maximo",
  diasStock: "Días stock de seguridad",
  ubicacion1: "Ubicacion 1",
  ubicacion2: "Ubicacion 2",
  precioVenta: "Precio de compra (Pesos $)",
  cantidadProveedores: "Cantidad de Proveedores",
  nombre: "Nombre",
  correo_electronico: "Email"
};

const Input = ({ register, campo, required, onChange, errors }) => {
  return (
    <div className="row g-2 align-items-center">
      <label htmlFor="recurso" className="col-sm-3 col-form-label">
        {campos[campo]}
        {required && <span className="text-danger"> *</span>}
      </label>
      <div className="col-sm-8">
        {!onChange ?
          <input
            placeholder={campos[campo]}
            className="form-control mb-2"
            type={type}
            {...register(campo, { required: required })}
            onChange={onChange}
          /> :
          <input
            placeholder={campos[campo]}
            className="form-control mb-2"
            type={type}
            {...register(campo, { required:  required })}
            />
        }
      </div>
    </div>
  );
};

export default Input;
