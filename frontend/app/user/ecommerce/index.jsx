import React, { useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Button,
    Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styled } from 'nativewind'; // Import for NativeWind styling

const ECommerce = () => {
    const [products, setProducts] = useState([
        { id: "1", name: "Samsung galaxy M11", price: 70.99 },
        { id: "2", name: "MacBook pro", price: 109.99 },
        { id: "3", name: "Study Table", price: 39.99 },
    ]);

    const [cart, setCart] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
    };

    const renderProductItem = ({ item }) => (
        <View className="mb-4 rounded-lg bg-white p-4 shadow">
            <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
            <Text className="text-base text-gray-600">${item.price.toFixed(2)}</Text>
            <TouchableOpacity
                className="mt-2 flex flex-row items-center justify-center rounded bg-green-600 p-2"
                onPress={() => addToCart(item)}
            >
                <Text className="mr-2 text-white">Add to Cart</Text>
                <Ionicons name="cart-outline" size={20} color="white" />
            </TouchableOpacity>
        </View>
    );

    const renderCartItem = ({ item }) => (
        <View className="mb-4 flex flex-row items-center justify-between rounded-lg bg-white p-4 shadow">
            <View>
                <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
                <Text className="text-base text-gray-600">${item.price.toFixed(2)}</Text>
            </View>
            <TouchableOpacity
                className="rounded bg-red-600 p-2"
                onPress={() => removeFromCart(item.id)}
            >
                <Ionicons name="trash-outline" size={20} color="white" />
            </TouchableOpacity>
        </View>
    );

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleCheckout = () => {
        toggleModal();
    };

    return (
        <View className="flex-1 bg-gray-100 p-5">
            <Text className="mb-5 text-center text-2xl font-bold text-gray-900">E-Commerce App</Text>

            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={renderProductItem}
            />

            <View className="mt-5">
                <Text className="mb-3 text-center text-xl font-bold text-gray-800">Shopping Cart</Text>
                {cart.length === 0 ? (
                    <Text className="text-center text-base text-gray-600">Add at least one product to the cart.</Text>
                ) : (
                    <FlatList
                        data={cart}
                        keyExtractor={(item) => item.id}
                        renderItem={renderCartItem}
                    />
                )}
                <View className="mt-3 items-end">
                    <Text className="text-lg font-bold text-gray-800">Total: ${calculateTotal()}</Text>
                    <TouchableOpacity
                        className="mt-3 rounded bg-blue-600 p-4"
                        onPress={handleCheckout}
                    >
                        <Text className="text-center text-lg font-bold text-white">Proceed to Checkout</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={toggleModal}
            >
                <View className="flex-1 items-center justify-center bg-black/50">
                    <View className="w-80 rounded-lg bg-white p-5 shadow-lg">
                        <Text className="mb-5 text-center text-lg">
                            {cart.length === 0
                                ? "Add at least one product to the cart before proceeding."
                                : "Congratulations! Your order is placed successfully."}
                        </Text>
                        <Button title="Close" onPress={toggleModal} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ECommerce;
