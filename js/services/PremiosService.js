const API_URL = "httpslocalhost:8080/Api/Premios"

export async function GetPremios() {
    const res = await fetch(`${API_URL}/GetPremios`);
    return res.json();
}

export async function PutPremios(id, data) {
    await fetch(`${API_URL}/PutPremios/${id}`,{
        method : "PUT",
        headers : {"Content-Type":"application/json"},
        body : JSON.stringify(data)
    });
}
export async function PostPremios(data) {
    await fetch(`${API_URL}/PostPremios`,{
        method : "POST",
        headers : {"Content-Type":"application/json"},
        body : JSON.stringify(data)
    });
}

export async function DeletePremios(id) {
    await fetch(`${API_URL}/DeletePremios${id}`,{
        method : "DELETE",
    });
}