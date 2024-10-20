            
async function fetchProducts() {
    const response = await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
                {
                products {
                    id
                    name
                    value
                }
                }
            `,
        }),
    });

    if (!response.ok) {
        console.error('Error en la solicitud GraphQL:', response.statusText);
        return;
    }

    const data = await response.json();
    console.log(data);
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    data.data.products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `ID: ${product.id}, Nombre: ${product.name}, Valor: $${product.value}`;
        li.onclick = () => selectProduct(product.id, product.name, product.value);
        productList.appendChild(li);
    });
    
}

async function addProduct() {
    const productName = document.getElementById('productName').value;
    const productValue = parseFloat(document.getElementById('productValue').value);

    if (!productName || isNaN(productValue)) {
        alert('Ingresa un nombre y un valor válido.');
        return;
    }

    const escapedProductName = productName.replace(/"/g, '\\"');
    const response = await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        query: `
            mutation {
                addProduct(name: "${escapedProductName}", value: ${productValue}) {
                    id
                    name
                    value
                }
            }
        `,
        }),
    });
    await fetchProducts();

    document.getElementById('productName').value = '';
    document.getElementById('productValue').value = '';
}

async function updateProduct(id, newName, newValue) {
    if (!newName || isNaN(newValue)) {
        alert('Ingresa un nombre y un valor válido.');
        return;
    }

    const escapedProductName = newName.replace(/"/g, '\\"');
    const response = await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
                mutation {
                    updateProduct(id: "${id}", name: "${escapedProductName}", value: ${newValue}) {
                        id
                        name
                        value
                    }
                }
            `,
        }),
    });

    if (!response.ok) {
        console.error('Error en la solicitud GraphQL:', response.statusText);
        return;
    }

    await fetchProducts();  // Actualiza la lista de productos después de la actualización
}

async function submitEdit() {
    const id = document.getElementById('editProductId').value;
    const name = document.getElementById('editProductName').value;
    const value = parseFloat(document.getElementById('editProductValue').value);

    if (!id || !name || isNaN(value)) {
        alert('Por favor, selecciona un producto válido y completa los campos.');
        return;
    }

    await updateProduct(id, name, value);
    document.getElementById('editProductId').value = '';
    document.getElementById('editProductName').value = '';
    document.getElementById('editProductValue').value = '';
}

function selectProduct(id, name, value) {
    document.getElementById('editProductId').value = id;
    document.getElementById('editProductName').value = name;
    document.getElementById('editProductValue').value = value;
}

