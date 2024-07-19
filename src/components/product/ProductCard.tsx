import { ProdMap } from "@/ProdMap"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTrigger } from "../ui/drawer"
import { YMapLocation } from "@yandex/ymaps3-types/imperative/YMap"
import { Suspense, useContext, useState } from "react"
import { Dialog, DialogContent, DialogClose, DialogDescription, DialogHeader, DialogTrigger } from "../ui/dialog"
import { useMediaQuery } from "usehooks-ts"
import { Edit, Trash } from "lucide-react"
import { UpdateeProductForm } from "./UpdateProductForm"
import { AuthContext } from "@/App"

export type Product = {
    id: number,
    name: string,
    model: string,
    year: number,
    color: string,
    price: number,
    latitude: number,
    longitude: number,
}

export type ProductForm = Omit<Product, "id" | "longtitude" | "latitude">;

export const ProductCard = ({ prod, onDelete }: { prod: Product, onDelete: Function }) => {
    const pointLocation: YMapLocation = { center: [prod.longitude, prod.latitude], zoom: 9 };
    const [isOpen, setOpen] = useState(false);

    const isDesktop = useMediaQuery("(min-width: 768px)");
    const isAdmin = useContext(AuthContext);

    const [isFormOpened, setFormOpened] = useState(false);

    if (!isDesktop) return <Drawer open={isOpen} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
            <div className="flex flex-col max-w-64 w-full rounded max-sm:max-w-full">
                <img alt={prod.name} src={"src/assets/placeholder-green.png"} className="w-full h-64 bg-gray-100 object-cover" />
                <div className="flex flex-col p-4 gap-2">
                    <h2 className="w-max">{prod.name}</h2>
                    <h3 className="w-max">${prod.price}</h3>
                    <button className="bg-black text-white rounded p-1 border-none w-max">Buy Now</button>
                </div>
            </div>
        </DrawerTrigger>
        <DrawerContent className="!max-h-full mt-8 overflow-hidden px-0">
            <div className="overflow-y-scroll max-h-screen">
                <DrawerHeader className="font-semibold text-2xl">{prod.name}</DrawerHeader>
                {isFormOpened && <UpdateeProductForm prod={prod} onClose={()=> setFormOpened(!isFormOpened)}/>}
                {isAdmin && <div className="px-4 py-2 flex flex-row gap-2">
                    <button><Edit color="gray" className="hover:bg-gray-50 rounded" onClick={() => setFormOpened(!isFormOpened)} /></button>
                    <button><Trash color="gray" className="hover:bg-gray-50 rounded" onClick={() => onDelete(prod.id)} /></button>
                </div>}
                {!isFormOpened && <>
                    <img alt={prod.name} src={"src/assets/placeholder-green.png"} className="w-full h-64 bg-gray-100 object-cover" />
                    <div className="w-full h-64 bg-gray-100 object-cover">
                        <Suspense fallback={<div>Map is loading...</div>}>
                            <ProdMap pointLocation={pointLocation} />
                        </Suspense>
                    </div>
                    <h1 className="text-2xl mx-4 my-2">${prod.price}</h1>
                    <button className="bg-black text-white rounded mx-4 mb-2 p-1 border-none w-max">Buy Now</button>
                    <DrawerDescription className="">
                        <div className="text-base py-2 mx-4">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Quam, expedita cumque? Velit ad facilis voluptatum et esse
                            iure autem illum cum cumque harum laborum atque praesentium nesciunt, dolor enim odio?
                        </div>
                    </DrawerDescription>
                    <ul className="mx-4 my-2">
                        {Object.keys(prod).map((prop) => <li className="flex flex-row w-full border-bottom border-dotted justify-between capitalize">
                            <div>{prop}</div><div>{prod[prop as keyof Product]}</div>
                        </li>)}
                    </ul>
                </>}
                <DrawerClose asChild><button className="border rounded p-2 m-4 hover:bg-gray-50">Close</button></DrawerClose>
            </div>

        </DrawerContent>
    </Drawer>;

    return <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <div className="flex flex-col max-w-64 w-full rounded max-sm:max-w-full">
                <img alt={prod.name} src={"src/assets/placeholder-green.png"} className="w-full h-64 bg-gray-100 object-cover" />
                <div className="flex flex-col p-4 gap-2">
                    <h2 className="w-max">{prod.name}</h2>
                    <h3 className="w-max">${prod.price}</h3>
                    <button className="bg-black text-white rounded p-1 border-none w-max">Buy Now</button>
                </div>
            </div>
        </DialogTrigger>
        <DialogContent className="!max-h-full my-4 overflow-hidden px-0 py-10">
            <div className="overflow-y-scroll max-h-screen">
                <DialogHeader className="font-semibold text-2xl mx-4">{prod.name}</DialogHeader>
                {isFormOpened && <UpdateeProductForm prod={prod} onClose={()=> setFormOpened(!isFormOpened)} />}
                {isAdmin && <div className="px-4 py-2 flex flex-row gap-2">
                    <button><Edit color="gray" className="hover:bg-gray-50 rounded" onClick={() => setFormOpened(!isFormOpened)} /></button>
                    <button><Trash color="gray" className="hover:bg-gray-50 rounded" onClick={() => onDelete(prod.id)} /></button>
                </div>}
                {!isFormOpened && <>
                    <img alt={prod.name} src={"src/assets/placeholder-green.png"} className="w-full h-64 bg-gray-100 object-cover" />
                    <div className="w-full h-64 bg-gray-100 object-cover">
                        <Suspense fallback={<div>Map is loading...</div>}>
                            <ProdMap pointLocation={pointLocation} />
                        </Suspense>
                    </div>
                    <h1 className="text-2xl mx-4 my-2">${prod.price}</h1>
                    <button className="bg-black text-white rounded mx-4 mb-2 p-1 border-none w-max">Buy Now</button>
                    <DialogDescription className="">
                        <div className="text-base py-2 mx-4">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Quam, expedita cumque? Velit ad facilis voluptatum et esse
                            iure autem illum cum cumque harum laborum atque praesentium nesciunt, dolor enim odio?
                        </div>
                    </DialogDescription>
                    <ul className="mx-4 my-2">
                        {Object.keys(prod).map((prop) => <li className="flex flex-row w-full border-bottom border-dotted justify-between capitalize">
                            <div>{prop}</div><div>{prod[prop as keyof Product]}</div>
                        </li>)}
                    </ul>
                </>}
                <DialogClose asChild><button className="border rounded p-2 m-4 hover:bg-gray-50">Close</button></DialogClose>
            </div>
        </DialogContent>
    </Dialog>
}