import EditTopicForm from "@/components/EditTopicForm";
import { Fragment } from "react";

const getTopicById = async(id:any)=>{
    try{
        const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
            cache: 'no-store'
        })
        if (!res.ok){
            throw new Error ("Failed to fetch the Topic ")
        }
        return res.json()
        
    } catch (err){
        console.log(err)
    }
   
}

export default async function EditTopic({params}:any){
    const {id} = params
    console.log(id)
    const {topic}=await getTopicById(id)
    const {title, description} =topic
    console.log(topic)
    return(
        <Fragment>
            <EditTopicForm id ={id} title = {title} description = {description}/>
        </Fragment>
    )
}