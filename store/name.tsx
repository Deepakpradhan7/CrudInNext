import { createSlice } from "@reduxjs/toolkit"

const initialName: {name:string } = {
   name:"Deepak"
}


const nameSlice  = createSlice({
    name : "nameChnage",
    initialState: initialName,
    reducers: {
        setName(state,action){
            state.name = action.payload
        },
    }
})




export const {setName} = nameSlice.actions
export default nameSlice.reducer;