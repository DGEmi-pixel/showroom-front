/** @type {import('next').NextConfig} */
const nextConfig = {
    //[ ] AGREGAMOS EL HOST DE CLOUDINARY
    images: {
        domains: ['res.cloudinary.com']
    }
};

export default nextConfig;
