const campos = {
  accion_procedimiento: "Acción del procedimiento",
  tipo_operacion: "Operación",
  codigo_procedimiento: "Codigo",
  lote_estandar_procedimiento: "Lote Estandar",
  recurso_interno: "Recurso",
  recurso_externo: "Recurso",
  accion_estructura: "Acción de la estructura",
};

const Select = ({ json, register, campo, errors }) => {
  return (
    <div className="row g-2 align-items-center">
      <label className="col-sm-3 ">
        {campos[campo]}
        {campo !== "unidad_medida_2" && <span className="text-danger"> *</span>}
      </label>
      <div className="col-md-8">
        <select
          className="form-select form-select-padding-x-margin-y"
          id={campo}
          name={campo}
          {...register(campo, {
            required: {
              value: true,
              message: `${
                (campo.charAt(0).toUpperCase() + campo.slice(1)).split("_")[0]
              } es requerido`,
            },
            validate: (value) => {
              return value === `Selecciona el ${campos[campo]}`
                ? "Selecciona una opción valida"
                : true;
            },
          })}
        >
          <option disabled selected>
            Selecciona el {campos[campo]}
          </option>
          {json[campo].map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
      </div>
      {errors?.[campo] && (
        <div className="mt-2 mx-4 col-sm-11">
          <div className="alert alert-danger" role="alert">
            {errors[campo]?.message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
