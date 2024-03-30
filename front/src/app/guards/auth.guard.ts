import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { TokenService } from "../services/token.service";

export const AuthGuard = () => {
    const router = inject(Router);
    const tokenService = inject(TokenService);

    if (tokenService.isLogged()){
        return true;
    }
    router.navigateByUrl("/login");
    return false;
}