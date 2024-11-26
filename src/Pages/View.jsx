import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Header from '../Components/Header'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addTowishlist } from '../Redux/slice/wishlistSlice'
import { addToCart } from '../Redux/slice/cartSlice'



function View() {

  const {id}= useParams()
  const[product,setProduct]=useState({})
  const {wishlist}= useSelector(state=>state.wishListReducer)
  const dispatch = useDispatch()
  const cart=useSelector(state=>state.cartReducer)

useEffect(()=>{
  if(localStorage.getItem("allProducts")){
    const allProducts=JSON.parse(localStorage.getItem("allProducts"))
    setProduct(allProducts.find(item=>item.id==id))
  }else{
    setProduct("")
  }
},[])

const handleCart=(product)=>{
  const existingProduct = cart?.find(item=>item.id==product.id)
  if(existingProduct){
    alert("items added")
    dispatch(addToCart(product))
  }else{
    alert("item added")
    dispatch(addToCart(product))
  }
}

console.log(product)

const handleWishlist=(product)=>{
  const existingProduct = wishlist.find(item=>item.id==product.id)
  if(existingProduct){
    alert("product already exist")
  }else{
    dispatch(addTowishlist(product))
  }
}
  
  return (

   <>
         <Header/>
         <div style={{marginTop:"100px"}}>
      <div className='container mt-5 row ms-5'>
        <div className='col-lg-4' >
          <img src={product?.thumbnail} alt="" />
        </div>
        <div className='col-lg-2'></div>
        <div className='col-lg-6'>
          <p className='text-warning fw-bolder '>pid:{product?.id}</p>
          <h1>{product?.title}

          </h1>
          <p>{product?.description}</p>
          <h3>price: <span className='text-danger'>${product?.price}</span> </h3>
          <div className='d-flex justify-content-between'>
            <Button className='btn btn-outline-dark '  onClick={()=>handleWishlist(product)}><i className='fa-solid fa-heart text-danger'  onClick={()=>handleWishlist(product)}></i> Wishlist</Button>
            <Button className='btn btn-outline-light' onClick={()=>handleCart(product)} ><i class="fa-solid fa-cart-plus text-info" ></i>cart</Button>
        </div>
        </div>
      
      </div>
      </div>
  </>
  )
}

export default View