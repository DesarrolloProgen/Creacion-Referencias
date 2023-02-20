const campos = {
  tipo_producto: "Tipo de Producto",
  linea_comercial: "Linea Comercial",
  origen: "Origen",
  deposito: "Deposito",
  grupo: "Grupo",
  centro_costo: "Centro de Costo",
  categoria_1: "Categoria 1",
  categoria_2: "Categoria 2",
  categoria_3: "Categoria 3",
  categoria_4: "Categoria 4",
  categoria_5: "Categoria 5",
  mercado: "Mercado",
  unidad_medida_1: "Unidad de Medida",
  unidad_medida_2: "Unidad de Medida 2"
};

const Select = ({ json, register, campo, onChange }) => {
  return (
    
    <div className="row g-2 align-items-center">
      <label htmlFor="recurso" className="col-sm-3 ">
        {campos[campo] }
        {campo !== "unidad_medida_2" && <span className="text-danger">  *</span>}
      </label>
      <div className="col-md-8">
        <select
          className="form-select form-select-padding-x-margin-y"
          id={campo}
          {...register(campo, { required: true })}
          onChange={onChange}
        >
          <option disabled selected>
            Selecciona el {campos[campo]}
          </option>
          {json[0][campo].map((tipo) => (
            <option value={tipo}>{tipo}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
