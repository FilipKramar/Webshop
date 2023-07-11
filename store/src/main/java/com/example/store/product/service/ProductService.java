package com.example.store.product.service;

import com.example.store.product.dto.ProductRequest;
import com.example.store.product.model.Product;
import com.example.store.product.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<Product> getAllProducts() {

        return productRepository.findAll();
    }

    public void saveProduct(ProductRequest product) {

        Product product1=new Product();

        product1.setName(product.getName());
        product1.setPrice(product.getPrice());
        product1.setPicture(product.getPicture());
        productRepository.save(product1);


    }

    public Product getProducts(Long id) {

        Optional<Product> optionalProduct = productRepository.findById(id);
        return optionalProduct.orElse(null);


    }
}
