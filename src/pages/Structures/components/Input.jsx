const campos = {
  descripcion_cambio_procedimiento: "Descripción del Cambio",
  justificacion_cambio_procedimiento: "Justificación del cambio",
  referencia_procedimiento: "Referencia",
  descripcion_operacion: "Descripción de la operación",
  mano_obra: "Mano de Obra",
  tiempo_estandar: "Tiempo Estandar",
  Setup: "Setup",
  nit_proveedor: "Nit del Proveedor",
  nombre_proveedor: "Nombre del Proveedor",
  precio: "Precio sin IVA",
  descripcion_cambio_estructura: "Descripción del Cambio",
  justificacion_cambio_estructura: "Justificación del cambio",
  nombre: "Nombre",
  email: "Correo Electronico"
};

const Input = ({ register, campo, required, type, help, errors, min, max }) => {
  return (
    <div className="row g-2 align-items-center">
      <label htmlFor="recurso" className="col-sm-3 col-form-label">
        {campos[campo]}
        {required && <span className="text-danger"> *</span>}
      </label>
      <div className="col-sm-8">
        <input
          placeholder={campos[campo]}
          className="form-control mb-2"
          type={type}
          {...register(campo, {
            required: {
              value: required,
              message: `${
                (campo.charAt(0).toUpperCase() + campo.slice(1)).split("_")[0]
              } es requerido`,
            },
            minLength: {
              value: min,
              message: `Debe tener al menos ${min} caracteres`
            },
            maxLength: {
              value: max,
              message: `Debe tener hasta ${max} caracteres`
            }
          })}
        />
        {help && (
          <div id="emailHelp" className="form-text">
            {help}
          </div>
        )}
      </div>
      {errors?.[campo] && (
        <div className="mx-4 col-sm-10">
          <div className="alert alert-danger" role="alert">
            {errors[campo]?.message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Input;
