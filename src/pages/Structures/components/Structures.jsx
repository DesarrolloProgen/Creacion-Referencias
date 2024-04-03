import React from "react";
import Select from "./Select";
import Input from "./Input";
import json from "./../resources.json";
import References from "./References";
import Components from "./Components";

export const Structures = ({ register, watch, control, errors }) => {
  return (
    <div className="row g-3 align-items-center">
      {/* ACCION DE ESTRUCTURA  */}
      <div className="col-sm-12">
        <Select json={json} campo={"accion_estructura"} register={register} errors={errors} />
      </div>

      {/* OPCIONES CON MODIFICACION DEL PROCEDIMIENTO */}

      {watch("accion_estructura") === "Modificación" && (
        <div className="row g-2 align-items-center">
          <div className="col-sm-6">
            <Input
              json={json}
              campo={"descripcion_cambio_estructura"}
              register={register}
              errors={errors}
              required={watch("accion_estructura") === "Modificación"}
              type="text"
              min={10}
              max={60}
            />
          </div>
          <div className="col-sm-6">
            <Input
              json={json}
              campo={"justificacion_cambio_estructura"}
              register={register}
              errors={errors}
              required={watch("accion_estructura") === "Modificación"}
              type="text"
              min={10}
              max={60}
            />
          </div>
        </div>
      )}

      {/*  DESCRIPCION REFERENCIAS  */}

      <References
        control={control}
        register={register}
        json={json}
        errors={errors}
      ></References>

      {/*  DESCRIPCION COMPONENTES  */}

      <Components
        control={control}
        register={register}
        json={json}
        watch={watch}
        errors={errors}
      ></Components>
    </div>
  );
};
