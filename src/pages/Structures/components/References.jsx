import { useFieldArray } from "react-hook-form";

const References = ({ register, control, json, errors }) => {
  const { fields, append, remove } = useFieldArray({
    name: "references",
    control,
    rules: {
      required: "Debe agregar al menos una referencia",
    },
  });

  return (
    <div>
      {fields.map((field, index) => {
        return (
          <div className="row g-2 align-items-center">
            <div className="col-sm-3" key={field.id}>
              <div className="row g-2 align-items-center">
                <label htmlFor="recurso" className="col-sm-4 col-form-label">
                  Referencia
                  <span className="text-danger">*</span>
                </label>
                <div className="col-sm-8">
                  <input
                    placeholder="Referencia"
                    className="form-control mb-2"
                    name="referencia"
                    {...register(`references.${index}.nombre`, {
                      required: {
                        value: true,
                        message: "La referencia es requerida",
                      },
                      minLength: {
                        value: 9,
                        message: "Ingrese al menos 9 caracteres",
                      },
                      maxLength: {
                        value: 25,
                        message: "Debe tener hasta 25 caracteres",
                      },
                    })}
                  />
                </div>
                {errors?.references?.[index]?.nombre && (
                  <div className="mx-4 col-sm-10">
                    <div className="alert alert-danger" role="alert">
                      {errors.references?.[index]?.nombre?.message}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-sm-3">
              <div className="row g-2 align-items-center">
                <label className="col-sm-3 ">
                  Codigo
                  <span className="text-danger">*</span>
                </label>
                <div className="col-md-8">
                  <select
                    className="form-select form-select-padding-x-margin-y"
                    {...register(`references.${index}.codigo`, {
                      required: {
                        value: true,
                        message: "El codigo es requerido",
                      },
                      validate: (value) => {
                        return value === `Selecciona el Codigo`
                          ? "Selecciona una opción valida"
                          : true;
                      },
                    })}
                  >
                    <option disabled selected>
                      Selecciona el Codigo
                    </option>
                    {json["codigo_estructura"].map((tipo) => (
                      <option key={tipo} value={tipo}>
                        {tipo}
                      </option>
                    ))}
                  </select>
                </div>
                {errors?.references?.[index]?.codigo && (
                  <div className="mx-4 col-sm-10">
                    <div className="alert alert-danger" role="alert">
                      {errors.references?.[index]?.codigo?.message}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="col-sm-4">
              <div className="row g-2 align-items-center">
                <label className="col-sm-4 ">
                  Lote Estandar
                  <span className="text-danger"> *</span>
                </label>
                <div className="col-md-8">
                  <select
                    className="form-select form-select-padding-x-margin-y"
                    {...register(`references.${index}.lote_estandar`, {
                      required: {
                        value: true,
                        message: "El lote es requerido",
                      },
                      validate: (value) => {
                        return value === `Selecciona el Lote estandar`
                          ? "Selecciona una opción valida"
                          : true;
                      },
                    })}
                  >
                    <option disabled selected>
                      Selecciona el Lote estandar
                    </option>
                    {json["lote_estandar_estructura"].map((tipo) => (
                      <option key={tipo} value={tipo}>
                        {tipo}
                      </option>
                    ))}
                  </select>
                </div>
                {errors?.references?.[index]?.lote_estandar && (
                  <div className="mx-4 col-sm-10">
                    <div className="alert alert-danger" role="alert">
                      {errors.references?.[index]?.lote_estandar?.message}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-sm-2">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => remove(index)}
              >
                Eliminar
              </button>
            </div>
          </div>
        );
      })}
      <div className="d-grid gap-2 col-4 mx-auto">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => append()}
        >
          AGREGAR REFERENCIA
        </button>
        {errors?.references?.root && (
          <div className="mx-4 col-sm-10">
            <div className="alert alert-danger" role="alert">
              {errors.references?.root.message}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default References;
