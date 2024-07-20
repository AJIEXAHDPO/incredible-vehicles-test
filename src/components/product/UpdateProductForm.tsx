import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Product } from "./ProductCard"

const formSchema = z.object({
    //id: z.number(),
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    model: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    year: z.coerce.number().gt(1900, "Too old").lt(new Date(Date.now()).getFullYear(), "Year should not be greater then now"),
    price: z.coerce.number().gt(0),
    color: z.string().min(2, {
        message: "Color must be at least 2 characters.",
    }),
    latitude: z.number().min(0, {
        message: "Latitude should not be less then 0.",
    }),
    longitude: z.number().min(2, {
        message: "Longitude should not be less then 0.",
    }),
})

export function UpdateeProductForm({ prod, onClose, onUpdate }: { prod: Product, onClose: Function, onUpdate: Function }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...prod
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        onUpdate(values, prod.id);
        console.log(values);
        onClose();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mx-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Model</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Year</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Color</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex gap-2">
                    <Button type="submit">Submit</Button>
                    <Button type="reset" variant="ghost" onClick={()=> onClose()}>Cancel</Button>
                </div>
            </form>
        </Form>
    )
}
