'use server';
import { cookies } from "next/headers";

export const setModelCookies = async (model:string)=> {
    const cookieStore = await cookies();
    cookieStore.set('model', model)

}