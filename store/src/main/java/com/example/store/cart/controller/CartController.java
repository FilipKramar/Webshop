package com.example.store.cart.controller;

import com.example.store.cart.model.Cart;
import com.example.store.cart.service.CartService;

import com.example.store.product.model.Product;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/cart")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class CartController {


    private final CartService cartService;


    @GetMapping
    public List<Cart> getallcarts(){

        return cartService.getallcarts();
    }

    @PostMapping("/{cartId}/products")
    public ResponseEntity<Cart> addProductToCart(
            @PathVariable Long cartId,
            @RequestBody Product product
    ) {

        return ResponseEntity.ok(cartService.addProductToCart(cartId, product));
    }



    @DeleteMapping("/{cartId}/products/{productId}")
    public ResponseEntity<Cart> removeProductFromCart(
            @PathVariable Long cartId,
            @PathVariable Long productId
    ) {

        return ResponseEntity.ok(cartService.removeProductFromCart(cartId, productId));
    }

    @PostMapping
    public ResponseEntity<Cart> createCart() {
        Cart cart = cartService.createCart();
        return ResponseEntity.ok(cart);
    }
    @DeleteMapping("/{cartId}/products")
    public ResponseEntity<String> emptyCart(@PathVariable Long cartId) {
        cartService.emptyCart(cartId);

        return ResponseEntity.ok("Cart emptied successfully");
    }
    @PutMapping("/{cartId}/products/{productId}")
    public ResponseEntity<Cart> updateCartItemQuantity(
            @PathVariable Long cartId,
            @PathVariable Long productId,
            @RequestBody Map<String, Integer> request) {
        Integer quantity = request.get("quantity");
        if (quantity != null) {
            Cart updatedCart = cartService.updateProductQuantityInCart(cartId, productId, quantity);
            if (updatedCart != null) {
                return ResponseEntity.ok(updatedCart);
            }
        }
        return ResponseEntity.notFound().build();
    }




}
