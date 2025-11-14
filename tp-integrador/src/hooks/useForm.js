import { useState } from "react";
//hook useForm que maneja los estados de los formularios
export const useForm = (initialValues ={}) => {
 const [ form, setForm ] = useState(initialValues);

 //maneja los cambios en los inputs 
 const handleChange = (evento) => {
    //desestructuramos en name y value del evento.target
    const { value, name } = evento.target;

//actualizamos los valores del formulario
 setForm ({
    //... sirve para copiar los valores anteriores
    ...form,
    //actualizamos el valor del input que cambio
    [name] : value,

 })
 //maneja el reseteo del formulario
 const handleReset = () => {
    //seteamos los valores a los iniciales
    setForm(initialValues);

    //retornamos todas las funciones y valores necesarios
    return {
        form,
        handleChange,
        handleReset
    }
 }
 }
};
