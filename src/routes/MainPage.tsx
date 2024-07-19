import { useEffect, useState } from "react"
import { Product, ProductCard } from "@/components/product/ProductCard";
import { SortAsc, SortDesc } from "lucide-react";

export const MainPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [isError, setError] = useState<boolean>(false);
    const [sortProp, setSortProp] = useState<keyof Product>("name");
    const [isDesc, setDesc] = useState<boolean>(false);

    function deleteProduct(id: number): void {
        fetch(`https://test.tspb.su/test-task/vehicles/${id}`, {
            method: "DELETE",
        }).then(res => {if (res.ok) alert("Успешно")}).catch(err => console.error(err));

        if (confirm("Are you absolutely shure?"))
            setProducts(products.filter((prod) => prod.id !== id));
    }

    const sortCallback = (prod1: Product, prod2: Product): number => {
        return prod1[sortProp] > prod2[sortProp] ? 1 : prod1[sortProp] < prod2[sortProp] ? -1 : 0;
    }

    useEffect(() => {
        setError(false);
        setLoading(true);
        fetch('https://test.tspb.su/test-task/vehicles', {
            method: "GET",
            mode: "cors",
            redirect: "follow",
            headers: {
                "Content-Type": 'Application/json'
            }
        }).then(res => res.json()).then(data => {
            console.log(data);
            setProducts(data);
            setLoading(false);
        }).catch(e => {
            console.error(e.message);
            setError(true);
        })
    }, []);

    if (isError) return <h2>Error</h2>;
    if (isLoading) return <h2>Loading...</h2>;

    const sorted = products.sort(sortCallback).map(prod => <ProductCard onDelete={deleteProduct} prod={prod} key={prod.id} />);

    return (
        <div className="flex flex-col gap-2">
            <form className="flex gap-4 w-full items-center bg-gray-50 p-4 rounded">
                <div>Sort by:</div>
                <select name="order-by" id="order-by" className="h-8 border" onChange={(e) => setSortProp(e.target.value as keyof Product)}>
                    <option value="name">name</option>
                    <option value="price">price</option>
                    <option value="year">year</option>
                </select>
                <label htmlFor="is-desc" className="w-8 h-8 flex justify-center items-center hover:bg-gray-100 rounded">
                    {isDesc ? <SortDesc /> : <SortAsc />}
                </label>
                <input onChange={(e) => setDesc(e.target.checked)} type="checkbox" id="is-desc" name="is-desc" className="hidden" />
            </form>
            <div className="flex flex-row flex-wrap gap-x-4 gap-y-6">
                {isDesc ? sorted.reverse() : sorted}
            </div>
        </div>
    );
}
