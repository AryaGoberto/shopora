// Simple cart utilities backed by localStorage for client-side cart
import { CartItemType } from "./types";

const STORAGE_KEY = "shopora_cart";

export function getCart(): CartItemType[] {
	try {
		if (typeof window === "undefined") return [];
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		return JSON.parse(raw) as CartItemType[];
	} catch (err) {
		console.error("getCart error:", err);
		return [];
	}
}

export function saveCart(items: CartItemType[]) {
	try {
		if (typeof window === "undefined") return;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
		try {
			// notify other parts of the app (same tab)
			if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") {
				window.dispatchEvent(new CustomEvent("cart_updated", { detail: items.length }));
			}
		} catch (e) {
			// ignore
		}
	} catch (err) {
		console.error("saveCart error:", err);
	}
}

export function clearCart() {
	try {
		if (typeof window === "undefined") return;
		localStorage.removeItem(STORAGE_KEY);
	} catch (err) {
		console.error("clearCart error:", err);
	}
}

export function addToCart(item: CartItemType) {
	try {
		const cart = getCart();
		// Try to merge with existing item (same id + same size + same color)
		const idx = cart.findIndex(
			(c) => c.id === item.id && c.size === item.size && c.color === item.color
		);
		if (idx >= 0) {
			cart[idx].quantity = (cart[idx].quantity || 0) + item.quantity;
		} else {
			cart.push(item);
		}
		saveCart(cart);
		return cart;
	} catch (err) {
		console.error("addToCart error:", err);
		return getCart();
	}
}

export function removeFromCart(id: string, size?: string, color?: string) {
	try {
		const cart = getCart();
		const filtered = cart.filter(
			(c) => !(c.id === id && c.size === size && c.color === color)
		);
		saveCart(filtered);
		return filtered;
	} catch (err) {
		console.error("removeFromCart error:", err);
		return getCart();
	}
}

export function updateQuantity(id: string, quantity: number, size?: string, color?: string) {
	try {
		const cart = getCart();
		const idx = cart.findIndex(
			(c) => c.id === id && c.size === size && c.color === color
		);
		if (idx >= 0) {
			cart[idx].quantity = Math.max(1, quantity);
			saveCart(cart);
		}
		return cart;
	} catch (err) {
		console.error("updateQuantity error:", err);
		return getCart();
	}
}

export type { CartItemType };