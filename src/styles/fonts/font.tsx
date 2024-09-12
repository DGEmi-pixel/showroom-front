import { Montserrat, Roboto, Roboto_Condensed, Open_Sans, Source_Code_Pro, Inter, Poppins, Dosis, Lora, Raleway } from "next/font/google"

export const montserrat = Montserrat(
    {
        subsets: ['latin'],
        weight: ['400', '500', '600', '700']
    }
)

export const roboto = Roboto(
    {
        subsets: ['latin'],
        weight: ['400', '500', '700']
    }
)

export const roboto_condensed = Roboto_Condensed(
    {
        subsets: ['latin'],
        weight: ['400', '500', '700']
    }
)

export const open_sans = Open_Sans(
    {
        subsets: ['latin'],
        weight: ['400', '500', '700']
    }
)

export const source_code_pro = Source_Code_Pro(
    {
        subsets: ['latin'],
        weight: ['400', '500', '700']
    }
)

export const inter = Inter(
    {
        subsets: ['latin'],
        weight: ['200', '400', '500', '700']
    }
)

export const poppins = Poppins(
    {
        subsets: ['latin'],
        weight: ['200', '300', '400', '700', '800', '900']
    }
)

export const dosis = Dosis(
    {
        subsets: ['latin'],
        weight: ['200', '300', '400', '700', '800']
    }
)

export const lora = Lora(
    {
        subsets: ['latin'],
        weight: ['400', '700']
    }
)

export const raleway = Raleway(
    {
        subsets: ['latin'],
        weight: ['400', '700'],
        style: ['normal', 'italic'] // Agrega italic si es compatible
    }
)
