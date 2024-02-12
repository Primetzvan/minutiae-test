import axios from 'axios'
import {Input} from "@material-ui/core";
import {Stream} from "stream";

export type Door = {
    uuid: string;
    doorname: string;
    ip: string;
    color: string;
}

export type Access = {
    uuid: string;
    expireDate: string;
    door: Door;
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
    accesses: Access[];
}


export type ConfigLog = {
    data: string;
    modifiedOnDoor: string;
    modifier: string;
    action: string;
    modifiedTable: string;
    oldValue: string;
    newValue: string;
}

export type GateLog = {
    created: string;
    door: string;
    entrant: string;
    event: string;
    failReason: string;
}

export type FingerStatus = {
    status: string;
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
    const {data} = await axios.get<Door[]>(`${process.env.REACT_APP_API_URL}/doors`, {withCredentials: true});
    return data;
};


export const addDoor = async (name: string, ip: string) => {
    return axios({
        url: `${process.env.REACT_APP_API_URL}/doors/`, //your url
        method: 'POST',
        withCredentials: true,
        headers: {
            Accept: 'application/zip',
        },
        data: {"doorname": name, "ip": ip},
        responseType: 'blob', // important
    }).then((response) => {
        if (response.data.size !== 0) {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'setup.zip'); //or any other extension
            document.body.appendChild(link);
            link.click();
        } else {
            return false;
        }
    })
};


export const updateDoor = (uuid: string, val: {}) => async () => {
    console.log("val" + val);
    const { data } = await axios.patch<Door>(`${process.env.REACT_APP_API_URL}/doors/${uuid}`, val, { withCredentials: true });
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
    console.log('getUserDetail ')
    console.log(data);
    return data;
};

export const updateUser = (uuid: string, userData: {}) => async () => {
        const { data } = await axios.patch<User>(`${process.env.REACT_APP_API_URL}/users/${uuid}`, userData, { withCredentials: true,
        headers: {
            // Overwrite Axios's automatically set Content-Type (otherwise userdata json string doesnt work)
            'Content-Type': 'application/json'
        }
    },);
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

export const overrideAccesses = (uuid: string, accesses: string[]) => async () => {
    const { data } = await axios.post<User>(`${process.env.REACT_APP_API_URL}/accesses/`, {"userId": uuid, "accesses": accesses}, {withCredentials: true});
    return data;
};

export const updateAccess = (uuid: string, expireDate: Date) => async () => {
    const { data } = await axios.patch<string>(`${process.env.REACT_APP_API_URL}/accesses/`, {"accessId": uuid, "expireDate": expireDate}, {withCredentials: true});
    return data;
};

export const removeAccess = (uuid: string) => async () => {
    const { data } = await axios.delete<Object>(`${process.env.REACT_APP_API_URL}/accesses/${uuid}`, {withCredentials: true});
    return data;
};

export const addFinger = (userId: string) => async () => {
    const { data: sessionId } = await axios.post<string>(`${process.env.REACT_APP_API_URL}/fingers/`, {"userId": userId}, {withCredentials: true});
    return sessionId;
};

export const getCreateFingerStatus = (sessionId: string) => async () => {
    const { data: status } = await axios.get<FingerStatus>(`${process.env.REACT_APP_API_URL}/fingers/status/${sessionId}`,  {withCredentials: true});
    return status;
};

export const deleteFinger = (userId: string | undefined) => async () => {
    const { data } = await axios.delete<Object>(`${process.env.REACT_APP_API_URL}/fingers/${userId}`, {withCredentials: true});
    return data;
};

export const loginUser = (loginusers: loginUsers ) => async () => {
    const { data } = await axios.post<User>(`${process.env.REACT_APP_API_URL}/auth/login`, loginusers);
    return data;
};

export const logoutUser = () => async () => {
    const { data } = await axios.get<string>(`${process.env.REACT_APP_API_URL}/auth/logout`, { withCredentials: true });
    return data;
};



export const getConfigLogs = async () => {
    const { data } = await axios.get<ConfigLog[]>(`${process.env.REACT_APP_API_URL}/logs/config`, { withCredentials: true });
    return data;
};

export const getGateLogs = async () => {
    const { data } = await axios.get<GateLog[]>(`${process.env.REACT_APP_API_URL}/logs/gate`, { withCredentials: true });
    return data;
};


axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401 && window.location.href !== window.location.protocol + "//" + window.location.host + "/") {
        window.location.href = "/"
    }
    return error;
});
