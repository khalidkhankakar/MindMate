'use client'
import * as React from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { AI_MODELS } from "@/lib/utils"
import { setModelCookies } from '@/action'
export function SelectModels({modelId}:{modelId:string}) {

    const modelObj:any = AI_MODELS.find((model) => model.id === modelId)

    const handleOnChange = (val:string)=>{
        setModelCookies(val)
    }

    return (
        <Select onValueChange={(val)=>handleOnChange(val)} defaultValue={modelObj.id} value={modelObj.id}>
            <SelectTrigger className="w-fit px-2">
                <SelectValue placeholder="AI Models" />
            </SelectTrigger>
            <SelectContent className="px-4">
                <SelectGroup>
                    {
                        AI_MODELS.map((model) => (
                            <SelectItem  key={model.id} value={model.id}>{model.name}</SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
