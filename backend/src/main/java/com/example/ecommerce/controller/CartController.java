package com.example.ecommerce.controller;

import com.example.ecommerce.model.CartItem;
import com.example.ecommerce.repository.CartItemRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin
public class CartController {

    private final CartItemRepository cartRepository;

    public CartController(CartItemRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @GetMapping("/{userId}")
    public List<CartItem> getCart(@PathVariable Long userId) {
        return cartRepository.findByUserId(userId);
    }

    @PostMapping
    public CartItem addToCart(@RequestBody CartItem item) {
        return cartRepository.save(item);
    }

    @PutMapping("/{id}")
    public CartItem updateCart(
            @PathVariable Long id,
            @RequestBody CartItem item) {

        CartItem existing = cartRepository.findById(id).orElse(null);

        if (existing == null) {
            return null;
        }

        existing.setQuantity(item.getQuantity());

        return cartRepository.save(existing);
    }

    @DeleteMapping("/{id}")
    public String removeFromCart(@PathVariable Long id) {

        cartRepository.deleteById(id);

        return "Item removed from cart";
    }
}
