import React, { useState } from "react";
import { useForm } from "react-hook-form";
import json from "../resources.json";
import Input from "./input";
import Proveedores from "./proveedores";
import InputRadio from "./radio";
import Select from "./select";
import Swal from "sweetalert2";
import axios from "axios";
import Referencias from "./referencias";

const Main = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
    setError,
  } = useForm();
  const [showOrigen, setShowOrigen] = useState();
  const [proveedores, setProveedores] = useState([]);
  const [referencias, setReferencias] = useState([]);

  const [venta, setVenta] = useState(false);
  console.log(venta)
  const onSubmit = (data) => {
    setValue("proveedores", proveedores);
    setValue("referencias", referencias);
    var now = new Date();
    var fecha =
      now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear();
    var minutos = now.getMinutes();
    if (minutos < 10) minutos = "0" + minutos;
    var hora = now.getHours() + ":" + minutos;
    var fechayHora = fecha + " " + hora;
    setValue("fecha", fechayHora);
    console.log(data);
    if (!validarSelect(data)) return false;
    console.log(proveedores);
    console.log(referencias);
    console.log(data.proveedores);
    console.log(data.referencias);
    if (data.proveedores === undefined) {
      console.log("entro undifined");
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Por favor espere mientras se agregan los proveedores",
      });
      return false;
    } else if (data.proveedores.length === 0 && proveedores.length > 0) {
      console.log("entro leght 0 proveedores.length > 0 ");
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Por favor espere mientras se agregan los proveedores",
      });
      return false;
    } else if (data.proveedores.length === 0 && proveedores.length === 0) {
      console.log("entro los 2 con 0");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No ha agregado proveedores para su referencia",
      });
      return false;
    }

    if (data.referencias === undefined) {
      console.log("entro undifined");
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Por favor espere mientras se agregan los referencias",
      });
      return false;
    } else if (data.referencias.length === 0 && referencias.length > 0) {
      console.log("entro leght 0 referencias.length > 0 ");
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Por favor espere mientras se agregan los referencias",
      });
      return false;
    } else if (data.referencias.length === 0 && referencias.length === 0) {
      console.log("entro los 2 con 0");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No ha agregado referencias para su referencia",
      });
      return false;
    }

    const settings = {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const url =
          // "https://prod-13.brazilsouth.logic.azure.com:443/workflows/3bc1a9e86ba64d38a4ce61dd247fe905/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ivHTwWSxu5aTQJahIgNh7Ijj4ATMTg_s23KTDkyhbiA";
          "https://prod-10.brazilsouth.logic.azure.com:443/workflows/c282f81e25db40b09e01bdf10733cb65/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=9Hi-Mm7X_KolJtM1ntjpdemP-CsUTYJOqPk7T6K_kDc";
      

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
        axios.post(url, settings).then((response) => {
          Swal.fire({
            title: "",
            text: "Su registro de creacion se guardo correctamente",
            icon: "success",
          });
        });
        reset();
        document.getElementById("tipo_producto").selectedIndex = 0;
        document.getElementById("linea_comercial").selectedIndex = 0;
        document.getElementById("origen").selectedIndex = 0;
        document.getElementById("deposito").selectedIndex = 0;
        document.getElementById("grupo").selectedIndex = 0;
        document.getElementById("centro_costo").selectedIndex = 0;
        document.getElementById("categoria_1").selectedIndex = 0;
        document.getElementById("categoria_2").selectedIndex = 0;
        document.getElementById("categoria_3").selectedIndex = 0;
        document.getElementById("categoria_4").selectedIndex = 0;
        document.getElementById("categoria_5").selectedIndex = 0;
        document.getElementById("mercado").selectedIndex = 0;
        document.getElementById("unidad_medida_1").selectedIndex = 0;
        document.getElementById("unidad_medida_2").selectedIndex = 0;
        setProveedores([]);
        setReferencias([]);
        setValue("proveedores", [])
      }
    });
  };

  const onChange = (e) => {
    e.target.value === "C - Comprado"
      ? setShowOrigen("comprado")
      : setShowOrigen("otro");
  };

  const validarSelect = (data) => {
    if (data.tipo_producto === "Selecciona el Tipo de Producto") {
      setError("tipo_producto", {
        type: "required",
        message: "El campo de Tipo de Producto es obligatorio",
      });
      return false;
    }

    if (data.linea_comercial === "Selecciona el Linea Comercial") {
      setError("linea_comercial", {
        type: "required",
        message: "El campo de linea comercial es obligatorio",
      });
      return false;
    }

    if (data.origen === "Selecciona el Origen") {
      setError("origen", {
        type: "required",
        message: "El campo de origen es obligatorio",
      });
      return false;
    }
    if (data.unidad_medida_1 === "Selecciona el Unidad de Medida") {
      setError("unidad_medida_1", {
        type: "required",
        message: "El campo de unidad medida es obligatorio",
      });
      return false;
    }
    if (data.deposito === "Selecciona el Deposito") {
      setError("deposito", {
        type: "required",
        message: "El campo deposito es obligatorio",
      });
      return false;
    }
    if (data.grupo === "Selecciona el Grupo") {
      setError("grupo", {
        type: "required",
        message: "El campo de grupo es obligatorio",
      });
      return false;
    }
    if (data.centro_costo === "Selecciona el Centro de Costo") {
      setError("centro_costo", {
        type: "required",
        message: "El campo de centro de costo es obligatorio",
      });
      return false;
    }
    if (data.precioVenta === "" && venta) {
      setError("precioVenta", {
        type: "required",
      });
      return false;
    }
    if (data.categoria_1 === "Selecciona el Categoria 1") {
      setError("categoria_1", {
        type: "required",
        message: "El campo de  Categoria 1 es obligatorio",
      });
      return false;
    }
    if (data.categoria_2 === "Selecciona el Categoria 2") {
      setError("categoria_2", {
        type: "required",
        message: "El campo de  Categoria 2 es obligatorio",
      });
      return false;
    }
    if (data.categoria_3 === "Selecciona el Categoria 3") {
      setError("categoria_3", {
        type: "required",
        message: "El campo de  Categoria 3 es obligatorio",
      });
      return false;
    }
    if (data.categoria_4 === "Selecciona el Categoria 4") {
      setError("categoria_4", {
        type: "required",
        message: "El campo de  Categoria 4 es obligatorio",
      });
      return false;
    }
    if (data.categoria_5 === "Selecciona el Categoria 5") {
      setError("categoria_5", {
        type: "required",
        message: "El campo de Categoria 5 es obligatorio",
      });
      return false;
    }
    if (data.mercado === "Selecciona el Mercado") {
      setError("mercado", {
        type: "required",
        message: "El campo de Mercado es obligatorio",
      });
      return false;
    }

    return true;
  };

  function onChangeTipoProducto(e) {
    e.target.value === "RP - Repuestos" || e.target.value === "AC - Accesorios" || e.target.value === "TR - Productos Terminados"
      ?
      setVenta(true)
      :
      setVenta(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container">
        <div className="row justify-content-md-left">
          <div className="row g-2 align-items-center">
            <div className="col-sm-6">
              <Select json={json} register={register} campo={"tipo_producto"} onChange={(e) => onChangeTipoProducto(e)}/>
              {errors?.tipo_producto?.type === "required" && (
                <div class="alert alert-danger" role="alert">
                  {errors?.tipo_producto?.message}
                </div>
              )}
            </div>
            <div className="col-sm-6">
              <Select
                json={json}
                register={register}
                campo={"linea_comercial"}
              />
              {errors?.linea_comercial?.type === "required" && (
                <div class="alert alert-danger" role="alert">
                  {errors?.linea_comercial?.message}
                </div>
              )}
            </div>
          </div>
          <div className="row g-2 align-items-center">
            <div className="col-sm-6">
              <Select
                json={json}
                register={register}
                campo={"origen"}
                onChange={onChange}
              />
              {errors?.origen?.type === "required" && (
                <div class="alert alert-danger" role="alert">
                  {errors.origen.message}
                </div>
              )}
            </div>
            <div className="col-sm-6">
              <Input
                register={register}
                campo={"copiarReferencia"}
                required={true}
              />
              {errors?.copiarReferencia?.type === "required" && (
                <div class="alert alert-danger" role="alert">
                  Copia desde referencia es obligatoria
                </div>
              )}
            </div>
          </div>
          <div className="row g-2 align-items-center">

          <Referencias
              referencias={referencias}
              setReferencias={setReferencias}
              setValue={setValue}
            />
            
            {/* <label htmlFor="recurso" className="col-sm-3 col-form-label">
              SKU
              <span className="text-danger"> *</span>
            </label>
            <div className="col-sm-8">
              <input
                  placeholder="SKU"
                  className="form-control mb-2"
                  {...register("skuRefProveedor", { required: true, maxLength: 19})}
                  onChange={onChange}
                />
            </div> */}
          </div>
          {/* {errors?.skuRefProveedor?.type === "required" && (
            <div class="alert alert-danger" role="alert">
              SKU o Referencia del Proveedor Requerida
            </div>
          )}
          {errors?.skuRefProveedor?.type === "maxLength" && (
            <div class="alert alert-danger" role="alert">
              SKU cuenta con Maximo 19 caracteres
            </div>
          )} */}
          {/* <Input register={register} campo={"descripcion"} required={true} />
          {errors?.descripcion?.type === "required" && (
            <div class="alert alert-danger" role="alert">
              Descripcion requerida
            </div>
          )} */}
          <Select json={json} register={register} campo={"unidad_medida_1"} />
          {errors?.unidad_medida_1?.type === "required" && (
            <div class="alert alert-danger" role="alert">
              Unidad de Medida Requerida
            </div>
          )}
          <div className="row g-2 align-items-center">
            <div className="col-sm-6">
              <Select
                json={json}
                register={register}
                campo={"deposito"}
              ></Select>
              {errors?.deposito?.type === "required" && (
                <div class="alert alert-danger" role="alert">
                  El deposito es obligatorio
                </div>
              )}
            </div>
            <div className="col-sm-6">
              <Select json={json} register={register} campo={"grupo"}></Select>
              {errors?.grupo?.type === "required" && (
                <div class="alert alert-danger" role="alert">
                  El grupo es obligatorio
                </div>
              )}
            </div>
          </div>
          <div className="row g-2 align-items-center">
            <div className="col-sm-6">
              <Select
                json={json}
                register={register}
                campo={"unidad_medida_2"}
              />
            </div>
            <div className="col-sm-6">
              <Input
                register={register}
                campo={"factorConversion"}
                required={false}
              />
            </div>
          </div>
          <div className="row g-2 align-items-center">
            <div className="col-sm-6">
              {/* <Input
                register={register}
                campo={"costoEstandar"}
                required={false}
              /> */}
            </div>
            <div className="col-sm-6">
              <InputRadio
                json={json}
                register={register}
                campo={"controla_serial"}
                required={true}
              />
              {errors?.controla_serial?.type === "required" && (
                <div class="alert alert-danger" role="alert">
                  Especifique si la referencia controla o no serial
                </div>
              )}
            </div>
          </div>
          <div className="row g-2 align-items-center">
            <div className="col-sm-6">
              <Input
                register={register}
                campo={"codigoArancelario"}
                required={false}
              />
            </div>
            {showOrigen === "comprado" ? (
              <div className="col-sm-6">
                <Input
                  register={register}
                  campo={"cantidad_embalaje"}
                  required={true}
                />
                {errors?.cantidad_embalaje?.type === "required" && (
                  <div class="alert alert-danger" role="alert">
                    Ingrese la cantidad de embalaje
                  </div>
                )}
              </div>
            ) : (
              <div className="col-sm-6">
                <Input
                  register={register}
                  campo={"lote_minimo"}
                  required={true}
                />
                {errors?.lote_minimo?.type === "required" && (
                  <div class="alert alert-danger" role="alert">
                    Ingrese el lote minimo
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="row g-2 align-items-center">
            <div className="col-sm-6">
              <Input
                register={register}
                campo={"stockMaximo"}
                required={false}
              />
            </div>
            <div className="col-sm-6">
              <Input register={register} campo={"diasStock"} required={false} />
            </div>
          </div>
          <div className="row g-2 align-items-center">
            <Proveedores
              proveedores={proveedores}
              setProveedores={setProveedores}
              setValue={setValue}
            />
          </div>
          <div className="row g-2 align-items-center">
            <div className="col-sm-6">
              <InputRadio
                json={json}
                register={register}
                campo={"control_calidad"}
                required={true}
              />
              {errors?.control_calidad?.type === "required" && (
                <div class="alert alert-danger" role="alert">
                  Especifique si la referencia tiene control de calidad
                </div>
              )}
            </div>
            <div className="col-sm-6">
              <Select
                json={json}
                register={register}
                campo={"centro_costo"}
              ></Select>
              {errors?.centro_costo?.type === "required" && (
                <div class="alert alert-danger" role="alert">
                  El centro de costo es obligatorio
                </div>
              )}
            </div>
          </div>
          <div className="row g-2 align-items-center">
            <div className="col-sm-6">
              <Input
                register={register}
                campo={"ubicacion1"}
                required={false}
              />
            </div>
            <div className="col-sm-6">
              <Input
                register={register}
                campo={"ubicacion2"}
                required={false}
              />
            </div>
          </div>
          <div className="row g-2 align-items-center">
            <div className="col-sm-6">
              <Input
                register={register}
                campo={"precioVenta"}
                required={venta}
              />
              {errors?.precioVenta?.type === "required" && (
                <div class="alert alert-danger" role="alert">
                  El precio de venta es obligatoria
                </div>
              )}
            </div>
            <div className="col-sm-6">
              <Select json={json} register={register} campo={"categoria_1"} />
              {errors?.categoria_1?.type === "required" && (
                <div class="alert alert-danger" role="alert">
                  La categoria 1 es obligatoria
                </div>
              )}
            </div>
          </div>
          <div className="row g-2 align-items-center">
            <div className="col-sm-6">
              <Select json={json} register={register} campo={"categoria_2"} />
              {errors?.categoria_2?.type === "required" && (
                <div class="alert alert-danger" role="alert">
                  La categoria 2 es obligatoria
                </div>
              )}
            </div>
            <div className="col-sm-6">
              <Select json={json} register={register} campo={"categoria_3"} />
              {errors?.categoria_3?.type === "required" && (
                <div class="alert alert-danger" role="alert">
                  La categoria 3 es obligatoria
                </div>
              )}
            </div>
          </div>
          <div className="row g-2 align-items-center">
            <div className="col-sm-6">
              <Select json={json} register={register} campo={"categoria_4"} />
              {errors?.categoria_4?.type === "required" && (
                <div class="alert alert-danger" role="alert">
                  La categoria 4 es obligatoria
                </div>
              )}
            </div>
            <div className="col-sm-6">
              <Select json={json} register={register} campo={"categoria_5"} />
              {errors?.categoria_5?.type === "required" && (
                <div class="alert alert-danger" role="alert">
                  La categoria 5 es obligatoria
                </div>
              )}
            </div>
          </div>
          <div className="row g-2 align-items-center">
            <div className="col-sm-6">
              <Select json={json} register={register} campo={"mercado"} />
              {errors?.mercado?.type === "required" && (
                <div class="alert alert-danger" role="alert">
                  {errors?.mercado?.message}
                </div>
              )}
            </div>
            <div className="col-sm-6">
              <InputRadio
                json={json}
                register={register}
                campo={"habilita_portal"}
                required={true}
              />
              {errors?.habilita_portal?.type === "required" && (
                <div class="alert alert-danger" role="alert">
                  Especifique si la referencia se habilita en el portal
                </div>
              )}
            </div>
          </div>
          <p></p>
        </div>
        <div className="row g-2 align-items-center">
          <div className="col-sm-6">
            <Input register={register} campo={"nombre"} required={true} />
            {errors?.nombre?.type === "required" && (
              <div class="alert alert-danger" role="alert">
                El nombre del solicitante es requerido
              </div>
            )}
          </div>
          <div className="col-sm-6">
            <Input
              register={register}
              campo={"correo_electronico"}
              required={true}
            />
            {errors?.correo_electronico?.type === "required" && (
              <div class="alert alert-danger" role="alert">
                El correo electronico es obligatoria
              </div>
            )}
          </div>
        </div>
        <p></p>
        <div className="d-grid gap-2 col-4 mx-auto">
          <button type="submit" className="btn btn-success">
            Enviar
          </button>
          <p></p>
        </div>
      </div>
    </form>
  );
};

export default Main;
