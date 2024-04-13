
import Loader2 from 'lucide-react'
import { Fragment, cache } from "react"
import RemoveBtn from "./RemoveBtn"
import Link from "next/link"
import {HiPencilAlt} from 'react-icons/hi'


const getTopics = async() =>{
    try {
        const res = await fetch(`https://next-crudex.vercel.app/api/topics`, {
            cache: 'no-cache'
        });
        if (!res.ok){
            throw new Error('failed to fetch topics')
        }
        // console.log(res.json(), 'my ress')
        return res.json()
    } catch (error){
        console.log(Error)
    }
}

export default async function TopicsList(){
    const {topics} = await getTopics() || [];
    if (!topics){
        return <>Loading...</>
    }
    return(
    <Fragment>
       {
        topics.length > 0 ?
        <Fragment>
         {
            topics.map((topic:any, index:any)=>{
                return(
                    <div key={index} className="justify-between flex items-start py-4 px-2 border border-gray-800 gap-5 my-3 rounded-md">
                    <div>
                        <h2 className="font-bold text-xl">{topic.title}</h2>
                        <div> {topic.description}</div>
                    </div>
            
                    <div className="flex gap-2">
                        <RemoveBtn id={topic._id}/>
                        <Link href={`/editTopic/${topic._id}`}>
                            <HiPencilAlt size={24}/>
                        </Link>
                    </div>
                   </div>
                )
            })
        }
        </Fragment>: <div>
            <h1 className="font-semibold text-xl">There is no topic. Create a new one.</h1>
        </div>
       }
       
      
    </Fragment>
    )
}