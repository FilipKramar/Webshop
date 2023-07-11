package com.example.store.cart.service;


import com.example.store.cart.model.Cart;
import com.example.store.cart.repository.CartRepository;

import com.example.store.product.model.Product;
import com.example.store.product.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class CartService {
    private final ProductRepository productRepository;
    private final CartRepository cartRepository;


    public List<Cart> getallcarts() {

        return cartRepository.findAll();
    }

    public Cart addProductToCart(Long cartId, Product product) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new IllegalArgumentException("Cart not found with id: " + cartId));
        cart.addProduct(product);
        return cartRepository.save(cart);
    }

    public Cart updateProductInCart(Long cartId, Long productId, Product updatedProduct) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new IllegalArgumentException("Cart not found with id: " + cartId));
        Product product = cart.getProducts().stream()
                .filter(p -> p.getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + productId));
        product.setName(updatedProduct.getName());
        product.setPrice(updatedProduct.getPrice());
        product.setQuantity(updatedProduct.getQuantity());
        return cartRepository.save(cart);
    }

    public Cart removeProductFromCart(Long cartId, Long productId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new IllegalArgumentException("Cart not found with id: " + cartId));
        Product product = cart.getProducts().stream()
                .filter(p -> p.getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + productId));
        cart.removeProduct(product);
        return cartRepository.save(cart);
    }

    public Cart createCart() {
        Cart cart = new Cart();
        cart.setPrice(0.0f);
        return cartRepository.save(cart);
    }

    public void emptyCart(Long cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        cart.getProducts().clear();
        cart.setPrice(0.0f);
        cartRepository.save(cart);
    }


    public Cart updateProductQuantityInCart(Long cartId, Long productId, Integer quantity) {
        Optional<Cart> optionalCart = cartRepository.findById(cartId);
        if (optionalCart.isPresent()) {
            Cart cart = optionalCart.get();
            List<Product> products = cart.getProducts();
            for (Product product : products) {
                if (product.getId().equals(productId)) {
                    product.setQuantity(quantity);
                    return cartRepository.save(cart);
                }
            }
        }
        return null;
    }

}
