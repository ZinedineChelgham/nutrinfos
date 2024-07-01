"use client"
 
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandList,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Food, FoodReduced } from "@/types"
import { useRouter } from "next/navigation"

 


export default function Home() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [foods, setFoods] = React.useState<FoodReduced[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const router = useRouter()

  const fetchFoods = async () => {
    setIsLoading(true);
    const response = await fetch("/api/food/all")
    const data = await response.json()
    const FoodReduced = data.map((food: Food, id: number) => {
      return {
        label: food.name,
        value: food.name?.replace(/ /g, "-").toLocaleLowerCase(),
      }
    })
    setFoods(FoodReduced)    
  }

  React.useEffect(() => {
    fetchFoods().then(() => {
      setIsLoading(false)
    })
  }, [])

  React.useEffect(() => {
    if(value.length > 0){
      router.push(`/food/${value}`)
    }
  },[value])

 
  return (
    <>
    {isLoading ? (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl">loading...</p>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <h1 className="text-5xl font-extrabold mb-4">Welcome to <span className="title_colored">Nutrinfos</span></h1>
        <p className="text-lg mb-4">Select a food item to get its nutritional information.</p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[300px] justify-between"
            >
              {value
                ? foods.find((food) => food.value === value)?.label
                : "Select food..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandInput placeholder="Search food..." />
              <CommandEmpty>No food item found.</CommandEmpty>
              <CommandList>
                {foods.map((food) => (
                  <CommandItem
                    key={food.value}
                    value={food.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === food.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {food.label}
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    
    )}
    </>
    
  
  )

}
