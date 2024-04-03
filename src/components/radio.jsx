const campos = {
  controla_serial: "¿Controla Serial?",
  control_calidad: "¿Tiene control de Calidad?",
  habilita_portal: "¿Habilido en portal?",
  procedimiento: "¿Desea Crear/ Modificar un procedimiento?",
  estructura: "¿Desea Crear/ Modificar una Estructura?",
};

const InputRadio = ({ json, register, campo, required, errors }) => {
  return (
    <div className="row g-2 align-items-center">
      <label className="form-check-label col-sm-3" htmlFor="{campo}">
        {campos[campo]}
        <span className="text-danger"> *</span>
      </label>
      {json[campo].map((option) => (
        <div className="col-md-2 offset-sm-1">
          <input
            className="form-check-input"
            type="radio"
            value={option}
            {...register(campo, {
              required: {
                value: required,
                message: `${
                  campo.charAt(0).toUpperCase() + campo.slice(1)
                } es requerido`,
              },
            })}
          ></input>
          <label className="form-check-label" htmlFor={option}>
            {option}
          </label>
        </div>
      ))}
      {errors?.[campo] && (
        <div className="alert alert-danger" role="alert">
          {errors[campo]?.message}
        </div>
      )}
    </div>
  );
};

export default InputRadio;
