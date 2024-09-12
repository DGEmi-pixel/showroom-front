'use client';
import { poppins } from "@/styles/fonts/font";
import { ProductCard } from "@/components/productCard";
import { Pagination } from "@/components/pagination";
import { Navbar } from "@/components/navbar";
import { useProductHook } from '@/hooks/product.hook'
import { Filter } from "@/types/product.types";

//[ ] SIDEBAR FILTERS
import { Sidebar } from '@/components/sidebar'

export default function Products() {

    const { products, applyFilters, productLoading, productError, brandCount, currentProducts, currentPage, productsPerPage, setCurrentPage } = useProductHook()

    //[ ] PAGINACION


    const navChildren = [{linkName: 'Inicio', href: 'home'}, {linkName: 'Productos', href: 'products'}, 
    {linkName: 'Destacados', href: 'features'},
    {linkName: 'Sobre', href: 'about'},{linkName: 'Contacto', href: 'contact'}]
    
    const handleNavLinkClick = (section: string) => {
        window.location.assign(`/home#${section}`);
    };

    const handleFilterApply = (filters: Filter) => {
        applyFilters(filters);
    };

    return (
        <main className={`text-[14px] relative bg-dashboard-color-background`}>
            <Navbar elements={navChildren} sectionContact={false} onNavLinkClick={handleNavLinkClick}></Navbar>
            {/*[ ] SIDEBAR FILTERS */ }
            <Sidebar products={products} brandCount={brandCount} onFilterApply={handleFilterApply} isOpen={true} logo={false}/>
            <div className={`relative mt-[100px] w-[80%] ml-[20%] z-10 flex flex-wrap items-center justify-center`}>
            
            { Array.isArray(currentProducts) && currentProducts.length > 0 ?

                currentProducts.map(product => (
                    <ProductCard 
                                name={product.name}
                                brand={product.brand}
                                imageUrl={product.imageUrl}
                                sizesAvailable={product.size} 
                                price={product.price} 
                                availableColours={product.colors} 
                                key={product.id}>
                    </ProductCard>
                )) :
                <div className='flex items-center w-[200px] p-4 mt-[30px] bg-gray-400 rounded-lg'>
                    <p className='text-lg text-black'>No hay existencias</p>
                </div>
            }

                <div className="relative w-[100%]">
                    <Pagination 
                        totalProducts={products.length}
                        currentProducts={currentProducts.length}
                        productsPerPage={productsPerPage}
                        currentPage={currentPage}
                        paginate={setCurrentPage}
                    />
                </div>
            </div>
        </main>
    )
}
