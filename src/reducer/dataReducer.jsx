export const dataReducer = (state,{type, payload})=>{
    switch(type){
        
        case  "changeCategory":
            console.log("changeCategory", payload);
            return {
                ...state, selectedCategory:payload}
        
        case "default":
            return state;
    }
}