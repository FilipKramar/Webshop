package com.example.store.cart.dtos;

import com.example.store.product.model.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartRequest {

    private List<Product> products;


}
