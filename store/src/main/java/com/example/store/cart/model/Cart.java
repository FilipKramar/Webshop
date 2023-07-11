package com.example.store.cart.model;

        import com.example.store.product.model.Product;
        import jakarta.persistence.*;
        import lombok.AllArgsConstructor;
        import lombok.Data;
        import lombok.NoArgsConstructor;

        import java.util.ArrayList;
        import java.util.List;

@Entity
@Table(name = "cart")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Float price;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "cart_id")
    private List<Product> products;



    public void addProduct(Product product) {
        products.add(product);
        product.setCart(this);
    }

    public void removeProduct(Product product) {
        products.remove(product);
        product.setCart(null);
    }
}
