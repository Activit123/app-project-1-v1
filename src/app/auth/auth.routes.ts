import { Route } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { EmployeeRegisterComponent } from "./employee-register/employee-register.component";

export const registerRoutes: Route[] = [
    {
        path:"",
        component:RegisterComponent
    }
]
export const loginRoutes: Route[] = [
    {
        path:"",
        component:LoginComponent
    }  
]
export const employeerRegisterRoutes: Route[] = [
    {
        path:"",
        component:EmployeeRegisterComponent
    },
    {
        path:":orgId",
        component:EmployeeRegisterComponent
    }
]