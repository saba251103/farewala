import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button, IconButton, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './Background.png'; // Import your background image here

export default function ProductForm() {
  const [productType, setProductType] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [products, setProducts] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const navigate = useNavigate();
  const productTypes = [
    { value: 'Vegetable', label: 'Vegetable' },
    { value: 'Fruit', label: 'Fruit' },
    { value: 'Food', label: 'Food' },
  ];

  const handleAddProduct = () => {
    const newProduct = { productName, quantity, price, productType };
    setProducts([...products, newProduct]);
    setProductName('');
    setQuantity('');
    setPrice('');
    setProductType('');
  };

  const handleDeleteProduct = () => {
    const updatedProducts = [...products];
    updatedProducts.splice(deleteIndex, 1);
    setProducts(updatedProducts);
    setConfirmDialogOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (products.length >= 0) {
      console.log('Submitted Products:', products);
      navigate('/');
    } else {
      alert('Please add at least one product');
    }
  };

  const backgroundHeight = 100 + 70 * products.length; // Adjust the height based on the number of products added

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`, // Set background image
        backgroundSize: 'cover', // Ensure the image covers the entire container
        backgroundPosition: 'center', // Center the image
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: `${backgroundHeight}vh`, // Set height dynamically based on product count
      }}
    >
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
            <Typography variant="h4" gutterBottom>
              Product Information
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                select
                label="Select Product Type"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                
              >
                {productTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                
              />
              <TextField
                type="number"
                label="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              
              />
              <TextField
                type="number"
                label="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                
              />
              <IconButton aria-label="add" onClick={handleAddProduct}>
                Add Product
                <AddIcon />
              </IconButton>
              {products.map((product, index) => (
                <div key={index}>
                  <Typography variant="h6">Product {index + 1}</Typography>
                  <TextField
                    disabled
                    label="Product Type"
                    value={product.productType}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    disabled
                    label="Product Name"
                    value={product.productName}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    disabled
                    label="Quantity"
                    value={product.quantity}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    disabled
                    label="Price"
                    value={product.price}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      setDeleteIndex(index);
                      setConfirmDialogOpen(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        aria-labelledby="confirm-dialog-title"
      >
        <DialogTitle id="confirm-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteProduct} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
