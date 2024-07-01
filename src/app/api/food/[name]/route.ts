import { foods } from "@/data";
import {createResponseObject} from "@/lib/utils";

export async function GET(request: Request, params: any){
    const name = params.params.name;
    const food = foods.find((food) => food.name.replace(/ /g, "-").toLowerCase() === name);
    if(food){
        return createResponseObject(food);
    } else {
        return createResponseObject({message: "Food not found"}, 404);
    }

}