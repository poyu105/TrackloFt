const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

let acTk: string | null = null; //accessToken
export function setAccessToken(token: string) {
    acTk = token;
}

/**
 * API統一呼叫方法
 * @param {*} url 
 * @param {*} options - { method, body, headers }
 * @returns 
 */
export async function apiRequest(url: string, options: {method?: string; body?: any; headers?: any} = {}) {
    const {method = "GET", body, headers = {}} = options;

    const fetchOptions: RequestInit = {
        method,
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            ...(acTk ? {Authorization: `Bearer ${acTk}`} : {}),
            ...headers,
        },
        credentials: "include", //允許cookie傳送refreshToken
    };

    if(body) fetchOptions.body = JSON.stringify(body);

    let response = await fetch(`${API_BASE_URL}/${url}`, fetchOptions);

    //401 token expired -> try refresh
    if(response.status === 401){
        const refresh = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: "POST",
            credentials: "include",
        });

        if(!refresh.ok){
            throw new Error("登入已過期，請重新登入");
        }

        const refreshData = await refresh.json();
        acTk = refreshData.accessToken;

        //重試原本API
        fetchOptions.headers = {
            ...fetchOptions.headers,
            Authorization: `Bearer ${acTk}`,
        };
        response = await fetch(`${API_BASE_URL}/${url}`, fetchOptions);
    }

    if(!response.ok){
        let errorText: string;
        try {
            const data = await response.json();
            errorText = data?.message || JSON.stringify(data);
        } catch {
            errorText = await response.text();
        }
        throw new Error(errorText);
    }

    try{
        return response.json();
    }catch{
        return null;
    }
}

const ApiServices = {
    //自訂API
    custom: (url: string, method: string, body?: any)=>
        apiRequest(url, {method, body: {body}}),

    //登入
    login: (email: string, password: string)=>
        apiRequest(`auth/login`, {
            method: 'POST',
            body: { email, password }
        }),

    //註冊
    register: (name: string, email: string, password: string)=>
        apiRequest(`auth/register`, {
            method: 'POST',
            body: { name, email, password }
        }),

    //取得專案
    getProjects: (userid: string)=>
        apiRequest(`project/getAllProject`, {
            method: 'GET'
        }),

    //取得看板
    getBoards: (projectId: string)=>
        apiRequest(`boards/${projectId}`, {
            method: 'GET'
        }),

    //取得Task
    getTasks: (projectId: string)=>
        apiRequest(`tasks/${projectId}`, {
            method: 'GET'
        }),

    //移動Task
    moveTask: (taskId: string, fromBoardId: string, toBoardId: string)=>
        apiRequest(`tasks/${taskId}/move`, {
            method: 'POST',
            body: { taskId, fromBoardId, toBoardId }
        }),
}
export default ApiServices;