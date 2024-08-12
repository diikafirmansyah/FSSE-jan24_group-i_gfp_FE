const API_URL = "http://127.0.0.1:5000"; // api backend url

// untuk menambahkan item ke keranjang
export const addToCart = async (product_id: number, quantity: number): Promise<any> => {
    
    const token = localStorage.getItem('access_token');

    const formData = new URLSearchParams();
    
    formData.append('product_id', product_id);
    formData.append('qty', quantity);


    // const data = new URLSearchParams();
    // const data ={product_id: product_id, qty: quantity}
    
    // data.append('product_id', productId.toString());
    // data.append('qty', parseInt(quantity));

    try{
        // melakukan request post untuk menambahkan product ke keranjang
        const response = await fetch(`${API_URL}/carts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${token}`
            },
            body: formData.toString()
        });
        // console.log(response)
        return await response

        // if (!response.ok) {
        //     const errorData = await response.json();
        //     console.log(errorData)
        //     // throw new Error(`Error ${response.status}: ${errorData.message || 'Failed to add product to cart'}`);
        //     throw new Error(`fail`)
        // }

    }catch (error) {
        console.error("Error adding product to cart:", error);
        // throw error;
    }
}