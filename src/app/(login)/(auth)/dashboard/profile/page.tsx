"use client";
import Image from 'next/image'
import logo from '@/../public/img/logo/Logo.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faPencil, faXmarkCircle, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import {useState, useEffect} from 'react'
import Modal from 'react-modal'

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ModalFormValues } from '@/types/form.types';
import { modalSchema } from '@/schemas/form.schema';
import { InputWithLabel } from "@/components/input"
import { modalConfig } from '@/helpers/inputConfig.helpers';

//HOOKS
import { useShowroomHook } from '@/hooks/showroom.hook'
import { useUserHook } from '@/hooks/user.hook';

//[ ] LOGOUT
import { useAuthHook } from '@/hooks/auth.hook'

//[ ] MENU SIDEBAR
import { MenuSidebar } from '@/components/menuSidebar';

//[ ] CONTEXT
import { useAuth } from '@/context/auth.context';

//[ ] NOTIFY
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

//[ ] SPINNER
import { Spinner } from '@/components/spinner';

export default function DashboardProfile() {

    //[ ] CONTEXT
    const { payload } = useAuth();

    //[ ] LOGOUT
    const { logout } = useAuthHook()

    //[ ] HOOKS
    const {showroomLoading, showroomError, setShowroom, idShowroom, updateShowRoom, showroom} = useShowroomHook()
    const {userLoading, userError, user,  userId, setUser, updateUser} = useUserHook()

    //[ ] MÉTODO DEL USEFORM
    const methods = useForm<ModalFormValues>({ resolver: yupResolver(modalSchema) })

    const [modalIsOpen, setIsOpen] = useState(false);
    
    //[ ] SECCIONES DEL FORMULARIO 
    const [sectionID, setSectionID] = useState(0) 

    //[ ] PROPIEDADES DINÁMICAS DE 'BRAND' CARD
    const [descriptionCardHeigh, setDescriptionCardHeight] = useState(80)
    const [historyCardHeigh, setHistoryCardHeight] = useState(80) 
    const [moreInfo, setMoreInfo] = useState(false)

    const chaneMoreInfo = () => {
        setMoreInfo(!moreInfo)
    }

    const [modalTitle, setModalTitle] = useState<string>("") //[ ] TÍTULO DEL MODAL
    const [modalSize, setModalSize] = useState({width: '550px', height: '400px'}) //[ ] ALTURA DEL MODAL

    //[ ] MODAL STYLES
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
            width: modalSize.width || '550px',
            height: modalSize.height || '400px'
        },
    };

    const [modalData, setModalData] = useState({
        name: '',
        description: '',
        country: '',
        showroomName: '',
        postalCode: '',
        historyAbout: '',
        titleAbout: '',
        imageUrl: '',
        socialMedia: {
            facebook: '',
            instagram: '',
            twitter: ''
        },
        phoneNumber: '',
        supportMail: '',
        city: ''
    });

    const [userModalData, setUserModalData] = useState({
        name: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        logoUrl: ''
    })

    function openModal(sectionID: number) {
        setIsOpen(true);
        let modalSize = ({width: '', height: ''})

        switch(sectionID) {
            case 1:
                modalSize.height = '400px'
                setModalTitle("Información Personal")
            break;
        case 2:
            modalSize.height = '300px'
            setModalTitle("Dirección")
            break;
        case 3:
            modalSize.height = '300px'
            setModalTitle("Información Adicional")
            break;
        default:
            break;
        }

        if(showroom !== undefined && sectionID !== 1) {
            modalData.description = showroom.description
            modalData.showroomName = showroom.name //[ ] ESTA PROPIEDAD SERÁ REEMPLAZADA POR NAME
            modalData.country = showroom.country
            modalData.postalCode = showroom.postalCode
            modalData.historyAbout = showroom.historyAbout
            modalData.titleAbout = showroom.titleAbout
            modalData.imageUrl = showroom.imageUrl
            modalData.socialMedia = showroom.socialMedia
            modalData.phoneNumber = showroom.phoneNumber
            modalData.supportMail = showroom.supportMail
            modalData.city = showroom.city

            setModalData(modalData)
        } else if (user !== undefined && sectionID === 1) {
            userModalData.name = user.name
            userModalData.email = user.email
            userModalData.lastName = user.lastName
            userModalData.username = user.username
            userModalData.password = ''
            userModalData.logoUrl = user.logoUrl

            setUserModalData(userModalData)
        }

        setSectionID(sectionID)
        setModalSize(modalSize)
    }

    function closeModal() {
        setIsOpen(false);
        //[ ] RESET VALIDACIONES PENDIENTES
        methods.reset()
    }

    //[ ] ENVÍO DEL FORMULARIO
    const submitForm = async () => {

        const fieldsToValidate: ('name' | 'lastName' | 'email' | 'password' | 'repeatPassword')[] = ['name', 'lastName', 'email'];

        if(userModalData.password){
            fieldsToValidate.push('password', 'repeatPassword')
        }

        const personalInfIsValid = await methods.trigger(fieldsToValidate)
        const addressIsValid = await methods.trigger(['country', 'city', 'postalCode', 'phoneNumber'])
        const brandIsValid = await methods.trigger(['showroomName', 'titleAbout', 'description', 'historyAbout'])

        if(sectionID === 2 && addressIsValid){
            //[ ] CLOSE MODAL
            closeModal()
            
            try {
                //[ ]ACTUALIZAMOS EL VALOR DEL NOMBRE DEL SHOWROOM
                modalData.name = modalData.showroomName
                const resServ = await updateShowRoom(modalData, idShowroom)

                if(resServ.error === false){
                    toast.info(resServ.message)
                } else {
                    toast.error(resServ.message)
                }
            } catch (error) {
                console.error('Error updating showroom:', error);
            }
        } else if(sectionID === 1 && personalInfIsValid){
            //[ ] CLOSE MODAL
            closeModal()

            try {
                const resServ = await updateUser(userModalData, userId)
                if(resServ.error === false){
                    toast.info(resServ.message)
                } else {
                    toast.error(resServ.message)
                }
            } catch (error) {
                console.error('Error updating user:', error);
            }
        } else if(sectionID === 3 && brandIsValid){
             //[ ] CLOSE MODAL
            closeModal()
            try {
                //[ ]ACTUALIZAMOS EL VALOR DEL NOMBRE DEL SHOWROOM
                modalData.name = modalData.showroomName
                const resServ = await updateShowRoom(modalData, idShowroom)

                if(resServ.error === false){
                    toast.info(resServ.message)
                } else {
                    toast.error(resServ.message)
                }
            } catch (error) {
                console.error('Error updating showroom:', error);
            }
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {id, value} = e.target
        setModalData(prevData => ({
            ...prevData,
            [id]: value
        }))

        setUserModalData({
            ...userModalData,
            [e.target.name]: e.target.value,
        });
    }

    useEffect(() => {
        //[ ] SE CALCULA EL ALTO DEL FORM
        if(showroom){
            // Calcular las alturas basadas en las propiedades si existen
            let descriptionHeight = 80 + (showroom.description ? showroom.description.length : 0)
            let historyHeight = 80 + (showroom.historyAbout ? showroom.historyAbout.length : 0)

            setDescriptionCardHeight(descriptionHeight)
            setHistoryCardHeight(historyHeight)
        }
        Modal.setAppElement('#rootmodal')
    }, [showroom, showroom?.description, showroom?.historyAbout])

    return(
        
        <main className='text-[14px] w-[100vw] h-[100vh] bg-box_1-secondary select-none overflow-x-hidden
            text-dashboard-color-dark'>
                <div className='flex flex-row w-[96%] gap-[1.8rem]'>
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
                                <h2 className='text-box_1-bgSecondary text-[1.4rem] ml-16'>M&<span className='danger text-box_1-text_primary'>M</span></h2>
                            </div>
                            <div className='close-btn hidden'>
                                <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                            </div>
                        </div>
                        
                        {/* [ ] NAVBAR SIDEBAR */ }
                        <MenuSidebar logout={logout} openModal={openModal} linkActive={0} />
                    </aside>

                    <div className='mt-[1.8rem] ml-[220px] bg-box_1-secondary'>
                        <div className='flex flex-col flex-wrap w-[100vw] h-dashboard-main-height ml-[20px] py-4 px-6 bg-white rounded-2xl transition-all duration-300 ease-in-out'>
                            <h1 className='font-800 text-[1.7rem]'> Mi Perfil</h1>
                            
                            {/* [ ] MODAL */}
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
                                contentLabel="Profile Modal"
                            >
                                
                                <h2 className='text-box_1-text_primary font-bold text-[18px] ml-[35px]'>{modalTitle}</h2>
                                <FormProvider {...methods}>
                                    <form className='relative' onSubmit={(e) => {
                                        e.preventDefault()
                                        submitForm()
                                    }}
                                    >
                                        <div className='flex flex-wrap h-[250px] items-center ml-[35px]'>
                                            {sectionID === 1 ? (
                                            <>
                                                <div className='flex flex-wrap'>
                                                    <div className='px-2 mt-[10px]'>
                                                        <InputWithLabel event={handleInputChange} {...modalConfig.name} type='text' value={userModalData.name} />
                                                    </div>
                                                    <div className='px-2 mt-[10px]'>
                                                        <InputWithLabel event={handleInputChange} {...modalConfig.lastName} type='text' value={userModalData.lastName} />
                                                    </div>
                                                    <div className='px-2 mt-[10px]'>
                                                        <InputWithLabel event={handleInputChange} {...modalConfig.username} type='text' value={userModalData.username}  />
                                                    </div>
                                                    <div className='px-2 mt-[10px]'>
                                                        <InputWithLabel event={handleInputChange} {...modalConfig.email} type='email' value={userModalData.email} />
                                                    </div> 
                                                    <div className='px-2 mt-[10px]'>
                                                        <InputWithLabel event={handleInputChange} {...modalConfig.password} type='password' value={userModalData.password} />
                                                    </div>
                                                    <div className='px-2 mt-[10px]'>
                                                        <InputWithLabel event={handleInputChange} {...modalConfig.repeatPassword} type='password' />
                                                    </div>
                                                </div>
                                                
                                            </>
                                            ) : sectionID === 2 ? (
                                            <>
                                                <div className='flex flex-wrap'>
                                                    <div className='px-2'>
                                                        <InputWithLabel event={handleInputChange} {...modalConfig.country} type='text' value={modalData.country} />
                                                    </div>
                                                    <div className='px-2'>
                                                        <InputWithLabel event={handleInputChange} {...modalConfig.city} type='text' value={modalData.city} />
                                                    </div>
                                                    <div className='px-2'>
                                                        <InputWithLabel event={handleInputChange} {...modalConfig.postalCode} type='text' value={modalData.postalCode}  />
                                                    </div>
                                                    <div className='px-2 mb-[30px]'>
                                                        <InputWithLabel event={handleInputChange} {...modalConfig.phoneNumber} type='text' value={modalData.phoneNumber} />
                                                    </div> 
                                                </div>
                                            </>
                                            ) : (
                                            <>
                                                <div className='flex flex-wrap'>
                                                    <div className='px-2'>
                                                        <InputWithLabel event={handleInputChange} {...modalConfig.showroomName} type='text' value={modalData.showroomName} />
                                                    </div>
                                                    <div className='px-2'>
                                                        <InputWithLabel event={handleInputChange} {...modalConfig.titleAbout} type='text' value={modalData.titleAbout} />
                                                    </div>
                                                    <div className='px-2'>
                                                        <InputWithLabel event={handleInputChange} {...modalConfig.description} type='text' value={modalData.description}  />
                                                    </div>
                                                    <div className='px-2 mb-[30px]'>
                                                        <InputWithLabel event={handleInputChange} {...modalConfig.historyAbout} type='text' value={modalData.historyAbout} />
                                                    </div> 
                                                </div>
                                                </>
                                            )}
                                        </div>
                                        
                                        <FontAwesomeIcon
                                            onClick={closeModal}
                                            className='absolute top-[-50px] right-[-28px] text-[30px] 
                                            text-dashboard-color-danger cursor-pointer'
                                            icon={faXmarkCircle}>
                                            
                                        </FontAwesomeIcon>
                                        <button 
                                            type="submit"
                                            className={`absolute ${sectionID !== 1 ? 'bottom-[-20px]' : 'bottom-[-120px]'} left-[180px] w-[160px] py-[12px] text-[16px] rounded-[3px] uppercase tracking-[1.5px] text-center font-bold bg-dashboard-color-white shadow-dashboard-modal-button-shadow
                                            hover:bg-box_1-text_primary hover:text-box_1-primary transition-colors ease-linear duration-150
                                            `}>
                                            <span className='z-[100]
                                            before:absolute before:top-0 before:left-1/2 before:right-1/2 before:bottom-0 before:opacity-0 before:bg-dashboard-color-primary before:transition-all before:rounded-[3px] before:duration-[0.4s] before:ease-in-out'>
                                                Enviar
                                            </span>
                                        </button>
                                    </form>
                                </FormProvider>
                                
                            </Modal>

                            {/* Inicio */}
                            <div style={{boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;'}} className='flex justify-between ml-[5px] mt-[50px] w-[350px] h-[120px] border-[1px] border-solid border-box_1-secondary rounded-xl'>
                                <div className='flex items-center ml-[15px]'>
                                    { user &&
                                        <Image
                                            alt='Profile logo'
                                            src={user.logoUrl}
                                            width={100} 
                                            height={100}
                                            className='block w-[100px] h-[100px] rounded-[12px]'>
                                        </Image>
                                    }
                                    <div className='flex flex-col ml-[16px]'>
                                        <h3 className='font-[800] text-[17px]'>{user?.name } {user?.lastName}</h3>
                                        <p className='text-dashboard-color-info-dark'>Administrador</p>
                                    </div>
                                </div>
                            </div>
                            
                            { /* Información Personal */}
                            <div style={{boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;'}} className='ml-[5px] mt-[50px] w-[700px] h-max border-[1px] border-solid border-box_1-secondary rounded-xl'>
                                <div className='flex justify-between mt-[20px] ml-[15px]'>
                                    <h3 className='font-[800] text-[17px]'>Información Personal</h3>
                                    <div style={{boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;'}} 
                                        onClick={() => openModal(1)} 
                                        className='flex flex-row px-3 py-2 my-auto mr-[20px] bg-box_1-text_primary text-box_1-primary rounded-3xl cursor-pointer'>
                                        <p className='px-2'>Editar</p>
                                        <FontAwesomeIcon icon={faPencil}
                                            className='text-[16px]'>
                                        </FontAwesomeIcon>
                                    </div>
                                </div>
                                <div className='flex flex-col flex-wrap h-[170px]'>
                                    <div className='p-3 flex-grow'>
                                        <h4 className='text-[16px] text-dashboard-color-info-dark'>Nombre</h4>
                                        <p className='font-[500] text-[16px]'>{user?.name}</p>
                                    </div>
                                    <div className='p-3 flex-grow'>
                                        <h4 className='text-[16px] text-dashboard-color-info-dark'>Correo</h4>
                                        <p className='font-[500] text-[16px]'>{user?.email}</p>
                                    </div>
                                    <div className='p-3 flex-grow'>
                                        <h4 className='text-[16px] text-dashboard-color-info-dark'>Apellido</h4>
                                        <p className='font-[500] text-[16px]'>{user?.lastName}</p>
                                    </div>
                                    <div className='p-3 flex-grow'>
                                        <h4 className='text-[16px] text-dashboard-color-info-dark'>Nombre de usuario</h4>
                                        <p className='font-[500] text-[16px]'>{user?.username}</p>
                                    </div>
                                    <div className='p-3 flex-grow'>
                                        <h4 className='text-[16px] text-dashboard-color-info-dark'>Contraseña</h4>
                                        <p className='font-[500] text-[16px]'>**********</p>
                                    </div>
                                </div>
                            </div>

                            { /* Dirección */}
                            <div style={{boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;'}} className='ml-[5px] mt-[50px] w-[700px] h-max border-[1px] border-solid border-box_1-secondary rounded-xl'>
                                <div className='flex justify-between mt-[20px] ml-[15px]'>
                                    <h3 className='font-[800] text-[17px]'>Dirección</h3>
                                    <div style={{boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;'}} 
                                        onClick={() => openModal(2)} 
                                        className='flex flex-row px-3 py-2 my-auto mr-[20px] bg-box_1-text_primary text-box_1-primary rounded-3xl cursor-pointer'>
                                        <p className='px-2'>Editar</p>
                                        <FontAwesomeIcon icon={faPencil} 
                                            className='text-[16px]'>
                                        </FontAwesomeIcon>
                                    </div>
                                </div>
                                <div className='flex flex-col flex-wrap h-[150px]'>
                                    <div className='p-3'>
                                        <h4 className='text-[16px] text-dashboard-color-info-dark'>Country</h4>
                                        <p className='font-[500] text-[16px]'>{showroom?.country}</p>
                                    </div>
                                    <div className='p-3'>
                                        <h4 className='text-[16px] text-dashboard-color-info-dark'>Post Code</h4>
                                        <p className='font-[500] text-[16px]'>{showroom?.postalCode}</p>
                                    </div>
                                    <div className='p-3'>
                                        <h4 className='text-[16px] text-dashboard-color-info-dark'>City/State</h4>
                                        <p className='font-[500] text-[16px]'>{showroom?.country}</p>
                                    </div>
                                    <div className='p-3'>
                                        <h4 className='text-[16px] text-dashboard-color-info-dark'>Phone</h4>
                                        <p className='font-[500] text-[16px]'>{showroom?.phoneNumber}</p>
                                    </div>
                                </div>
                            </div>

                            { /* Marca */}
                            <div style={{boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;'}} className='mr-[80px] mt-[250px] w-[700px] h-max transition-all duration-300 ease-in border-[1px] border-solid border-gray-300 rounded-xl'>
                                <div className='flex justify-between mt-[20px] ml-[15px]'>
                                    <h3 className='font-[800] text-[17px]'>Marca</h3>
                                    <div style={{boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;'}} 
                                        onClick={() => openModal(3)} 
                                        className='flex flex-row px-3 py-2 my-auto mr-[20px] bg-box_1-text_primary text-box_1-primary rounded-3xl cursor-pointer'>
                                        <p className='px-2'>Editar</p>
                                        <FontAwesomeIcon icon={faPencil} 
                                            className='text-[16px]'>
                                        </FontAwesomeIcon>
                                    </div>
                                </div>
                                <div style={{height: moreInfo ? `${descriptionCardHeigh + historyCardHeigh}px` : '240px'}} className='transition-all duration-300 ease-linear relative h-[240px] mt-[20px]'>
                                    <div style={{height: moreInfo ? `${descriptionCardHeigh}px` : '80px'}} className={`transition-all duration-300 ease-linear relative flex flex-col flex-wrap`}>
                                        <div className='p-3'>
                                            <h4 className='text-[16px] text-dashboard-color-info-dark'>Nombre de la Marca</h4>
                                            <p className='font-[500] text-[16px]'>{showroom?.name}</p>
                                        </div>
                                        <div className='p-3 ml-[-30px] w-[250px] overflow-hidden'>
                                            <h4 className='text-[16px] text-dashboard-color-info-dark'>Descripción del ShowRoom</h4>
                                            <p className='font-[500] text-[16px]'>{showroom?.description}</p>
                                        </div>

                                        {/* BOTON PARA OCULTAR O DESOCULTAR LOS TEXTOS LARGOS */}
                                        <FontAwesomeIcon onClick={() => chaneMoreInfo()} icon={ !moreInfo ? faEyeSlash : faEye} 
                                                className='absolute top-[18px] right-[50px] text-[18px] cursor-pointer'>
                                        </FontAwesomeIcon>
                                    </div>
                                    <h3 className='ml-[15px] font-[800] text-[17px]'>Sobre nosotros</h3>
                                    <div style={{height: moreInfo ? `${historyCardHeigh}px` : '80px'}} className='flex flex-col mt-[20px] flex-wrap'>
                                        <div className='p-3'>
                                            <h4 className='text-[16px] text-dashboard-color-info-dark'>Título de Presentación</h4>
                                            <p className='font-[500] text-[16px]'>{showroom?.titleAbout}</p>
                                        </div>
                                        <div className='p-3 ml-[-65px] w-[250px] overflow-hidden'>
                                            <h4 className='text-[16px] text-dashboard-color-info-dark'>Historia del ShowRoom</h4>
                                            <p className='font-[500] text-[16px]'>{showroom?.historyAbout}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ToastContainer 
                        autoClose={2000}
                        position="bottom-center" 
                    />

                    { userLoading &&
                        <Spinner
                            width='50px'
                            height='50px'
                            bottom='50px'
                        />
                    }

                    { showroomLoading &&
                        <Spinner
                            width='50px'
                            height='50px'
                            bottom='50px'
                        />
                    }
                </div>
        </main>
    )
}