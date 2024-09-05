"use client";
import React from 'react'
import Image from 'next/image'
import logo from '../../../../../../public/img/logo/Logo.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark, faFilter, faXmark, faXmarkCircle, faUpload } from '@fortawesome/free-solid-svg-icons'
import { faPlus, faListCheck, faRightFromBracket, faTrash, faPenToSquare, faStar as solidStar } from '@fortawesome/free-solid-svg-icons'
import { faUser, faSquarePlus, faStar as regularStar } from "@fortawesome/free-regular-svg-icons"
import { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react'
import { Pagination } from "@/components/pagination";
import useElementSize from '@/hooks/viewport.hook';
import Modal from 'react-modal'

//[ ]ALERTS && NOTIFY
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import '@/styles/alerts.css'
import 'react-toastify/dist/ReactToastify.css';
import { toast, Zoom, Bounce, Flip, ToastContainer } from 'react-toastify';

import { FormProvider, useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProductModalFormValues } from '@/types/form.types';
import { productModalSchema } from '@/schemas/form.schema';
import { InputWithLabel } from "@/components/input"
import { modalProductsConfig } from '@/helpers/productInputConfig.helpers';
import { ColorPicker } from '@/components/colorPicker';

//[ ] TIPOS
import { Season, seasonTranslations, TypeOfClothing } from '@/types/product.types';
import { ProductModal } from '@/types/product.types';

//[ ] HOOKS
import { useProductHook } from '@/hooks/product.hook'

//[ ] FILTERS
import { Filter } from '@/types/product.types'

//[ ] SIDEBAR FILTERS
import { Sidebar } from '@/components/sidebar'

//[ ] LOGOUT
import { useAuthHook } from '@/hooks/auth.hook'

//[ ] Menu sidebar
import { MenuSidebar } from '@/components/menuSidebar';

import { InputError } from '@/components/toolTipError';

//[ ] SPINNER
import { Spinner } from '@/components/spinner';

//[ ] LOADING PLACEHOLDER
import { LoadingPlaceHolder } from '@/components/loadingPlaceholder';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        outline: 'none',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: 'white',
        borderRadius: '10px',
        padding: '20px',
        transition: 'transform 300ms ease-in-out',
        width: '550px',
        height: '750px'
    },
};

export default function DashboardProducts() {

    const { logout } = useAuthHook()

    const MySwal = withReactContent(Swal);

    //[ ] HOOKS
    const { products, brandCount, applyFilters, createProduct, updateProduct, removeProduct, removeManyProducts, checkedStates, setCheckedStates, 
        productLoading, firstLoadProduct, productError, currentProducts, currentPage, 
        productsPerPage, setCurrentPage } = useProductHook()

    const [productModalData, setProductModalData] = useState<ProductModal>({
        id: '',
        name: '',
        description: '',
        outstanding: false,
        price: 0,
        offer: false,
        discount: 0,
        season: 'Winter',
        type: 'Todos',
        brand: '',
        size: [],
        clothsize: 0,
        colors: [''],
        imageUrl: '',
    });

    const initialProduct: ProductModal = {
        id: '',
        name: '',
        description: '',
        outstanding: false,
        price: 0,
        offer: false,
        discount: 0,
        season: 'Summer',
        type: 'Todos',
        brand: '',
        size: [],
        clothsize: 0,
        colors: [],
        imageUrl: ''
    }

    //[ ] COMPORTAMIENTO SIDEBAR FILTERS
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleFilterApply = (filters: Filter) => {
        applyFilters(filters);
    };

    const [operationNumber, setOperationNumber] = useState<number>(0)

    //[ ] MÉTODO DEL PRODUCT MODAL
    // const methods = useForm<ProductModalFormValues>({ resolver: yupResolver(productModalSchema) })
    const methods = useForm<ProductModalFormValues>({
        resolver: yupResolver(productModalSchema),
        defaultValues: {
            colors: productModalData?.colors || [], // Valor inicial para colors
            sizes: productModalData?.size || []
        },
    });

    //[ ] MODAL
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState<string>("") //[ ] TÍTULO DEL MODAL

    function openModal(opNumber: number, id?: string) {
        const productFound = products.find(product => product.id === id)

        switch(opNumber)
        {
            case 0: //ADD

                methods.reset({
                    colors: [], // Asegúrate de limpiar el array de colores
                });

                setIsOpen(true)
                setModalTitle("Agregar nuevo producto")

                //RESET
                setProductModalData(initialProduct)
                setColors([])
                setOfferCheck(false)
                setSeason("Autumn")
                setArrayClothSizes([])
                setOutstandingCheck(false)

                break

            case 1: //UPDATE
                if(productFound != undefined) {

                    setOfferCheck(productFound.offer)
                    setOutstandingCheck(productFound.outstanding)
                    setSeason(productFound.season)
                    setArrayClothSizes(productFound.size)
                    setColors(productFound.colors)

                     // Actualiza los valores del formulario usando `reset`
                    methods.reset({
                        colors: productFound.colors,
                        sizes: productFound.size
                    });

                    setProductModalData({
                        id: productFound.id,
                        name: productFound.name,
                        description: productFound.description,
                        brand: productFound.brand,
                        type: productFound.type,
                        price: productFound.price,
                        outstanding: productFound.outstanding,
                        offer: productFound.offer,
                        discount: productFound.discount,
                        season: productFound.season,
                        size: productFound.size, //
                        clothsize: productFound.size[0],
                        colors: productFound.colors,
                        imageUrl: ''
                    })

                    //[ ] ACTUALIZAMOS EL VALOR DEL PREVIEW IMAGE
                    setImageUrl(productFound.imageUrl)
                }
                setIsOpen(true)
                setModalTitle("Modificar producto")

                break
        }

        setOperationNumber(opNumber)
    }

    function closeModal() {
        setIsOpen(false);

        //[ ] SE ELIMINA EL VALOR DE FILE Y LA URL PUBLICA
        setFile(null)
        setImageUrl(null)

        //[ ] RESET VALIDACIONES PENDIENTES
        methods.reset()
    }

    //[ ] EVENTS
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        // Actualizar el estado usando la función de actualización previa
        setProductModalData(prevData => ({
            ...prevData,
            [name]: value,
        }));

        //[ ] Si el input es el del descuento o el precio se llama a la función para calcular el precio final que verá el usuario
        if(e.target.name === 'price' || e.target.name === 'discount') {
            //[ ] Obtenemos los valores actuales de los campos price y discount
            const price = name === 'price' ? Number(value) : Number(productModalData.price);
            const discount = name === 'discount' ? Number(value) : Number(productModalData.discount);

            handlefinalPrice(price, discount);
        }
    }
    
    //[ ]CHECKBOX PARA ELIMINAR VARIOS PRODUCTOS
    const handleCheckboxChange = (productId: string) => {
        setCheckedStates(prev => ({
            ...prev,
            [productId]: !prev[productId]
        }))
    };

    //[ ]PAGINACIÓN
    const [viewportHeight, setViewportHeight] = useState<number>(0);
    const contentRef = useRef(null); //REFERENCIA AL CONTENIDO QUE SE DESPLAZA
    const { height: contentHeight } = useElementSize(contentRef); //HOOK PARA SABER LA ALTURA DEL CONTENIDO

    useLayoutEffect(() => {
    //[ ] Solo ejecuta esto en el cliente
    if (typeof window !== 'undefined') {
        const updateViewportHeight = () => setViewportHeight(window.innerHeight);

        updateViewportHeight();
        window.addEventListener('resize', updateViewportHeight);

        return () => window.removeEventListener('resize', updateViewportHeight);
    }
    }, []);

    //[ ] PRECIO FINAL
    const [finalPrice, setFinalPrice] = useState(0)

    const handlefinalPrice = (price: number, discount: number) => {
        const result = price - ((price * discount) / 100)
        if(result >= 1) {
            setFinalPrice(result)
        }
    }

    const isPaginationFixed = contentHeight < viewportHeight;

    //[ ] SELECT
    const [isSeasonActive, setSeasonActive] = useState(false);
    const [selectedSeason, setSeason] = useState<Season>("Autumn");

    const toggleSelect = () => setSeasonActive(!isSeasonActive);
    const handleOptionSeason = (option: Season) => {
        setSeason(option);
        setSeasonActive(false);
    };

    const [isTypeActive, setTypeActive] = useState(false);
    const [selectedType, setType] = useState<TypeOfClothing>("Casual");

    const toggleSelectType = () => setTypeActive(!isTypeActive);
    const handleOptionType = (option: TypeOfClothing) => {
        setType(option);
        setTypeActive(false);
    };

    //[ ] CHECKBOX
    const [isOfferChecked, setOfferCheck] = useState(true);

    const handleCheckboxChangeOffer = () => {
        setOfferCheck((prevValue) => {
            const newValue = !prevValue
            //Si no se marca el checkbox, no hay descuento
            if (newValue === false) {
                handlefinalPrice(productModalData.price, 0)
            } else {
                handlefinalPrice(productModalData.price, productModalData.discount)
            }
            return newValue
        })
    };

    const [isOutstandingChecked, setOutstandingCheck] = useState(true);

    const handleCheckboxChangeOutstanding = () => {
        setOutstandingCheck(!isOutstandingChecked)
    };

    //[ ] PICKER COLOR COMPONENT
    const [_color, setColor] = useState('#ffffff');
    const [colors, setColors] = useState<string[]>([]);
    
    const handleColorChange = (newColor: string) => {
        //Actualiza el color localmente
        setColor(newColor);

        // Actualiza el array de colores si el nuevo color no está ya presente
        if (!colors.includes(newColor)) {
            const updatedColors = [...colors, newColor];
            setColors(updatedColors);

            // Actualiza el estado en react-hook-form
            methods.setValue('colors', updatedColors);
        }
    };

    const handleAddColor = (newColors: string[]) => {
        //Actualiza el estado local
        setColors(newColors);

        // Actualiza el estado en react-hook-form
        methods.setValue('colors', newColors);

        methods.trigger('colors')
    };


    //[ ] SIZE CLOTH
    const [arrayClothSizes, setArrayClothSizes] = useState<number[]>([])

    const handleAddClothSize = (size: number) => {
        const newClothSize = [...arrayClothSizes]
        if(!arrayClothSizes.includes(size)){
            newClothSize.push(Number(size))
        }

        methods.setValue('sizes', newClothSize)
        methods.trigger('sizes')
        setArrayClothSizes(newClothSize)
    }

    const handleRemoveClothSize = (index: number) => {
        setArrayClothSizes(prevArray => {
            const updatedArray = prevArray.filter((_, i) => i !== index);
    
            methods.setValue('sizes', updatedArray);
            methods.trigger('sizes');
                
            return updatedArray;
        });
    }

    const [file, setFile] = useState<File | null>(null)
    const [imageUrl, setImageUrl] = useState<string | null>('')

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
            setImageUrl(null);
        }
    };

    //[ ] ELIMINAR PRODUCTO
    const handleRemoveProduct = async (productId: string, productIndex: number) => {
        MySwal.fire({
            title: '¿Está seguro de eliminar?',
            html: `<div class="custom-swal-text">Se eliminará el producto <span class="custom-swal-text-span">${products[productIndex].name}</span> </div>`,
            // icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No, cancelar',
            customClass: {
                popup: 'custom-swal',
                title: 'custom-swal-title',
                htmlContainer: 'custom-swal-html',
                icon: 'custom-swal-icon',
                confirmButton: 'custom-swal-confirm-button',
            },
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const resServ = await removeProduct(productId)
                    if(resServ.error === false){
                        toast.info(resServ.message)
                    } else {
                        toast.error(resServ.message)
                    }
                } 
        });

        
    }

    //[ ] ELIMINAR VARIOS PRODUCTOS
    const handleDeleteSelected = async () => {
        //Se filtran los productos seleccionados y se mapean los id
        const selectedProducts: string[] = products
        .filter((product, _) => checkedStates[product.id])
        .map(product => product.id)

        if(selectedProducts.length > 0){ 
            MySwal.fire({
                title: '¡Está eliminado varios productos!',
                html: `<div class="custom-swal-text">Esta acción no puede deshacerse </div>`,
                showCancelButton: true,
                confirmButtonText: 'Sí',
                cancelButtonText: 'No, cancelar',
                customClass: {
                    popup: 'custom-swal',
                    title: 'custom-swal-title',
                    htmlContainer: 'custom-swal-html',
                    icon: 'custom-swal-icon',
                    confirmButton: 'custom-swal-confirm-button',
                },
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const resServ = await removeManyProducts(selectedProducts)
                        if(resServ.error === false) {
                            toast.info(resServ.message)
                        } else {
                            toast.error(resServ.message)
                        }
                    }
                });
            }
    }

    //[ ] EVENTO SUBMIT Y OnChange
    const submitForm = async () => {
    
        const isValid = await methods.trigger()

        //SI LOS CAMPOS ESTÁN VALIDADOS
        if(isValid){
            //CERRAMOS EL MODAL
            closeModal()

            const updateProductModalData: ProductModal = {
                ...productModalData,
                outstanding: isOutstandingChecked,
                offer: isOfferChecked,
                size: arrayClothSizes,
                colors: colors,
                season: selectedSeason,
                type: selectedType,
            }

            // Crear un nuevo FormData para menejar archivos
            const formData = new FormData()
            
            if(file){
                formData.append('image', file)
            }

            //Se generan los cambos del Object Entrie según la estructura del modalData
            Object.entries(updateProductModalData).forEach(([key, value]) => {
                if(Array.isArray(value)){
                    formData.append(key, JSON.stringify(value))
                } else if (typeof value === 'boolean' || typeof value === 'number') {
                    formData.append(key, value.toString());
                } else if (value !== undefined && value !== null) {
                    formData.append(key, value);
                }
            })

            try { //[ ] ADD PRODUCT
                if(operationNumber === 0) {
                    const resServ = await createProduct(formData)
                    if(resServ.error === false){
                        toast.info(resServ.message)
                    } else {
                        toast.error(resServ.message)
                    }
                } else if(operationNumber === 1) { //[ ] UPDATE PRODUCT
                    const resServ = await updateProduct(formData)
                    if(resServ.error === false){
                        toast.info(resServ.message)
                    } else {
                        toast.error(resServ.message)
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        Modal.setAppElement('#rootmodal')
    }, [products, methods])

    return(
        <main className='text-[14px] w-[100vw] h-[100vh] bg-box_1-secondary select-none overflow-x-hidden
            text-dashboard-color-dark'>
                <div className='relative flex flex-row w-[96%] gap-[1.8rem]'>
                    {/*[ ] NAVBAR */}
                    <aside className='fixed bg-box_1-accent h-[100vh] flex flex-col'>
                        <div className="w-[14rem] flex items-center justify-between mt-[1.4rem]">
                            <div className="logo flex flex-col gap-[0.8rem]">
                                <div className='block w-[100%] ml-9'>
                                    <Image
                                        alt='Sidebar Logo'
                                        src={logo}
                                        width={100} 
                                        height={100}
                                        className='mx-auto relative max-w-20 rounded-[16px]'>
                                    </Image>
                                </div>
                                <h2 className='text-box_1-bgSecondary text-[1.4rem] text-center ml-[70px]'>M<span className='text-box_1-text_primary'>N</span></h2>
                                </div>
                            <div className='close-btn hidden'>
                                <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                            </div>
                        </div>
                        
                        {/* [ ] NAVBAR SIDEBAR */ }
                        <MenuSidebar logout={logout} openModal={openModal} linkActive={1}/>
                    </aside>

                    {/*[ ] SIDEBAR FILTERS */}
                    <Sidebar products={products} brandCount={brandCount} logo={true} onFilterApply={handleFilterApply} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

                     {/* MAIN */}
                    <div className='mt-[1.8rem] ml-[220px]'>
                        <div className='relative flex flex-col w-[100vw] h-dashboard-main-height ml-[20px] py-4 px-6 bg-slate-100 rounded-2xl transition-all duration-300 ease-in-out'>
                            
                            {/*[ ] MODAL */}
                            
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                style={customStyles}
                                overlayClassName="ModalOverlay"
                                className={{
                                    base: 'ModalContent',
                                    afterOpen: 'ModalContent--after-open',
                                    beforeClose: 'ModalContent--before-close',
                                }}
                                closeTimeoutMS={300}
                                contentLabel="Products Modal"
                            >
                                
                                <h2 className='text-box_1-text_primary font-bold text-[18px] ml-[35px]'>{modalTitle}</h2>
                                <FormProvider {...methods}>
                                    <form className='relative' onSubmit={async (e) => {
                                        e.preventDefault()
                                        submitForm()
                                    }}>
                                        <div className='flex flex-wrap h-[280px] items-center ml-[35px]'> 
                                            <div className='flex flex-wrap'>
                                                <div className='px-2 mt-[10px]'>
                                                    <InputWithLabel event={handleInputChange} {...modalProductsConfig.name} type='text' value={productModalData.name} />
                                                </div>
                                                <div className='px-2 mt-[10px] ml-[20px]'>
                                                    <InputWithLabel event={handleInputChange} {...modalProductsConfig.description} type='text' value={productModalData.description} />
                                                </div>
                                                <div className='px-2 mt-[10px] w-[100px]'>
                                                    <InputWithLabel event={handleInputChange} {...modalProductsConfig.price} type='number' value={productModalData.price} />
                                                </div>
                                                <div className='px-2 mt-[10px] w-[100px]'>
                                                    <InputWithLabel disabled={!isOfferChecked} event={handleInputChange} {...modalProductsConfig.discount} type='number' value={productModalData.discount} />
                                                </div>
                                                <div className='px-2 mt-[20px] ml-[30px] relative flex flex-col'>
                                                    <label className='text-sm'>Oferta</label>
                                                    <input type="checkbox" checked={isOfferChecked} onChange={handleCheckboxChangeOffer} 
                                                    className="w-6 h-6 mt-[15px] bg-gray-300 checked:bg-box_1-text_primary checked:border-box_1-text_primary 
                                                    checked:after:text-[25px] checked:after:content-['✓'] checked:after:text-white checked:after:block checked:after:absolute
                                                    checked:after:bottom-[8px] checked:after:left-[12px] rounded cursor-pointer" />
                                                </div>
                                                <div className='px-2 mt-[20px] ml-[20px] flex flex-col'>
                                                    <label className='text-sm font-bold'>Precio Final</label>
                                                    <span className='tex-lg mt-[18px]'>${finalPrice}</span>
                                                </div>
                                                <div className='px-2 mt-[10px]'>
                                                    <label className='text-sm'>Temporada</label>
                                                    <div className={`w-[180px] mt-2 relative flex flex-col text-gray-600 font-light bg-white shadow-md rounded transition-all duration-300 ${isSeasonActive ? 'ring-2 ring-blue-500' : ''}`} data-mate-select="active">
                                                        <p className="p-4 cursor-pointer" onClick={toggleSelect}>{seasonTranslations[selectedSeason]}</p>
                                                        <span onClick={toggleSelect} className="absolute top-5 right-2 text-lg h-5 transition-transform duration-300">
                                                        <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
                                                            <path d="M0-.75h24v24H0z" fill="none" />
                                                        </svg>
                                                        </span>
                                                        {isSeasonActive && (
                                                        <div className="z-[50] absolute left-0 top-full w-full bg-white rounded-b shadow-md">
                                                            <ul className="m-0 p-0 list-none">
                                                                {Object.keys(seasonTranslations).map((season) => (
                                                                    <li key={season} onClick={() => handleOptionSeason(season as Season)} className="p-4 hover:bg-gray-200 cursor-pointer">{seasonTranslations[season as Season]}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className='px-2 mt-[10px] ml-[30px]'>
                                                    <label className='text-sm'>Tipo de Indumentaria</label>
                                                    <div className={`w-[180px] mt-2 relative flex flex-col text-gray-600 font-light bg-white shadow-md rounded transition-all duration-300 ${isSeasonActive ? 'ring-2 ring-blue-500' : ''}`} data-mate-select="active">
                                                        <p className="p-4 cursor-pointer" onClick={toggleSelectType}>{selectedType}</p>
                                                        <span onClick={toggleSelectType} className="absolute top-5 right-2 text-lg h-5 transition-transform duration-300">
                                                        <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
                                                            <path d="M0-.75h24v24H0z" fill="none" />
                                                        </svg>
                                                        </span>
                                                        {isTypeActive && (
                                                        <div className="absolute left-0 top-full w-full bg-white rounded-b shadow-md z-10">
                                                            <ul className="m-0 p-0 list-none">
                                                                <li onClick={() => handleOptionType('Casual')} className="p-4 hover:bg-gray-200 cursor-pointer">Casual</li>
                                                                <li onClick={() => handleOptionType('Fiestas')} className="p-4 hover:bg-gray-200 cursor-pointer">Fiestas</li>
                                                                <li onClick={() => handleOptionType('Formal')} className="p-4 hover:bg-gray-200 cursor-pointer">Formal</li>
                                                                <li onClick={() => handleOptionType('Pijamas')} className="p-4 hover:bg-gray-200 cursor-pointer">Pijamas</li>
                                                            </ul>
                                                        </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className='px-2 mt-[10px]'>
                                                    <InputWithLabel event={handleInputChange} {...modalProductsConfig.brand} type='text' value={productModalData.brand} />
                                                </div>
                                                <div className='px-2 relative flex flex-col ml-[20px] mt-[10px]'>
                                                    <label className='text-sm'>Producto Destacado</label>
                                                    <FontAwesomeIcon onClick={handleCheckboxChangeOutstanding} 
                                                        icon={isOutstandingChecked ? solidStar : regularStar }
                                                        className={`${isOutstandingChecked ? 'text-box_1-text_primary' : 'text-gray-300'} w-[30px] h-[30px] mt-[15px] cursor-pointer`}></FontAwesomeIcon>
                                                </div>
                                                <div className='px-2 mt-[10px] flex flex-row'>
                                                    <div className='flex flex-col'>
                                                        <label className='text-sm'>Colores Disponibles</label>
                                                        {/* [ ] PICKER COLOR COMPONENT */}
                                                        {/*<ColorPicker value='#ffffff' onAddColor={handleAddColor} onChange={handleColorChange} originalArray={colors}/> */}
                                                        <div className='relative'>
                                                            <Controller
                                                                name="colors"
                                                                control={methods.control}
                                                                render={({ field }) => (
                                                                    <ColorPicker
                                                                        value={field.value[0]} // Array de colores actual
                                                                        onChange={(color) => {
                                                                            handleColorChange(color);
                                                                        }}
                                                                        onAddColor={(colors) => {
                                                                            handleAddColor(colors);
                                                                        }}
                                                                        originalArray={field.value}
                                                                    />
                                                                )}
                                                            />
                                                            {methods.formState.errors.colors && (
                                                                <div className='absolute left-0 top-[60px] w-full mt-0 z-40 slide-bottom'>
                                                                    <InputError
                                                                        message={methods.formState.errors.colors.message ?? ''}
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>                                                        
                                                    </div>

                                                    <div className='relative ml-[40px] flex flex-col'>
                                                        <div className='flex flex-row'>
                                                            <InputWithLabel inputStyles={{width: '160px'}} event={handleInputChange} {...modalProductsConfig.clothsize} type='number' value={productModalData.clothsize} />
                                                            <FontAwesomeIcon
                                                                style={{ pointerEvents: methods.formState.errors.clothsize ? 'none' : 'auto' }} 
                                                                aria-disabled={!!methods.formState.errors.clothsize}
                                                                icon={faSquarePlus} 
                                                                onClick={() => handleAddClothSize(productModalData.clothsize)} 
                                                                className='w-[30px] h-[30px] mt-[40px] ml-2 cursor-pointer bg-box_1-text_primary text-[#fff] rounded-md'></FontAwesomeIcon>
                                                        
                                                            {methods.formState.errors.sizes && (
                                                                <div className='absolute left-0 top-[60px] w-[160px] mt-0 z-40 slide-bottom'>
                                                                <InputError
                                                                    message={methods.formState.errors.sizes.message ?? ''}
                                                                />
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className='max-w-[180px] max-h-[40px] mt-[25px] flex flex-wrap overflow-y-scroll'>
                                                            {arrayClothSizes.map((element, index) => (
                                                                <span key={index}
                                                                    className='bg-box_1-text_primary text-[#fff] relative w-[24px] h-[24px] text-[14px] ml-3 mt-3 shadow-md rounded-md text-center font-bold'>
                                                                    {element}
                                                                    <FontAwesomeIcon key={index}
                                                                        onClick={() => handleRemoveClothSize(index)}
                                                                        icon={faCircleXmark} 
                                                                        className='absolute top-[-4px] left-[19px] w-[18px] h-[18px] cursor-pointer rounded-full bg-white text-dashboard-color-danger'> 
                                                                    </FontAwesomeIcon>
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='relative px-2 mt-[25px] w-[220px] h-[60px] flex flex-row group'>
                                                    <input
                                                        id='fileInput'
                                                        type="file" 
                                                        className='hidden' 
                                                        onChange={handleFileChange}
                                                    />
                                                    <label
                                                        htmlFor='fileInput'
                                                        className='inline-block uppercase text-box_1-primary bg-box_1-text_primary my-auto
                                                        px-[40px] py-[12px] text-[16px] cursor-pointer shadow-dashboard-input-shadow_4 
                                                        rounded-[3px] active:scale-[0.9] group-active:scale-[0.9] transition-all'>Subir Imagen</label>
                                                    <FontAwesomeIcon
                                                        icon={faUpload} 
                                                        className='absolute top-[18px] left-[20px] text-box_1-primary text-[20px]
                                                        group-active:scale-[0.9]'>
                                                    </FontAwesomeIcon>
                                                </div>
                                                <div className='relative px-2 mt-[12px] flex transition-all ease-in-out
                                                    cursor-pointer hover:scale-[1.4]'>
                                                    {/*[ ] SI EXISTE UN ARCHIVO  */ }
                                                    {file && (
                                                        <div className='w-[150px] h-[80px]'>
                                                            <Image 
                                                                src={URL.createObjectURL(file)} 
                                                                alt='Picture Selected' 
                                                                width={150} 
                                                                height={150}
                                                                className='object-cover rounded-md w-full h-full'
                                                            />
                                                        </div>
                                                    )}
                                                    {/*[ ] CASO CONTRARIO SE MUESTRA LA URL PUBLICA  */ }
                                                    {imageUrl && (
                                                        <div className='w-[150px] h-[80px]'>
                                                            <Image 
                                                                src={imageUrl} 
                                                                alt='Picture Selected' 
                                                                width={150} 
                                                                height={150}
                                                                className='object-cover rounded-md w-full h-full'
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <FontAwesomeIcon
                                            onClick={closeModal}
                                            className='absolute top-[-50px] right-[-28px] text-[30px] 
                                            text-dashboard-color-danger cursor-pointer'
                                            icon={faXmarkCircle}>
                                            
                                        </FontAwesomeIcon>
                                        <button type="submit"
                                            className='absolute bottom-[-430px] left-[180px] w-[160px] py-[12px] text-[16px] rounded-[3px] uppercase tracking-[1.5px] text-center font-bold bg-dashboard-color-white shadow-dashboard-modal-button-shadow
                                            hover:bg-box_1-text_primary hover:text-box_1-primary transition-colors ease-linear duration-150
                                            '>
                                            <span className='z-[100]
                                            before:absolute before:top-0 before:left-1/2 before:right-1/2 before:bottom-0 before:opacity-0 before:bg-dashboard-color-primary before:transition-all before:rounded-[3px] before:duration-[0.4s] before:ease-in-out'>
                                                Enviar
                                            </span>
                                        </button>
                                    </form>
                                </FormProvider>
                            </Modal>

                            <h1 className='font-800 text-[1.7rem]'> Lista de Productos</h1>
                            <FontAwesomeIcon
                                onClick={toggleSidebar}
                                icon={faFilter}
                                className='absolute top-[25px] left-[320px] text-[19px] p-2 text-white cursor-pointer bg-box_1-text_primary rounded-md'>
                            </FontAwesomeIcon>
                            <div ref={contentRef} className='relative w-[80%] h-[100vh] mt-[50px] flex flex-col'>
                                    {/** Header */}
                                    <div className='flex items-center p-6 mt-[20px]'>
                                        <label className='flex-1 inline-flex items-center space-x-3'>
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                        />
                                        <span className="w-6 h-6 border-2 border-gray-300 rounded-md flex items-center justify-center transition-all duration-200 ease-in-out transform"></span>
                                        </label>
                                        <p className='flex-1 text-[14px] text-center uppercase text-gray-400'>nombre</p>
                                        <p className='flex-1 text-[14px] text-center uppercase text-gray-400'>imágen</p>
                                        <p className='flex-1 text-[14px] text-center uppercase text-gray-400'>precio</p>
                                        <p className='flex-1 text-[14px] text-center uppercase text-gray-400'>tipo</p>
                                        <p className='flex-1 text-[14px] text-center uppercase text-gray-400'>temporada</p>
                                        <p className='flex-1 text-[14px] text-center uppercase text-gray-400'>marca</p>
                                        <p className='flex-1 text-[14px] text-center uppercase text-gray-400'>descuento</p>
                                        <p className='flex-1 text-[14px] text-center uppercase text-gray-400'>operación</p>
                                    </div>
                                    
                                    {firstLoadProduct ? (
                                        <LoadingPlaceHolder />
                                    ): !Array.isArray(currentProducts) || currentProducts.length === 0 ? (
                                        <div className='flex items-center mx-auto w-[200px] p-4 mt-[30px] bg-gray-400 rounded-lg'>
                                            <p className='text-lg text-black'>No hay existencias</p>
                                        </div>
                                    ) :
                                        currentProducts.map((product, index) => (
                                            <div key={product.id} className='flex items-center p-6 mt-[20px] rounded-xl bg-white'>
                                                <label className='flex-1 space-x-3 inline-flex items-center cursor-pointer'>
                                                    <input
                                                        type="checkbox"
                                                        checked={checkedStates[product.id]}
                                                        onChange={() => handleCheckboxChange(product.id)}
                                                        className="hidden"
                                                    />
                                                    <span className="w-6 h-6 border-2 border-gray-300 rounded-md flex items-center justify-center transition-all duration-200 ease-in-out transform">
                                                        {checkedStates[product.id] && (
                                                        <svg
                                                            className="w-4 h-4 text-blue-500"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M5 13l4 4L19 7"
                                                            ></path>
                                                        </svg>
                                                        )}
                                                    </span>
                                                </label>
                                                <p className='flex-1 text-[14px] text-center uppercase text-black truncate'>{product.name}</p>
                                                <div className='flex-1 flex justify-center items-center'>
                                                <div className='w-[40px] h-[40px] relative'>
                                                    <Image src={product.imageUrl} alt='imagen de mochila' objectFit='contain' layout='fill'/>
                                                </div>
                                                </div>
                                                <p className='flex-1 text-[14px] text-center uppercase text-black'>$ {product.price}</p>
                                                <p className='flex-1 text-[14px] text-center uppercase text-black'>{product.type}</p>
                                                <p className='flex-1 text-[14px] text-center uppercase text-black'>{seasonTranslations[product.season]}</p>                                                
                                                <p className='flex-1 text-[14px] text-center uppercase text-black'>{product.brand}</p>
                                                <p className='flex-1 text-[14px] text-center uppercase text-black'>{product.discount}%</p>
                                                <div className='flex justify-between items-center'>
                                                    <div onClick={() => openModal(1, product.id)} className='ml-2 p-2 rounded-tl-lg rounded-bl-lg bg-box_1-text_primary text-white text-center cursor-pointer flex justify-center items-center'>
                                                        <FontAwesomeIcon 
                                                            className='text-[16px]' 
                                                            icon={faPenToSquare} />
                                                        <p className='inline-block ml-2 text-[16px] font-bold'>Editar</p>
                                                    </div>
                                                    <div onClick={() => handleRemoveProduct(product.id, index)} className='p-3 rounded-tr-lg rounded-br-lg bg-dashboard-color-danger text-white text-center cursor-pointer flex justify-center items-center'>
                                                        <FontAwesomeIcon 
                                                            icon={faTrash}
                                                            className='text-[16px]'/>
                                                    </div>
                                                </div>
                                            </div> 
                                        )
                                    )}

                                    {/*[ ] PAGINACIÓN */}
                                    <div style={{
                                                position: isPaginationFixed ? 'fixed' : 'relative',
                                                bottom: isPaginationFixed ? '30px' : 'auto',
                                                left: isPaginationFixed ? '80px' : '',
                                                
                                                width: '100%'
                                            }}>
                                        <Pagination 
                                            totalProducts={products.length}
                                            currentProducts={currentProducts.length}
                                            productsPerPage={productsPerPage}
                                            currentPage={currentPage}
                                            paginate={setCurrentPage}
                                        />
                                    </div>
                            </div>
                        </div>
                    </div>
                    {/*[ ] DELETE BTN   */ }
                    <div className='fixed w-[45px] h-[45px] p-3 bottom-[35px] right-[35px] rounded-full 
                        bg-dashboard-color-danger text-white cursor-pointer'>
                        <FontAwesomeIcon
                            onClick={handleDeleteSelected}
                            icon={faTrash}
                            className='text-[22px]'/>
                    </div>
                    <ToastContainer 
                        autoClose={2000}
                        position="bottom-center" 
                    />
                    { productLoading ? 
                        <Spinner
                            width='50px'
                            height='50px'
                            bottom='100px'
                        /> : null
                    }
                </div>
        </main>
    )
}