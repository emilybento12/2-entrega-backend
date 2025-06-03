const socket = io();

const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');

productForm.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(productForm);
  const product = {};
  formData.forEach((value, key) => {
    product[key] = value;
  });

  socket.emit('newProduct', product);
  productForm.reset();
});

socket.on('productList', products => {
  productList.innerHTML = '';
  products.forEach(product => {
    const li = document.createElement('li');
    li.textContent = `ID: ${product.id} | ${product.title} - R$ ${product.price}`;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Excluir';
    deleteBtn.addEventListener('click', () => {
      socket.emit('deleteProduct', product.id);
    });
    li.appendChild(deleteBtn);
    productList.appendChild(li);
  });
});