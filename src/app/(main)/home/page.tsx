"use client";
import { useState, useRef, Ref, useEffect } from "react";
import Image from 'next/image';
import winterStick from '../../../../public/img/sticker.png';
import adidas from '../../../../public/img/adidas03.png'
import { ShowCard } from "@/components/showCard";
import { Navbar } from "@/components/navbar";

import { poppins,dosis,roboto } from "@/styles/fonts/font"
import { faEnvelope, faLocationDot, faPhone, } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons"

/* HOOKS */
import useIntersectionObserver from "@/hooks/hook.interactionObserver"
import { useDiscountHook } from "@/hooks/discount.hook"
import { useAboutHook } from "@/hooks/about.hook"
import { useMessageHook } from "@/hooks/message.hook"
import { useContactHook } from "@/hooks/contact.hook"
import { useHomeHook } from "@/hooks/home.hook"

export default function Home() {

    const { homeData } = useHomeHook()
    const { products } = useDiscountHook()
    const { about } = useAboutHook()
    const { contactInfo } = useContactHook()

    //CONTACT
    const [name, setName] = useState('')
    const [to, setTo] = useState('')
    const [subject, setSubject] = useState('')
    const [text, setText] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const { response, sendMail, loading, error } = useMessageHook()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
        await sendMail(to, name, subject, text) //[ ] ENVÍO DEL CORREO
        
        //[ ] LIMPIAR LOS CAMPOS
        if(!error){
            setName('')
            setTo('')
            setSubject('')
            setText('')
        }

        console.log(error)
    };

    const [inputsFocused, setActiveInputsFocus] = useState([false, false, false, false]); // Inputs Focus + Label

    const homeRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);
    const featuredProductsRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);

    const setInputsFocused = (index: number) => {
        setActiveInputsFocus(prevState => {
            const updatedState = [...prevState];
            updatedState[index] = !prevState[index];
            return updatedState;
        })
    }

    /* ----OBSERVER------ */
    const isVisible = useIntersectionObserver(contactRef, {
        threshold: 0.9, // Límite de contacto
    });
    
    const navChildren = [{linkName: 'Inicio', href: 'home', out: homeRef}, {linkName: 'Productos', href: 'products'}, 
        {linkName: 'Destacados', href: 'features', out: featuredProductsRef},
        {linkName: 'Sobre', href: 'about', out: aboutRef},{linkName: 'Contacto', href: 'contact', out: contactRef}]

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, []);

    return (
        <main className={`bg-silver-antiFlash`} style={{margin: 0, padding: 0, boxSizing: 'border-box'}}>
            
            <div className={`${poppins.className}`}>
                {/*-------------Home----------------------*/}
                <section id="home" ref={homeRef} className="relative w-[100%] min-h-[100vh] p-[100px] flex justify-between items-center">
                    <div className={`absolute top-0 left-0 w-[100%] h-[100%] bg-box_1-text_primary clip-circle z-[0]`}></div>
                    <div className="relative -mt-[250px] w-[100%] flex justify-between items-center">
                        <div className="relative max-w-[600px]">
                            <h2 className="slideFromLeft text-[4em] color-[#333] leading-[1.4em] font-medium">Showroom
                                <span className="text-box_1-text_primary text-[1.2em] font-black"> {homeData?.name}</span>
                            </h2>
                            <p className="slideFromLeft mt-3 text-[#333]"> {homeData?.description}
                            </p>
                            <a href="#" className="inline-block mt-5 py-[8px] px-[20px] bg-box_1-text_primary
                                text-box_1-primary rounded-[40px] font-medium tracking-wider">Saber más</a>
                        </div>
                    </div>
                    <div className="w-[800px]  flex justify-end pr-[50px] mt-[20px] z-[1]">
                        <Image className="slideFromRight max-w-[400px]" src={winterStick} alt="logo"></Image>
                    </div>
                </section>
                {/*--------Productos Destacados ------*/}
                <section id="features" ref={featuredProductsRef} className="w-[100%] min-h-[100vh] flex flex-col">
                    <h3 className="mx-auto mt-[100px] text-[3em] font-black text-box_1-text_primary leading-[1.4em]">Productos Destacados</h3>
                    <div className="my-auto p-2 relative flex justify-center flex-wrap overflow-hidden">
                        {
                            products.length > 0 ?
                                products.map((product) => (
                                    <ShowCard description={product.description} discount={product.discount} name={product.name} price={product.price} key={product.id}/>
                                )) 
                                :
                            <h3>No hay existencias</h3>
                            
                            }
                    </div>
                </section>
                {/* --------------About Us---------------*/}
                <section id="about" ref={aboutRef} className={`${dosis.className} lg:w-[100%] lg:h-auto lg:px-[60px] lg:py-[0] w-[100%] min-h-[100vh] mt-[300px] flex items-center justify-center`}>
                    <div className="w-[1290px] max-w-[95%] mx-0 my-auto flex flex-wrap items-center justify-around">
                        <Image src={adidas} className="mobile:mb-10 scale-in-center w-[580px] max-w-[100%] h-auto px-0 py-[10px]" alt="family"/>
                        <div className="mobile:text-center mobile:-mt-[100px]  w-[600px] max-w-[100%] px-0 py-[10px]">
                            <h4 className={`${roboto.className} slideFromLeft text-[18px] text-[#777777] tracking-widest mb-[10px]`}>Un poco de contexto</h4>
                            <h1 className="mobile:text-[45px] slideFromRight text-[65px] text-[#111111] font-bold mb-[20px]">De Familia a Moda <span className="text-box_1-text_primary">{homeData?.name}</span></h1>
                            <p className={`${roboto.className} text-focus-in text-[16px] color-[#777777] leading-[30px] mb-[30px]`}>
                                {about?.historyAbout}
                            </p>
                            <div className="btN">
                                <button type="button" className="bg-white px-[20px] py-[20px] text-[16px] font-bold color-[#111111] border-none outline-none
                                    shadow-sm mr-5 hover:bg-box_1-text_primary hover:text-white hover:transition-all duration-500 hover:cursor-pointer">Ourn Team</button>
                                <button type="button" className="bg-white px-[20px] py-[20px] text-[16px] font-bold color-[#111111] border-none outline-none
                                    shadow-sm mr-5 hover:bg-box_1-text_primary hover:text-white hover:transition-all duration-500 hover:cursor-pointer">Learn More</button>
                            </div>
                        </div>
                    </div>
                </section>
                {/* -------------Contact --------------- */}
                <section id="contact" ref={contactRef} className="mt-[300px] w-[100%] min-h-[100vh] flex items-center justify-center px-[30px] py-[8%] bg-out-prestigeBlue">
                    <div className="tbt:flex-wrap flex justify-between w-[100%] max-w-[1100px]">
                        <section className="tbt:basis-[100%] tbt:m-0 flex flex-col basis-[35%] min-w-[320px] mr-[60px]">
                            <div className="contactTitle">
                                <h2 className="relative text-[28px] text-box_1-text_primary inline-block mb-[25px]
                                    before:content-[''] before:absolute before:w-[50%] before:h-[1px] before:bg-out-peace before:top-[120%] before:left-0
                                    after:content-[''] after:absolute after:w-[25%] after:h-[3px] after:bg-box_1-text_primary after:top-[calc(120%-1px)] after:left-0">Contáctanos</h2>
                                <p className="text-[17px] text-[#ccc] tracking-[1px] leading-[1.2] pb-[22px]">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Ea minus, beatae mollitia</p>
                            </div>

                            <div className="contactInfo mb-4">
                                <div className="iconGroup flex items-center my-4">
                                    <div className="icon relative w-[45px] h-[45px] mr-[20px] border-[2px] border-solid border-box_1-text_primary rounded-[50%]">
                                        <FontAwesomeIcon icon={faPhone} className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-[20px] text-[#ddd]" />
                                    </div>
                                    <div className="details">
                                        <span className="block text-out-peace text-[18px] uppercase">Teléfono</span>
                                        <span className="text-[#fff]">+{contactInfo?.phoneNumber}</span>
                                    </div>
                                </div>

                                <div className="iconGroup flex items-center my-4">
                                    <div className="icon relative w-[45px] h-[45px] mr-[20px] border-[2px] border-solid border-box_1-text_primary rounded-[50%]">
                                        <FontAwesomeIcon icon={faEnvelope} className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-[20px] text-[#ddd]" />
                                    </div>
                                    <div className="details">
                                        <span className="block text-out-peace text-[18px] uppercase">Mail</span>
                                        <span className="text-box_1-primary">{contactInfo?.supportMail}</span>
                                    </div>
                                </div>

                                <div className="iconGroup flex items-center my-4">
                                    <div className="icon relative w-[45px] h-[45px] mr-[20px] border-[2px] border-solid border-box_1-text_primary rounded-[50%]">
                                        <FontAwesomeIcon icon={faLocationDot} className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] 
                                        text-[20px] text-box_1-primary" />
                                    </div>
                                    <div className="details">
                                        <span className="block text-out-peace text-[18px] uppercase">Ubicación</span>
                                        <span className="text-box_1-primary">{contactInfo?.country}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="socialMedia flex justify-start items-center flex-wrap mt-[22px] mx-0 mb-5">
                                <a href={`${contactInfo?.socialMedia.facebook}`} className="w-[35px] h-[35px] mr-[12px] rounded-[5px] bg-box_1-text_primary duration-100 flex items-center justify-center
                                    hover:translate-y-[-5px] hover:bg-out-prestigeBlue hover:text-box_1-text_primary hover:border-[1px] hover:border-[solid] hover:border-box_1-text_primary">
                                    <FontAwesomeIcon icon={faFacebook} className="text-[#fff] text-[18px] border-[1px] border-solid border-[transparent] delay-100"/>
                                </a>
                                <a href={`${contactInfo?.socialMedia.instagram}`} className="w-[35px] h-[35px] mr-[12px] rounded-[5px] bg-box_1-text_primary duration-100 flex items-center justify-center
                                    hover:translate-y-[-5px] hover:bg-out-prestigeBlue hover:text-box_1-text_primary hover:border-[1px] hover:border-[solid] hover:border-box_1-text_primary">
                                    <FontAwesomeIcon icon={faInstagram} className="text-[#fff] text-[18px] border-[1px] border-solid border-[transparent] delay-100"/>
                                </a>
                                <a href={`${contactInfo?.socialMedia.twitter}`} className="w-[35px] h-[35px] mr-[12px] rounded-[5px] bg-box_1-text_primary duration-100 flex items-center justify-center
                                    hover:translate-y-[-5px] hover:bg-out-prestigeBlue hover:text-box_1-text_primary hover:border-[1px] hover:border-[solid] hover:border-box_1-text_primary">
                                    <FontAwesomeIcon icon={faTwitter} className="text-[#fff] text-[18px] border-[1px] border-solid border-[transparent] delay-100"/>
                                </a>
                            </div>
                        </section>

                        <section className="tbt:basis-[100%] tbt:m-0 flex flex-col basis-[60%]">
                            <form onSubmit={handleSubmit} className="messageForm flex justify-between flex-wrap pt-[30px]">
                                <div className="inputGroup halfWidth lpt:basis-[100%] relative my-0 basis-[48%]">
                                    <input  onChange={(e) => setName(e.target.value)} 
                                            onFocus={() => setInputsFocused(0)} 
                                            onBlur={() => setInputsFocused(0)}
                                            value={name}
                                            type="text" required 
                                            className={`w-[100%] text-[18px] px-[2px] py-0 bg-out-prestigeBlue
                                            text-[#ddd] border-[none] border-b-2 border-b-[solid] border-b-out-bayWarf outline-none`}/>
                                    <label className={`
                                        ${inputsFocused[0] || name ? '-translate-y-8 text-sm' : ''} 
                                        absolute left-0 bottom-[4px] text-out-peace text-[14px] transition-all pointer-events-none`}>Tu Nombre</label>
                                </div>

                                <div className="inputGroup halfWidth lpt:basis-[100%] relative my-0 basis-[48%]">
                                    <input  onChange={(e) => setTo(e.target.value)} 
                                            onFocus={() => setInputsFocused(1)} 
                                            onBlur={() => setInputsFocused(1)}
                                            value={to}  
                                            type="email" required 
                                            className="w-[100%] text-[18px] px-[2px] py-0 bg-out-prestigeBlue 
                                            text-box_1-secondary border-[none] border-b-2 border-b-[solid] border-b-out-bayWarf outline-none"/>
                                    <label className={`
                                        ${inputsFocused[1] || to ? '-translate-y-8 text-sm' : ''}
                                        absolute left-0 bottom-[4px] text-out-peace text-[14px] transition-all pointer-events-none`}>Email</label>
                                </div>

                                <div className="inputGroup fullWidth relative my-8 basis-[100%]">
                                    <input onChange={(e) => setSubject(e.target.value)} 
                                            onFocus={() => setInputsFocused(2)} 
                                            onBlur={() => setInputsFocused(2)}
                                            value={subject} 
                                            required
                                            className="w-[100%] text-[18px] px-[2px] py-0 bg-out-prestigeBlue
                                            text-box_1-secondary border-[none] border-b-2 border-b-[solid] border-b-out-bayWarf outline-none"/> 
                                    <label className={`
                                        ${inputsFocused[2] || subject ? '-translate-y-8 text-sm' : ''}
                                        absolute left-0 bottom-[4px] text-out-peace text-[14px] transition-all pointer-events-none`}>Asunto</label>
                                </div>

                                <div className="inputGroup fullWidth relative my-0 basis-[100%]">
                                    <textarea   onChange={(e) => setText(e.target.value)} 
                                                onFocus={() => setInputsFocused(3)} 
                                                onBlur={() => setInputsFocused(3)}
                                                value={text}
                                                required className="w-[100%] h-[220px] block text-[18px] px-[2px] py-0 bg-out-prestigeBlue 
                                            text-box_1-secondary border-[none] border-b-2 border-b-[solid] border-b-out-bayWarf outline-none resize-none"/> 
                                    <label className={`
                                        ${inputsFocused[3] || text ? '-translate-y-8 text-sm' : ''}
                                        absolute top-[2px] left-0 bottom-[4px] text-out-peace text-[14px] transition-all pointer-events-none`}>Escríbenos tu consulta</label>
                                </div>

                                <div className="inputGroup halfWidth lpt:basis-[100%] relative mx-[18px] my-8 basis-[48%]">
                                    <button type="submit" disabled={loading} className="py-[8px] px-[16px] text-[18px] bg-box_1-text_primary
                                        text-box_1-secondary border-[1px] border-transparent rounded-3xl outline-none 
                                        cursor-pointer shadow-xl transition-all duration-[0.4s]
                                        hover:bg-out-prestigeBlue hover:text-box_1-text_primary hover:shadow-lg hover:border-solid hover:border-box_1-text_primary">Enviar Mensaje</button>
                                </div>
                                    {/* {response ? response.message + response.details : error?.message} */}
                            </form>
                        </section>
                    </div>
                </section>
            </div>

            {/*----NAVBAR------------------*/}
            <Navbar elements={navChildren} sectionContact={isVisible}/>
        </main>
    )
}