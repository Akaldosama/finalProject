"use client"
import React, {ChangeEvent} from 'react'
import { MdSearch } from 'react-icons/md'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'


const Search = ({placeholder}:{placeholder:string}) => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const params = 
    }

}