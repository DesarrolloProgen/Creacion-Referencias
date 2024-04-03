import React from "react";
import Swal from "sweetalert2";
import axios from "axios";
import json from "./resources.json";
import Input from "./components/Input";
import InputRadio from "../../components/radio";
import { useForm } from "react-hook-form";
import { Procedure } from "./components/Procedure";
import { Structures } from "./components/Structures";

export const Structure = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
    control,
  } = useForm({ references: [{ nombre: "", codigo: "", lote_estandar: "" }] });

  const onSubmit = (data) => {
    console.log(data);

    const settings = {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const url =
      "https://prod-03.brazilsouth.logic.azure.com:443/workflows/da9cbeaf50394c82b23f34cbec674b36/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=PomX17V2mijK_FSmMi2c-0k7VGJoTTwKG-MX6xq_euQ";

    Swal.fire({
      title: "¿Esta seguro?",
      text: "Esta seguro de enviar su solicitud de creación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(url, settings).then(() => {
          Swal.fire({
            title: "",
            text: "Su registro de creacion se guardo correctamente",
            icon: "success",
          });
        });
        reset();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container">
        <div className="row justify-content-md-left">
          <div className="row g-2 align-items-center">
            <div className="col-sm-6"></div>
            <InputRadio
              json={json}
              campo={"procedimiento"}
              register={register}
              required={true}
              errors={errors}
            />

            {watch("procedimiento") === "Si" && (
              <Procedure
                json={json}
                register={register}
                watch={watch}
                errors={errors}
              />
            )}
          </div>
        </div>
        <hr className="hr hr-blurry" />
        <div className="row g-2 align-items-center">
          <div className="col-sm-6"></div>
          <InputRadio
            json={json}
            campo={"estructura"}
            register={register}
            required={true}
            errors={errors}
          />

          {watch("estructura") === "Si" && (
            <Structures
              json={json}
              register={register}
              watch={watch}
              control={control}
              errors={errors}
            />
          )}
        </div>

        <div className="row g-2 align-items-center">
          <div className="col-sm-6"></div>
          <Input
            json={json}
            campo={"nombre"}
            register={register}
            required={true}
            errors={errors}
            type="text"
          />
          <Input
            json={json}
            campo={"email"}
            register={register}
            required={true}
            errors={errors}
            type="email"
          />
        </div>
      </div>
      <pre>{JSON.stringify(watch(), null, 2)}</pre>
      <div className="d-grid gap-2 m-2 col-4 mx-auto">
        <button type="submit" className="btn btn-success">
          ENVIAR
        </button>
      </div>
    </form>
  );
};
