import * as yup from 'yup';

export const schemas = {
    firstName: yup.string().required('Campo requerido').min(2, 'Minimo 2 caracteres').max(30, 'Maximo 30 caracteres').matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]*$/, 'Ingrese un nombre válido'),
    lastName: yup.string().required('Campo requerido').min(2, 'Minimo 2 caracteres').max(30, 'Maximo 30 caracteres').matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]*$/, 'Ingrese un apellido válido'),
    email: yup.string().required('Campo requerido').email('Formato de correo electrónico inválido').max(50, 'Maximo 50 caracteres'),
    username: yup.string().required('Campo requerido').min(2, 'Minimo 2 caracteres').max(30, 'Maximo 30 caracteres'),
    password: yup.string().required('Campo requerido').min(8, 'Minimo 8 caracteres').matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, 'Debe contener al menos un número, una mayúscula y una minúscula'),
    repeatPassword: yup.string().required('Campo requerido').min(8, 'Minimo 8 caracteres').oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),

    //[ ] GENÉRICOS
    name: yup.string().required('Campo requerido').min(2, 'Minimo 2 caracteres').max(30, 'Maximo 30 caracteres').matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]*$/, 'Ingrese un nombre válido'),
    description: yup.string().required('Campo requerido').min(4, 'Mínimo 4 caracteres').max(254).matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ,\s]*$/, 'La descripción solo debe contener texto'),

    //[ ] PROFILE / SETTINGS
    showroomName: yup.string().required('Campo requerido').min(2, 'Minimo 2 caracteres').max(30, 'Maximo 30 caracteres').matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ&-\s]*$/, 'Ingrese un nombre válido'),
    country: yup.string().required('Campo requerido').min(4, 'Minimo 4 caracteres').max(60, 'Maximo 60 caracteres').matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ,\s]*$/, 'Ingrese el nombre de un país válido'),
    city: yup.string().required('Campo requerido').min(4).max(60, 'Maximo 60 caracteres').matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ,\s]*$/, 'Ingrese el nombre de una ciudad válido'),
    phoneNumber: yup.string().required('Debe ingresar un teléfono válido').min(9).max(25).matches(/^[0-9-\s]*$/, 'El formato del teléfono no es válido. Debe ser en el formato: código de área - número. Ejemplo: 2964-4567890'),
    postalCode: yup.string().required('Debe ingresar un CPA válido').min(4).max(20).matches(/^[0-9a-zA-ZáéíóúÁÉÍÓÚ\s]*$/, 'Ingrese un CPA válido'),
    titleAbout: yup.string().required('Campo requerido').min(4, 'Mínimo 4 caracteres').max(30, 'Máximo 30 caracteres').matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ&-\s]*$/, 'El título solo debe contener texto'),
    historyAbout: yup.string().required('Campo requerido').min(4, 'Mínimo 4 caracteres').max(200, 'Máximo 200 caracteres').matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]*$/, 'La historia solo debe contener texto'),

    //[ ] PRODUCTS
    price: yup.number().typeError("Debe ingresar un número").required('Campo requerido').min(1, 'El precio debe ser mayor a cero').max(9999999),
    colors: yup.array().min(1, 'Seleccione un color').required('Campo requerido'),
    // offer: yup.number().required('Campo requerido'),
    discount: yup.number().min(1, 'El descuento debe ser mayor a uno').max(99, 'El descuento debe ser menor a 99'),
    // season: yup.string().required('Campo requerido'),
    // type: yup.string().required('Campo requerido'),
    brand: yup.string().required('Debe ingresar el nombre de la marca'),
    clothsize: yup.number().typeError('Debe ingresar un número')
        .required('Debe ingresar al menos un talle')
        .min(1, 'El talle debe ser mayor a 1') //PARA EL INPUT
        .max(60, 'El talle debe ser menor a 60'),
    sizes: yup.array().of( 
        yup.number()
            .typeError('El talle debe ser un número')
            .required()
            .min(1, 'El talle debe ser mayor a 1')
            .max(60, 'El talle debe ser menor a 60')
    )
    .required('Debe ingresar un valor')
    .min(1, 'Debe ingresar al menos un valor')
};