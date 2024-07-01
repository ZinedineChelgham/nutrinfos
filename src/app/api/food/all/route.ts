import { foods } from "@/data";
import { createResponseObject } from "@/lib/utils";

export async function GET(){
    return createResponseObject(foods)
}