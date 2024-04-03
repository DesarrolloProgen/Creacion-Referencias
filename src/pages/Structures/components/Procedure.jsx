import React from "react";
import Select from "./Select";
import Input from "./Input";
import json from "./../resources.json";

export const Procedure = ({ register, watch, errors }) => {
  return (
    <div className="row g-3 align-items-center">
      {/* ACCION DE PROCEDIMIENTO  */}
      <div className="col-sm-12">
        <Select
          json={json}
          campo={"accion_procedimiento"}
          register={register}
          errors={errors}
        />
      </div>

      {/* OPCIONES CON MODIFICACION DEL PROCEDIMIENTO */}

      {watch("accion_procedimiento") === "Modificación" && (
        <div className="row g-2 align-items-center">
          <div className="col-sm-6">
            <Input
              json={json}
              campo={"descripcion_cambio_procedimiento"}
              register={register}
              errors={errors}
              required={watch("accion_procedimiento") === "Modificación"}
              type="text"
              min={10}
              max={60}
            />
          </div>
          <div className="col-sm-6">
            <Input
              json={json}
              campo={"justificacion_cambio_procedimiento"}
              register={register}
              errors={errors}
              required={watch("accion_procedimiento") === "Modificación"}
              type="text"
              min={10}
              max={60}
            />
          </div>
        </div>
      )}

      {/* TIPO DE OPERACION  */}
      <div className="col-sm-12">
        <Select
          json={json}
          campo={"tipo_operacion"}
          register={register}
          errors={errors}
        />
      </div>

      {/*  DESCRIPCION REFERENCIAS  */}
      <div className="row g-2 align-items-center">
        <div className="col-sm-6">
          <Input
            json={json}
            campo={"referencia_procedimiento"}
            register={register}
            errors={errors}
            required={true}
            type="text"
            min={4}
            max={25}
          />
        </div>
        <div className="col-sm-6">
          <Select
            json={json}
            campo={"codigo_procedimiento"}
            register={register}
            errors={errors}
          />
        </div>
      </div>
      <div className="row g-2 align-items-center">
        <div className="col-sm-6">
          <Input
            json={json}
            campo={"descripcion_operacion"}
            register={register}
            errors={errors}
            required={true}
            type="text"
            min={10}
            max={40}
          />
        </div>
        <div className="col-sm-6">
          <Select
            json={json}
            campo={"lote_estandar_procedimiento"}
            register={register}
            errors={errors}
          />
        </div>
      </div>
      {/* OPERACION - INTERNA  */}
      {watch("tipo_operacion") === "Interna" && (
        <div className="row g-2 align-items-center">
          <div className="col-sm-6">
            <Select
              json={json}
              campo={"recurso_interno"}
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-sm-6">
            <Input
              json={json}
              campo={"mano_obra"}
              register={register}
              errors={errors}
              required={watch("tipo_operacion") === "Interna"}
              type="number"
              min={1}
              max={2}
              help={"Cantidad de personas en la ejecución de la producción"}
            />
          </div>
          <div className="col-sm-6">
            <div className="row g-2 align-items-center">
              <label className="col-sm-3 col-form-label">
                Tiempo Estandar
                <span className="text-danger"> *</span>
              </label>
              <div className="col-sm-8">
                <input
                  placeholder="Cantidad"
                  className="form-control mb-2"
                  name="cantidad"
                  {...register(`tiempo_estandar`, {
                    required: {
                      value: watch("tipo_operacion") === "Interna",
                      message: "El tiempo estandar es requerido",
                    },
                    validate: (value) => {
                      const reg = new RegExp("^[0-9]{1,2}([,][0-9]{0,3})?$");
                      return reg.test(value)
                        ? true
                        : "Son 2 Enteros/ 3 decimales maximo";
                    },
                  })}
                  type="text"
                />
                <div id="emailHelp" className="form-text">
                  Tiempo de ejecución de la operación (formato horas)
                </div>
              </div>
              {errors?.tiempo_estandar && (
                <div className="mx-4 col-sm-10">
                  <div className="alert alert-danger" role="alert">
                    {errors.tiempo_estandar?.message}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-sm-6">
          <div className="row g-2 align-items-center">
              <label className="col-sm-3 col-form-label">
              Setup
                <span className="text-danger"> *</span>
              </label>
              <div className="col-sm-8">
                <input
                  placeholder="Cantidad"
                  className="form-control mb-2"
                  name="cantidad"
                  {...register(`setup`, {
                    required: {
                      value: watch("tipo_operacion") === "Interna",
                      message: "El Setup es requerido",
                    },
                    validate: (value) => {
                      const reg = new RegExp("^[0-9]{1,2}([,][0-9]{0,3})?$");
                      return reg.test(value)
                        ? true
                        : "Son 2 Enteros/ 3 decimales maximo";
                    },
                  })}
                  type="text"
                />
                <div id="emailHelp" className="form-text">
                "Aquellas actividades necesarias antes del inicio de la producción  (formato horas)"
                </div>
              </div>
              {errors?.setup && (
                <div className="mx-4 col-sm-10">
                  <div className="alert alert-danger" role="alert">
                    {errors.setup?.message}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* OPERACION - EXTERNA  */}

      {watch("tipo_operacion") === "Externa" && (
        <div className="row g-2 align-items-center">
          <div className="col-sm-6">
            <Select
              json={json}
              campo={"recurso_externo"}
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-sm-6">
            <Input
              json={json}
              campo={"nit_proveedor"}
              register={register}
              errors={errors}
              required={watch("tipo_operacion") === "Interna"}
              type="number"
            />
          </div>
          <div className="col-sm-6">
            <Input
              json={json}
              campo={"nombre_proveedor"}
              register={register}
              errors={errors}
              required={watch("tipo_operacion") === "Interna"}
              type="text"
            />
          </div>
          <div className="col-sm-6">
            <Input
              json={json}
              campo={"precio"}
              register={register}
              errors={errors}
              required={watch("tipo_operacion") === "Interna"}
              type="number"
            />
          </div>
        </div>
      )}
    </div>
  );
};
