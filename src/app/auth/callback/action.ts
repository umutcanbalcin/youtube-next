"use server";
import getStrapiUser from "@/actions/getUser";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import axios from 'axios';

export async function checkAuthStatus() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) return { success: false };

    const userId = user.id;
    const email = user.email;
    const name = `${user.given_name} ${user.family_name}`;
    const profilePicture = user.picture;

    try {
        // Check if user exists in the new KindeUsers collection
        const existingUser = await axios.get(`http://localhost:1337/api/kindeusers?filters[userId][$eq]=${userId}`);
        
        if (existingUser.data.data.length === 0) {
            // If user doesn't exist, create a new user
            await axios.post('http://localhost:1337/api/kindeusers', {
                data: {
                    userId: userId,
                    email: email,
                    name: name,
                    profilePicture: profilePicture,
                },
            });
        }
        const userData = await getStrapiUser(user.id);
        return { success: true, userData };
    } catch (error) {
        console.error("Error checking or creating user:", error);
        return { success: false };
    }
}
