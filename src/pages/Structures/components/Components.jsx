import { useFieldArray } from "react-hook-form";

const Components = ({ register, control, json, watch, errors }) => {
  const { fields, append, remove } = useFieldArray({
    name: "components",
    control,
    rules: {
      required: "Debe agregar al menos un componente",
    },
  });

  return (
    <div>
      {fields.map((field, index) => {
        return (
          <div className="row g-2 align-items-center">
            <div className="col-sm-4" key={field.id}>
              <div className="row g-2 align-items-center">
                <label htmlFor="recurso" className="col-sm-4 col-form-label">
                  Componente
                  <span className="text-danger"> *</span>
                </label>
                <div className="col-sm-8">
                  <input
                    placeholder="componente"
                    className="form-control mb-2"
                    name="componente"
                    {...register(`components.${index}.componente`, {
                      required: {
                        value: true,
                        message: "El componente es requerido",
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
                    maxLength={19}
                  />
                </div>
                {errors?.components?.[index]?.componente && (
                  <div className="mx-4 col-sm-10">
                    <div className="alert alert-danger" role="alert">
                      {errors.components?.[index]?.componente?.message}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-sm-3">
              <div className="row g-2 align-items-center">
                <label className="col-sm-4 ">
                  Cantidad
                  <span className="text-danger"> *</span>
                </label>
                <div className="col-md-4">
                  <input
                    placeholder="Cantidad"
                    className="form-control mb-2"
                    name="cantidad"
                    {...register(`components.${index}.cantidad`, {
                      required: {
                        value: true,
                        message: "La cantidad es requerida",
                      },
                      validate: (value) => {
                        const reg = new RegExp("^[0-9]{1,2}([,][0-9]{0,6})?$");
                        return reg.test(value)
                          ? true
                          : "Son 6 Enteros/decimales maximo";
                      },
                    })}
                    type="text"
                  />
                </div>
                {errors?.components?.[index]?.cantidad && (
                  <div className="mx-4 col-sm-10">
                    <div className="alert alert-danger" role="alert">
                      {errors.components?.[index]?.cantidad?.message}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="col-sm-4">
              <div className="row g-2 align-items-center">
                <label className="col-sm-4 ">
                  Bodega de consumo
                  <span className="text-danger"> *</span>
                </label>
                <div className="col-md-8">
                  <select
                    className="form-select form-select-padding-x-margin-y"
                    {...register(`components.${index}.lote_estandar`, {
                      validate: (value) => {
                        return value === `Selecciona la bodega de consumo`
                          ? "Selecciona una opción valida"
                          : true;
                      },
                    })}
                  >
                    <option disabled selected>
                      Selecciona la bodega de consumo
                    </option>
                    {json["bodega_consumo"].map((tipo) => (
                      <option key={tipo} value={tipo}>
                        {tipo}
                      </option>
                    ))}
                  </select>
                </div>
                {errors?.components?.[index]?.lote_estandar && (
                  <div className="mx-4 col-sm-10">
                    <div className="alert alert-danger" role="alert">
                      {errors.components?.[index]?.lote_estandar?.message}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-sm-6">
              <div className="row g-2 align-items-center">
                <label className="form-check-label col-sm-3" htmlFor="opcional">
                  Opcional
                  <span className="text-danger"> *</span>
                </label>
                {json["opcional"].map((option) => (
                  <div className="col-md-2 offset-sm-1">
                    <input
                      className="form-check-input"
                      type="radio"
                      value={option}
                      {...register(`components.${index}.opcional`, {
                        required: {
                          value: true,
                          message: `Opcional es requerido`,
                        },
                      })}
                    ></input>
                    <label className="form-check-label" htmlFor={option}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
              {errors?.components?.[index]?.opcional && (
                <div className="mx-4 col-sm-10">
                  <div className="alert alert-danger" role="alert">
                    {errors.components?.[index]?.opcional?.message}
                  </div>
                </div>
              )}
            </div>
            <div className="col-sm-6">
              <div className="row g-2 align-items-center">
                <label className="form-check-label col-sm-3" htmlFor="default">
                  ¿Default?
                  <span className="text-danger"> *</span>
                </label>
                {json["default"].map((option) => (
                  <div className="col-md-2 offset-sm-1">
                    <input
                      className="form-check-input"
                      type="radio"
                      value={option}
                      {...register(`components.${index}.default`, {
                        required: {
                          value: true,
                          message: `Default es requerido`,
                        },
                      })}
                    ></input>
                    <label className="form-check-label" htmlFor={option}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
              {errors?.components?.[index]?.default && (
                <div className="mx-4 col-sm-10">
                  <div className="alert alert-danger" role="alert">
                    {errors.components?.[index]?.default?.message}
                  </div>
                </div>
              )}
            </div>
            {watch(`components.${index}.opcional`) === "Si" &&
              watch(`components.${index}.default`) === "Si" && (
                <div className="row g-2 align-items-center" key={field.id}>
                  <div className="col-sm-6">
                    <label
                      htmlFor="componente_secundario"
                      className="col-sm-4 col-form-label"
                    >
                      Componente secundario
                      <span className="text-danger"> *</span>
                    </label>
                    <div className="col-sm-8">
                      <input
                        placeholder="Componente Secundario"
                        className="form-control mb-2"
                        name="componente_secundario"
                        {...register(
                          `components.${index}.componente_secundario`,
                          {
                            required: {
                              value:
                                watch(`components.${index}.opcional`) ===
                                  "Si" &&
                                watch(`components.${index}.default`) === "Si",
                              message: "El componente es requerido",
                            },
                            minLength: {
                              value: 9,
                              message: "Ingrese al menos 9 caracteres",
                            },
                            maxLength: {
                              value: 25,
                              message: "Debe tener hasta 25 caracteres",
                            },
                          }
                        )}
                      />
                    </div>
                    {errors?.components?.[index]?.componente_secundario && (
                      <div className="mx-4 col-sm-6">
                        <div className="alert alert-danger" role="alert">
                          {
                            errors.components?.[index]?.componente_secundario
                              ?.message
                          }
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-sm-6">
                    <label
                      htmlFor="componente_secundario"
                      className="col-sm-6 col-form-label"
                    >
                      Bodega de consumo secundario
                      <span className="text-danger"> *</span>
                    </label>
                    <div className="col-sm-8">
                      <select
                        className="form-select form-select-padding-x-margin-y"
                        {...register(
                          `components.${index}.bodega_consumo_secundaria`,
                          {
                            validate: (value) => {
                              return value === `Selecciona la bodega de consumo`
                                ? "Selecciona una opción valida"
                                : true;
                            },
                          }
                        )}
                      >
                        <option disabled selected>
                          Selecciona la bodega de consumo
                        </option>
                        {json["bodega_consumo"].map((tipo) => (
                          <option key={tipo} value={tipo}>
                            {tipo}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors?.components?.[index]?.bodega_consumo_secundaria && (
                      <div className="mx-4 my-2 col-sm-6">
                        <div className="alert alert-danger" role="alert">
                          {
                            errors.components?.[index]?.bodega_consumo_secundaria
                              ?.message
                          }
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            <div className="d-grid gap-3 m-4 col-6 mx-auto">
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
          AGREGAR COMPONENTE
        </button>
        {errors?.components?.root && (
          <div className="mx-4 col-sm-10">
            <div className="alert alert-danger" role="alert">
              {errors.components?.root.message}
            </div>
          </div>
        )}
        <p></p>
      </div>
    </div>
  );
};

export default Components;
