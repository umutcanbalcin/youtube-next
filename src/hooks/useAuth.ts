import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "@/atoms/userAtom";
import { checkAuthStatus } from "@/app/auth/callback/action";


export function useAuth() {
    const [, setCurrentUser] = useRecoilState(userAtom);

    useEffect(() => {
        async function fetchUser() {
            const { success, userData } = await checkAuthStatus();
            if (success && userData) {
                setCurrentUser(userData);
            }
        }
        fetchUser();
    }, [setCurrentUser]);
}
