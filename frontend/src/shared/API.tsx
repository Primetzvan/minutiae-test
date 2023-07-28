import axios from 'axios'

export type Door = {
    uuid: string;
    doorname: string;
    ip: string;
    color: string;
}

export type GetDoorsResponse = {
    doors: Door[];
}

export type User = {
    uuid: string;
    username: string;
    firstname: string;
    lastname: string;
    role: string;
    phonenumber: string;
    email: string;
    address: string;
    finger: object;
    accesses: [];
}

export type GetUsersResponse = {
    users: User[];
}

export type NewUserFormRouteProps = {
    uuid: string;
}

export type CreateNewUserFormRouteProps = {
    username: string;
}


export type loginUsers = {
    usernameoremail: string;
    password: string;
}

export let loggedInUserId: string;

export const getDoors = async () => {
    const { data } = await axios.get<Door[]>(`${process.env.REACT_APP_API_URL}/doors`, { withCredentials: true });
    console.log(data);
    return data;
};

export const getUsers = async () => {
    const { data } = await axios.get<User[]>(`${process.env.REACT_APP_API_URL}/users`, { withCredentials: true });
    console.log(data);
    return data;
};
export const getUserDetail = (uuid: string) => async () => {
    const { data } = await axios.get<User>(`${process.env.REACT_APP_API_URL}/users/${uuid}`, { withCredentials: true });
    console.log(data);
    return data;
};

// export const getAdminProfile = (uuid: string) => async () => {
//     const { data } = await axios.get<User>(`${process.env.REACT_APP_API_URL}/users/${uuid}`, {params:{uuid}});
//     console.log(data);
//     return data;
// };

export const getAdminProfile = async () => {
    const { data } = await axios.get<User>(`${process.env.REACT_APP_API_URL}/users/profile`, { withCredentials: true });
    //console.log(data);
    return data;
};

export const getNewUserProfile = (username: string) => async () => {
    const { data } = await axios.get<User>(`${process.env.REACT_APP_API_URL}/users/username/${username}`, { withCredentials: true });
    //console.log(data);
    return data;
};

export const deleteUser = (uuid: string) => async () => {
    const { data } = await axios.delete<User[]>(`${process.env.REACT_APP_API_URL}/users/${uuid}`, {data:{uuid}});
    console.log(data);
    return data;
};

// export const createUser = (newUserdata: User) => async () => {
//     const { data } = await axios.post<User>(`${process.env.REACT_APP_API_URL}/users`, newUserdata);
//     return data;
//     };

export const createUser = (username: string) => async () => {
    const { data } = await axios.post<User>(`${process.env.REACT_APP_API_URL}/users`, username);
    return data;
};

export const loginUser = (loginusers: loginUsers ) => async () => {
    const { data } = await axios.post<User>(`${process.env.REACT_APP_API_URL}/auth/login`, loginusers);
    return data;
};