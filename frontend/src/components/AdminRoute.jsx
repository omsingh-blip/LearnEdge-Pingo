import {
Navigate,
Outlet
}
from "react-router-dom";

import {
useAuthStore
}
from "../store/authStore";

export default function AdminRoute(){

const {
user,
checkingAuth
}=
useAuthStore();

if(checkingAuth){

return null;

}

if(

!user ||

user.role!=="admin"

){

return (

<Navigate
to="/dashboard"
replace
/>

);

}

return <Outlet/>;

}