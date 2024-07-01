"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { Undo2 } from "lucide-react";
import Image from "next/image";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { Food, MacronutrientData } from "@/types";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export default function FoodDetailPage(props: any) {
    const {name} = props.params;
    const [foodItem, setFoodItem] = React.useState<Food | null>(null);
    const [macros, setMacros] = React.useState<MacronutrientData[]>([]); 
    const router = useRouter();

    const fetchSelectedFoodDetail = async () => {
        const response = await fetch(`/api/food/${name}`)
        const data = await response.json()
        console.log(data)
        setFoodItem(data);
    }
    
    React.useEffect(() => {
        fetchSelectedFoodDetail()
    },[])

    React.useEffect(() => {
        if(foodItem){
            const {carbohydrates, protein, fat} = foodItem;
            setMacros([
                {
                    name: "carbohydrates",
                    value: carbohydrates
                },
                {
                    name: "protein",
                    value: protein
                },
                {
                    name: "fat",
                    value: fat
                }
            ])
        }
    },[foodItem])


    return (
        <div className="p-8 text-white">
            <Undo2 className="text-2xl cursor-pointer mb-2" onClick={() => router.back()} />
            <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7">{foodItem?.name}</h1>
            <div className="flex flex-col items-center md:flex-row md:items-start">
                <div className="w-full md:w-1/2 lg:w-1/3 md:mb-0">
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart width={800} height={300}>
                            <Pie
                            data={macros}
                            cx={"50%"}
                            cy={"50%"}
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            >
                            {macros.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="text-center mt-4">
                        <span className="inline-block h-3 w-3 mr-1 bg-[#0088FE]"></span>
                            Carbs: {foodItem?.carbohydrates}
                        <span className="inline-block h-3 w-3 mr-1 ml-4 bg-[#00C49F]"> </span>
                            Prot: {foodItem?.protein}
                        <span className="inline-block h-3 w-3 mr-1 ml-4 bg-[#FFBB28]"> </span>
                            Fat: {foodItem?.fat}
                    </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-2/3">
                    <div className="text-lg font-semibold mb-4">Nutritional info for 100g </div> 
                    <div className="mb-0 p-4 bg-gray-900 text-white rounded-lg shadow-inner">
                    <div className="mb-2">Calories: <span className="font-medium">{foodItem?.calories}</span></div>
                        <div className="flex items-center mb-2">
                            <div className="w-5 h-5 bg-[#0088FE] border border-gray-700 mr-3"></div>
                            <div>Carbohydrates: <span className="font-medium">{foodItem?.carbohydrates}g</span></div>
                        </div>
                    </div>
                    <div className="mb-0 p-4 bg-gray-900 text-white rounded-lg shadow-inner">
                        <div className="flex items-center mb-2">
                            <div className="w-5 h-5 bg-[#00C49F] border border-gray-700 mr-3"></div>
                            <div>Prot: <span className="font-medium">{foodItem?.protein}g</span></div>
                        </div>
                    </div>
                    <div className="mb-0 p-4 bg-gray-900 text-white rounded-lg shadow-inner">
                        <div className="flex items-center mb-2">
                            <div className="w-5 h-5 bg-[#FFBB28] border border-gray-700 mr-3"></div>
                            <div>Fat: <span className="font-medium">{foodItem?.fat}g</span></div>
                        </div>
                    </div>
                <div className="mt-4">
                    <div className="flex items-center mb-2">
                    <Image src="/vitamins.png" width={30} height={30} alt="Vitamins" />
                    <div className="ml-3">
                        <span className="font-semibold">Vitamins:</span> {foodItem?.vitamins?.join(', ')}
                    </div>
                    </div>
                    <div className="flex items-center">
                    <Image src="/minerals.png" width={30} height={30} alt="Minerals" />
                    <div className="ml-3">
                        <span className="font-semibold">Minerals:</span> {foodItem?.minerals?.join(', ')}
                    </div>
                    </div>
              </div>
                </div>
         </div>    
    </div>
    )
}