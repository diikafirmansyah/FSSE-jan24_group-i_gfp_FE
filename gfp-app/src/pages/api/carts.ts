const API_URL = "http://127.0.0.1:5000"; // api backend url


// untuk menambahkan item ke keranjang
export const addToCart = async (product_id: number, quantity: number): Promise<any> => {
    
    const token = localStorage.getItem('access_token');

    const formData = new URLSearchParams();
    
    formData.append('product_id', product_id.toString());
    formData.append('qty', quantity.toString());

    try{
        // melakukan request post untuk menambahkan product ke keranjang
        const response = await fetch(`${API_URL}/carts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });
        // console.log(response)
        return await response

    }catch (error) {
        console.error("Error adding product to cart:", error);
        // throw error;
    }
}

