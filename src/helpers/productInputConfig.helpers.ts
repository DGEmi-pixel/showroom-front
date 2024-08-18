//[ ] PRODUCTS
export const nameConfig = {
    label: 'Nombre del Producto',
    name: 'name',
    type: 'text',
    id: 'name',
    placeholder: 'Enter the product name'
}

export const descriptionConfig = {
    label: 'Descripción del Producto',
    name: 'description',
    type: 'text',
    id: 'description',
    placeholder: 'Enter the description'
}

export const priceConfig = {
    label: 'Precio',
    name: 'price',
    type: 'number',
    id: 'productName',
    placeholder: 'Enter the product price'
}

export const discountConfig = {
    label: 'Descuento',
    name: 'discount',
    type: 'number',
    id: 'discount',
    placeholder: 'Enter the discount'
}

export const seasonConfig = {
    label: 'Temporada',
    name: 'season',
    type: 'text',
    id: 'season',
    placeholder: 'Enter the season'
}

export const brandConfig = {
    label: 'Marca',
    name: 'brand',
    type: 'text',
    id: 'brand',
    placeholder: 'Enter the brand name'
}


export const sizeConfig = {
    label: "Talles Disponible",
    name: 'clothsize',
    type: 'number',
    id: 'clothsize',
    placeholder: 'Ingresa el talle'
}


//[ ] INPUTS PERSONALIZADOS
export const colorsConfig = {
    label: "Colores Disponibles",
    name: 'colors',
    type: 'custom', // Tipo personalizado para indicar que no es un input convencional
    id: 'colors',
};

export const modalProductsConfig = {
    name: nameConfig,
    description: descriptionConfig,
    price: priceConfig,
    discount: discountConfig,
    season: seasonConfig,
    brand: brandConfig,
    clothsize: sizeConfig,
    colors: colorsConfig,
}


