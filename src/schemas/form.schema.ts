import * as yup from 'yup';
import { schemas } from './index.schema';

export const registerSchema = yup.object().shape({
    firstName: schemas.firstName,
    lastName: schemas.lastName,
    email: schemas.email,
    username: schemas.username,
    password: schemas.password,
    repeatPassword: schemas.repeatPassword,
});

export const loginSchema = yup.object().shape({
    username: schemas.username,
    password: schemas.password,
});

export const modalSchema = yup.object().shape({
    name: schemas.name,
    lastName: schemas.lastName,
    email: schemas.email,
    username: schemas.username,
    password: schemas.password,
    repeatPassword: schemas.repeatPassword,
    showroomName: schemas.showroomName,
    country: schemas.country,
    city: schemas.city,
    phoneNumber: schemas.phoneNumber,
    postalCode: schemas.postalCode,
    titleAbout: schemas.titleAbout,
    description: schemas.description,
    historyAbout: schemas.historyAbout
})

export const productModalSchema = yup.object().shape({
    name: schemas.name,
    description: schemas.description,
    price: schemas.price,
    // offer: schemas.offer,
    discount: schemas.discount,
    // season: schemas.season,
    // type: schemas.type,
    brand: schemas.brand,
    clothsize: schemas.clothsize,
    colors: schemas.colors,
    sizes: schemas.sizes
})
