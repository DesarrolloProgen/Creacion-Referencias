import { useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";

const Referencias = ({ referencias, setReferencias }) => {


  const sku = useRef(null);
  const descripcion = useRef(null);
  const precio = useRef(null);

  const [referencia, setReferencia] = useState({
    descripcion: "",
  });

  const handleChange = (e) => {
    setReferencia({
      ...referencia,
      [e.target.name]: e.target.value,
    });
    console.log(referencia);
  };

  const handleReferencias = (e) => {
    e.preventDefault();
    console.log(referencia);
    if (
      referencia.sku == null ||
      referencia.descripcion == null ||
      referencia.precio == null ||
      referencia.sku === "" ||
      referencia.descripcion === "" ||
      referencia.precio === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Diligencie los campos obligatorios para agregar la referencia",
      });
      return false;
    }
    setReferencias([...referencias, referencia]);
    sku.current.value = "";
    descripcion.current.value = "";
    precio.current.value = "";
    console.log(e);
  };

  const deleteReferencia = (e, index) => {
    e.preventDefault();
    setReferencias(referencias.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="row g-2 align-items-center">
        <div className="col-sm-4">
          <div className="row g-2 align-items-center">
            <label htmlFor="recurso" className="col-sm-3 col-form-label">
              SKU
              <span className="text-danger"> *</span>
            </label>
            <div className="col-sm-8">
              <input
                placeholder="SKU"
                className="form-control mb-2"
                name="sku"
                ref={sku}
                onChange={handleChange}
                maxLength={19}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="row g-2 align-items-center">
            <label htmlFor="recurso" className="col-sm-3 col-form-label">
              Descripción
              <span className="text-danger"> *</span>
            </label>
            <div className="col-sm-8">
              <input
                placeholder="descripcion"
                className="form-control mb-2"
                name="descripcion"
                ref={descripcion}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="row g-2 align-items-center">
            <label htmlFor="recurso" className="col-sm-4 col-form-label">
              Precio
            </label>
            <div className="col-sm-8">
              <input
                placeholder="Precio para la referencia"
                className="form-control mb-2"
                name="precio"
                ref={precio}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="d-grid gap-2 col-4 mx-auto">
        <button
          className="btn btn-primary"
          onClick={(e) => handleReferencias(e)}
        >
          AGREGAR
        </button>
        <p></p>
      </div>
      <div className="d-grid gap-2 col-12 mx-auto">
        {referencias.length > 0 && (
          <Table hover responsive="sm" bordered striped size="md-1">
            <thead>
              <tr>
                <th className="text-center">Item</th>
                <th className="text-center">Referencia</th>
                <th className="text-center">Descripción</th>
                <th className="text-center">Precio</th>
              </tr>
            </thead>
            <tbody>
              {referencias.map((referencia, index) => (
                <tr>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{referencia.sku}</td>
                  <td className="text-center">{referencia.descripcion}</td>
                  <td className="text-center">{referencia.precio}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-danger"
                      onClick={(event) => deleteReferencia(event, index)}
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

export default Referencias;
