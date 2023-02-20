const campos = {
  "controla_serial": "¿Controla Serial?",
  "control_calidad": "¿Tiene control de Calidad?",
  "habilita_portal": "¿Habilido en portal?",

};

const InputRadio = ({ json, register, campo, required }) => {
  return (
    <div className="row g-2 align-items-center">
    <label className="form-check-label col-sm-3" htmlFor="{campo}">{campos[campo]}<span className="text-danger">  *</span></label>
      {json[0][campo].map((option) => (
        <div className="col-md-2 offset-sm-1">
          <input
            className="form-check-input"
            type="radio"
            value={option}
            {...register(campo, { required: required })}
          ></input>
          <label className="form-check-label" htmlFor={option}>{option}</label>
        </div>
      ))}
    </div>
  );
};

export default InputRadio;
