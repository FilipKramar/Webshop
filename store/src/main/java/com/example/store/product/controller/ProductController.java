package com.example.store.product.controller;

import com.example.store.product.dto.ProductRequest;
import com.example.store.product.model.Product;
import com.example.store.product.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/product")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class ProductController {


    private final ProductService productService;

    @PostMapping
    public ResponseEntity<String>  addAProduct(@RequestBody ProductRequest product){

        productService.saveProduct(product);
        return ResponseEntity.ok("Yes");


    }
    @GetMapping()
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getaproduct(@PathVariable Long id) {
        return productService.getProducts(id);
    }


    @PutMapping("/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {

        return ResponseEntity.ok("Product updated successfully");}



}
