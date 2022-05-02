import React from "react";
import { useForm } from "react-hook-form";

const AddUserForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    props.addUser(data);
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Nombre</label>
      <div className="text-danger mb-4">{errors?.name?.message}</div>
      <input
        placeholder="Ingresa su Nombre Por favor"
        type="text"
        name="name"
        {...register("name", {
          required: { value: true, message: "Campo Requerido" },
        })}
      />
      <label>Nombre de Usuario</label>
      <div className="text-danger mb-4">{errors?.username?.message}</div>
      <input
        placeholder="Ingresa Nombre de Usuario Por favor"
        type="text"
        name="username"
        {...register("username", {
          required: { value: true, message: "Campo Requerido" },
        })}
      />

      <button>Agregar Usuario</button>
    </form>
  );
};

export default AddUserForm;
