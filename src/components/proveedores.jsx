import { useState } from "react";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";

const Proveedores = ({ proveedores, setProveedores }) => {
  const [proveedor, setProveedor] = useState({
    refCruzada: "",
    tiempo_transporte: ""
  });

  const handleChange = (e) => {
    setProveedor({
      ...proveedor,
      [e.target.name]: e.target.value,
    });
    console.log(proveedor);
  };

  const handleProveedores = (e) => {
    e.preventDefault();
    console.log(proveedor);
    if (
      proveedor.nit == null ||
      proveedor.nombre == null ||
      proveedor.precio_venta == null ||
      proveedor.tiempo_entrega == null ||
      proveedor.nit === "" ||
      proveedor.nombre === "" ||
      proveedor.precio_venta === "" ||
      proveedor.tiempo_entrega === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Diligencie los campos obligatorios para agregar al proveedor",
      });
      return false;
    }
    setProveedores([...proveedores, proveedor]);
  };

  const deleteProveedor = (e, index) => {
    e.preventDefault();
    setProveedores(proveedores.filter((item, i) => i !== index));
  };

  return (
    <div>
      <div className="row g-2 align-items-center">
        <div className="col-sm-4">
          <div className="row g-2 align-items-center">
            <label htmlFor="recurso" className="col-sm-4 col-form-label">
              Nit del Proveedor<span className="text-danger"> *</span>
            </label>
            <div className="col-sm-8">
              <input
                placeholder="Nit del Proveedor"
                className="form-control mb-2 "
                name="nit"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="row g-2 align-items-center">
            <label htmlFor="recurso" className="col-sm-4 col-form-label">
              Nombre del Proveedor<span className="text-danger"> *</span>
            </label>
            <div className="col-sm-8">
              <input
                placeholder="Nombre del Proveedor"
                className="form-control mb-2"
                name="nombre"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="row g-2 align-items-center">
            <label htmlFor="recurso" className="col-sm-4 col-form-label">
              Referencia Cruzada
            </label>
            <div className="col-sm-8">
              <input
                placeholder="Referencia Cruzada"
                className="form-control mb-2"
                name="refCruzada"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row g-2 align-items-center">
        <div className="col-sm-4">
          <div className="row g-2 align-items-center">
            <label htmlFor="recurso" className="col-sm-4 col-form-label">
              Precio de Venta<span className="text-danger"> *</span>
            </label>
            <div className="col-sm-8">
              <input
                placeholder="Precio de Venta"
                className="form-control mb-2"
                name="precio_venta"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="row g-2 align-items-center">
            <label htmlFor="recurso" className="col-sm-4 col-form-label">
              Tiempo de Entrega<span className="text-danger"> *</span>  
            </label>
            <div className="col-sm-8">
              <input
                placeholder="Tiempo de Entrega"
                className="form-control mb-2"
                name="tiempo_entrega"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="row g-2 align-items-center">
            <label htmlFor="recurso" className="col-sm-4 col-form-label">
              Tiempo de Transporte
            </label>
            <div className="col-sm-8">
              <input
                placeholder="Tiempo de Transporte"
                className="form-control mb-2"
                name="tiempo_transporte"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="d-grid gap-2 col-4 mx-auto">
        <button
          className="btn btn-primary"
          onClick={(e) => handleProveedores(e)}
        >
          AGREGAR
        </button>
        <p></p>
      </div>
      <div className="d-grid gap-2 col-12 mx-auto">
        {proveedores.length > 0 && (
          <Table hover responsive="sm" bordered striped size="md-1">
            <thead>
              <tr>
                <th className="text-center">Item</th>
                <th className="text-center">Nit</th>
                <th className="text-center">Nombre</th>
                <th className="text-center">Referencia Cruzada</th>
                <th className="text-center">Precio de Compra</th>
                <th className="text-center">Tiempo de Entrega</th>
                <th className="text-center">Tiempo de Transporte</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((proveedor, index) => (
                <tr>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{proveedor.nit}</td>
                  <td className="text-center">{proveedor.nombre}</td>
                  <td className="text-center">{proveedor.refCruzada}</td>
                  <td className="text-center">{proveedor.precio_venta}</td>
                  <td className="text-center">{proveedor.tiempo_entrega}</td>
                  <td className="text-center">{proveedor.tiempo_transporte}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-danger"
                      onClick={(event) => deleteProveedor(event, index)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Proveedores;
