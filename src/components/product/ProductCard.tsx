import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTrigger } from "../ui/drawer"

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

export const ProductCard = ({ prod }: { prod: Product }) => {
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
        <DrawerContent>
            <DrawerHeader className="font-semibold text-2xl">{prod.name}</DrawerHeader>
            <div className="px-4 pb-2">edit</div>
            <img alt={prod.name} src={"src/assets/placeholder-green.png"} className="w-full h-64 bg-gray-100 object-cover" />
            <DrawerDescription>
                <div className="text-base p-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quam, expedita cumque? Velit ad facilis voluptatum et esse
                    iure autem illum cum cumque harum laborum atque praesentium nesciunt, dolor enim odio?
                </div>
            </DrawerDescription>
        </DrawerContent>
    </Drawer>
}