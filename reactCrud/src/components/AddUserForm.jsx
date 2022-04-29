import React from "react";
import { useForm } from "react-hook-form";

const AddUserForm = (props) => {
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = (data, e) => {
    props.addUser(data)
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name</label>
      <div>
      {errors?.name?.message}
      </div>
      <input
        placeholder="Ingresa nombre Por favor"
        type="text"
        name="name"
        {...register('name', { required: true, message:'Campo Requerido' })}
      />
      <label>Username</label>
      <input
      placeholder="Ingresa nombre Usuario Por favor"
        type="text"
        name="username"
        {...register('username', { required: {value :true, message: 'Campo Requerido'} })}
      />
      <button>Add new user</button>
    </form>
  );
};

export default AddUserForm;
