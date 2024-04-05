'use client'
import { useRouter } from 'next/navigation'
import {HiOutlineTrash} from 'react-icons/hi'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"

export default function RemoveBtn({id}:any){
    const router = useRouter()
    const removeTopic = async()=>{
        // const confirmed = confirm(' Are You Sure?')
           const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
                method: 'DELETE'
            })
            if (res.ok){
                router.refresh()
            }
        }

    return(
        <button className='text-red-600'>
            <AlertDialog>
      <AlertDialogTrigger asChild>
        <HiOutlineTrash size={24} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your Topic.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction  onClick={removeTopic}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
            {/*  */}
        </button>
    )
}