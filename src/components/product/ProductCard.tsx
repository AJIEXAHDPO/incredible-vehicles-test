import { ProdMap } from "@/ProdMap"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTrigger } from "../ui/drawer"
import { YMapLocation } from "@yandex/ymaps3-types/imperative/YMap"
import { Suspense, useState } from "react"
import { Dialog, DialogContent, DialogClose, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../ui/dialog"

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

export type ProductForm = Omit<Product, "id" | "longtitude" | "latitude">

export const ProductCard = ({ prod }: { prod: Product }) => {
    const pointLocation: YMapLocation = { center: [prod.longitude, prod.latitude], zoom: 9 };
    const [productData, setProductData] = useState<Product>();
return <Drawer>
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
                <div className="px-4 pb-2">edit</div>
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
                <DrawerClose asChild><button className="border rounded p-2 m-4 hover:bg-gray-50">Close</button></DrawerClose>
            </div>
        </DrawerContent>
    </Drawer>;

    return <Dialog>
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
                <DialogHeader className="font-semibold text-2xl mx-4">
                    {prod.name}
                </DialogHeader>
                <div className="px-4 pb-2">edit</div>
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
                <DialogFooter>
                    <DialogClose asChild><button className="border rounded p-2 m-4 hover:bg-gray-50">Close</button></DialogClose>
                </DialogFooter>
            </div>
        </DialogContent>
    </Dialog>
}