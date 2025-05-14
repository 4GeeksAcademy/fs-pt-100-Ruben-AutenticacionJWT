const userServices = {};
const backendUrl = import.meta.env.VITE_BACKEND_URL;


userServices.register = async (formData) => {
    try {
        const resp = await fetch(backendUrl + "/api/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if(!resp.ok) throw Error("somthing went wrong")
        const data = await resp.json();
        // localStorage.setItem("token", data.token)

        return data
    } catch (error) {
        console.log(error)
    }
}

userServices.login = async (formData) => {
  try {
    const resp = await fetch(backendUrl + "/api/signin", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    console.log("Response status:", resp.status);
        if(!resp.ok) throw Error("somthing went wrong")
        const data = await resp.json();
    console.log("Login response:", data);
        localStorage.setItem("token", data.token)

        return data
    } catch (error) {
        console.log(error)
    }
}

userServices.getInfo = async () => {
    try {
        const resp = await fetch(backendUrl + "/api/private", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
        });
        if(!resp.ok) throw Error("somthing went very bad")
        const data = await resp.json();
        console.log(data);
        
        return data
    } catch (error) {
        console.log(error)
    }
}

export default userServices