"use server";
import { revalidatePath, revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const getItem = async ({ itemId } : { itemId: string }) => {

    const res = await fetch(`http://localhost:5000/items/${itemId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = res.json();

    return data;
}

export const getAllItems = async () => {
    const res = await fetch(`http://localhost:5000/items`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
        cache: 'no-cache'
    });

    const data = res.json();

    return data;
}

export const getAllItemsByUser = async () => {
    const token = await getCookie('accessToken');

    const res = await fetch(`http://localhost:5000/items/user`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        },
        cache: 'no-cache'
    });

    const data = res.json();

    return data;
}

export const createItem = async (previousState: any, formData: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {

        const token = await getCookie('accessToken');

        // Store form data to local object
        const itemData = {
            itemName: formData.get('itemName'),
            description: formData.get('description'),
            quantity: parseInt(formData.get('quantity')?.valueOf().toString() || '0')
        }

        // Simple validation
        if(itemData.itemName == '') return 'itemName is required';
        if(itemData.description == '') return 'description is required';
        if(itemData.quantity == 0) return 'quantity is required';

        // Send login request
        const res = await fetch(`http://localhost:5000/items`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(itemData)
        });

        // Handle response
        const data = await res.json();

        // Check for errors
        if(data.error) return data.error;

    } catch (error) {
        return 'An error occurred';
    } 
    redirect('/dashboard');
}

export const deleteItem = async (itemId : string) => {
    const token = await getCookie('accessToken');

    const res = await fetch(`http://localhost:5000/items/${itemId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        }
    });

    const data = await res.json();
    if(data.error) return data.error;

    revalidatePath(`/dashboard`);
}

export const loginUser = async (previousState: any, formData: FormData) => {

    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
        // Store form data to local object
        const userLoginData = {
            username: formData.get('username'),
            password: formData.get('password')
        }

        // Simple validation
        if(userLoginData.username == '') return 'Username is required';
        if(userLoginData.password == '') return 'Password is required';

        // Send login request
        const res = await fetch(`http://localhost:5000/users/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userLoginData)
        });

        // Handle response
        const data = await res.json();

        // Check for errors
        if(data.error) return data.error;

        // Set cookie
        setCookie({key: 'accessToken', value: data.accessToken});  

    } catch (error) {
        return 'An error occurred';
    } 
    redirect('/');
}

export const registerUser = async (previousState: any, formData: FormData) => {
    try {
        // Store form data to local object
        const userRegisterData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            username: formData.get('username'),
            password: formData.get('password')
        }

        // Simple validation
        if(userRegisterData.firstName == '') return 'First name is required';
        if(userRegisterData.lastName == '') return 'Last name is required';
        if(userRegisterData.username == '') return 'Username is required';
        if(userRegisterData.password == '') return 'Password is required';

        // Send register request
        const res = await fetch(`http://localhost:5000/users`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userRegisterData)
        });

        // Handle response
        const data = await res.json();

        // Check for errors
        if(data.error) return data.error;

    } catch (error) {
        return 'An error occurred';
    }

    redirect('/login');
}

export const logoutUser = async () => {
    (await cookies()).delete('accessToken');
    redirect('/');
}

export async function setCookie({
    key,
    value,
  }: {
    key: string;
    value: string;
  }): Promise<void> {
    (await cookies()).set(key, value);
}

export async function getCookie(key: string): Promise<string> {
    return (await cookies()).get(key)?.value || '';
}