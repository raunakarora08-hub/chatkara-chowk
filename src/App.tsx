import React, { useState } from 'react';
import { ShoppingBag, Plus, Minus, Trash2, X, MapPin, Phone, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Product Data
const products = [
  {
    id: 1,
    name: 'Clay Figurines',
    price: 80,
    image: 'https://i.ibb.co/cXkm67Xy/Screenshot-2026-03-20-012250.png',
    description: 'Traditional terracotta horse and elephant figurines, handcrafted by artisans.'
  },
  {
    id: 2,
    name: 'Personalised Sketches',
    price: 80,
    image: 'https://i.ibb.co/KpCdyHHH/Screenshot-2026-03-20-182406.png',
    description: 'Custom hand-drawn portraits and sketches. A perfect memory.'
  },
  {
    id: 3,
    name: 'Block Printed Handkerchiefs',
    price: 60,
    image: 'https://i.ibb.co/Kg89p8M/Screenshot-2026-03-20-182218.png',
    description: 'Authentic hand-block printed cotton handkerchiefs with floral motifs.'
  },
  {
    id: 4,
    name: 'Wooden Coasters',
    price: 95,
    image: 'https://i.ibb.co/rRHXdM40/Screenshot-2026-03-20-183402.png',
    description: 'Hand-painted wooden coasters featuring traditional Indian art.'
  }
];

type CartItem = {
  product: typeof products[0];
  quantity: number;
};

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const addToCart = (product: typeof products[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === id) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartDetailsString = cart.map(item => `${item.quantity}x ${item.product.name} (₹${item.product.price * item.quantity})`).join('\n');

  const handleCheckoutSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // We use FormSubmit's AJAX API for a seamless experience
    try {
      const response = await fetch("https://formsubmit.co/ajax/raunakarora08@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: formData.get('name'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            _subject: "New Order from Chatkara Chowk!",
            "Order Details": cartDetailsString,
            "Total Amount": `₹${totalAmount}`,
            "Payment Method": "Cash on Delivery / Pay Later"
        })
      });

      if (response.ok) {
        setOrderPlaced(true);
        setCart([]);
        setIsCheckout(false);
      } else {
        // Fallback to standard form submission if AJAX fails (e.g. requires captcha)
        e.currentTarget.submit();
      }
    } catch (error) {
      e.currentTarget.submit();
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden font-sans">
      {/* Background Image & Overlay */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://iili.io/qOGZ6UG.jpg")' }}
      />
      <div className="fixed inset-0 z-0 bg-delhi-bg/90 pointer-events-none" />

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-delhi-bg/90 backdrop-blur-md border-b border-delhi-red/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-end relative">
            
            {/* Centered Logo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none py-3">
              <img 
                src="https://iili.io/qOGZ6UG.jpg" 
                alt="Chatkara Chowk Banner" 
                className="h-full w-auto object-contain pointer-events-auto"
                referrerPolicy="no-referrer"
              />
            </div>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-delhi-dark hover:text-delhi-red transition-colors z-10"
            >
            <ShoppingBag className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-delhi-gold text-delhi-dark text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
             style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%238B261D\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}>
        </div>
        <div className="text-center max-w-3xl mx-auto relative z-10">
          <h2 className="font-display text-5xl md:text-7xl text-delhi-dark mb-6 leading-tight">
            The Essence of <br/><span className="text-delhi-red italic">Purani Delhi</span>
          </h2>
          <p className="text-lg md:text-xl text-delhi-dark/80 mb-10 font-medium">
            Discover handcrafted treasures, personalized art, and traditional keepsakes straight from the heart of the old city.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-delhi-red/5 group"
            >
              <div className="aspect-square overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-delhi-red shadow-sm">
                  ₹{product.price}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl mb-2 text-delhi-dark">{product.name}</h3>
                <p className="text-sm text-delhi-dark/70 mb-6 line-clamp-2">{product.description}</p>
                <button 
                  onClick={() => addToCart(product)}
                  className="w-full py-3 px-4 bg-delhi-red hover:bg-delhi-red/90 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add to Bag
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-delhi-dark text-delhi-bg py-12 text-center border-t border-delhi-red/20">
        <div className="font-display text-2xl mb-4 text-delhi-gold">Chatkara Chowk</div>
        <p className="text-sm opacity-70">Bringing Purani Delhi to your doorstep.</p>
      </footer>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-delhi-bg shadow-2xl z-50 flex flex-col border-l border-delhi-red/10"
            >
              <div className="p-6 flex items-center justify-between border-b border-delhi-red/10 bg-white">
                <h2 className="font-display text-2xl text-delhi-red flex items-center gap-2">
                  <ShoppingBag className="w-6 h-6" /> Your Bag
                </h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-delhi-red/5 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-delhi-dark" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-delhi-dark/50 space-y-4">
                    <ShoppingBag className="w-16 h-16 opacity-20" />
                    <p className="text-lg font-medium">Your bag is empty</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="text-delhi-red font-medium hover:underline"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex gap-4 bg-white p-4 rounded-2xl border border-delhi-red/5 shadow-sm">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-20 h-20 object-cover rounded-xl"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-display text-lg text-delhi-dark leading-tight">{item.product.name}</h4>
                            <p className="text-delhi-red font-bold mt-1">₹{item.product.price}</p>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-3 bg-delhi-bg rounded-lg p-1 border border-delhi-red/10">
                              <button 
                                onClick={() => updateQuantity(item.product.id, -1)}
                                className="p-1 hover:bg-white rounded-md transition-colors"
                              >
                                <Minus className="w-4 h-4 text-delhi-dark" />
                              </button>
                              <span className="font-medium w-4 text-center text-sm">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.product.id, 1)}
                                className="p-1 hover:bg-white rounded-md transition-colors"
                              >
                                <Plus className="w-4 h-4 text-delhi-dark" />
                              </button>
                            </div>
                            <button 
                              onClick={() => updateQuantity(item.product.id, -item.quantity)}
                              className="p-2 text-delhi-dark/40 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 bg-white border-t border-delhi-red/10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-lg font-medium text-delhi-dark">Total Amount</span>
                    <span className="font-display text-2xl text-delhi-red">₹{totalAmount}</span>
                  </div>
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckout(true);
                    }}
                    className="w-full py-4 bg-delhi-red hover:bg-delhi-red/90 text-white rounded-xl font-medium text-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-delhi-red/20"
                  >
                    Proceed to Checkout <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckout && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="bg-delhi-bg w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
              >
                <div className="p-6 border-b border-delhi-red/10 bg-white flex items-center justify-between">
                  <h2 className="font-display text-2xl text-delhi-red">Checkout</h2>
                  <button 
                    onClick={() => setIsCheckout(false)}
                    className="p-2 hover:bg-delhi-red/5 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-delhi-dark" />
                  </button>
                </div>
                
                <form 
                  action="https://formsubmit.co/raunakarora08@gmail.com" 
                  method="POST"
                  onSubmit={handleCheckoutSubmit}
                  className="p-6 space-y-5"
                >
                  {/* Hidden fields for FormSubmit */}
                  <input type="hidden" name="_subject" value="New Order from Chatkara Chowk!" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="Order Details" value={cartDetailsString} />
                  <input type="hidden" name="Total Amount" value={`₹${totalAmount}`} />
                  <input type="hidden" name="Payment Method" value="Cash on Delivery / Pay Later" />
                  
                  <div className="bg-delhi-gold/10 p-4 rounded-xl border border-delhi-gold/20 mb-6">
                    <p className="text-sm text-delhi-dark font-medium flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-delhi-gold" />
                      No payment required now. Pay upon delivery!
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-delhi-dark mb-1.5">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-delhi-dark/40" />
                      </div>
                      <input 
                        type="text" 
                        name="name"
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-delhi-red/20 rounded-xl focus:ring-2 focus:ring-delhi-red focus:border-delhi-red bg-white transition-shadow"
                        placeholder="Rahul Sharma"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-delhi-dark mb-1.5">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-delhi-dark/40" />
                      </div>
                      <input 
                        type="tel" 
                        name="phone"
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-delhi-red/20 rounded-xl focus:ring-2 focus:ring-delhi-red focus:border-delhi-red bg-white transition-shadow"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-delhi-dark mb-1.5">Delivery Address</label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 pointer-events-none">
                        <MapPin className="h-5 w-5 text-delhi-dark/40" />
                      </div>
                      <textarea 
                        name="address"
                        required
                        rows={3}
                        className="block w-full pl-10 pr-3 py-3 border border-delhi-red/20 rounded-xl focus:ring-2 focus:ring-delhi-red focus:border-delhi-red bg-white transition-shadow resize-none"
                        placeholder="House No, Street, Landmark, City, Pincode"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-delhi-red/10 flex items-center justify-between mb-6">
                    <span className="text-lg font-medium text-delhi-dark">Total to Pay Later</span>
                    <span className="font-display text-2xl text-delhi-red">₹{totalAmount}</span>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 bg-delhi-red hover:bg-delhi-red/90 text-white rounded-xl font-medium text-lg transition-colors shadow-lg shadow-delhi-red/20"
                  >
                    Place Order
                  </button>
                  <p className="text-xs text-center text-delhi-dark/50 mt-4">
                    By placing this order, you agree to our terms of service.
                  </p>
                </form>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {orderPlaced && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 text-center"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="font-display text-3xl text-delhi-dark mb-2">Order Placed!</h2>
              <p className="text-delhi-dark/70 mb-8">
                Thank you for shopping at Chatkara Chowk. We will contact you shortly for delivery.
              </p>
              <button 
                onClick={() => setOrderPlaced(false)}
                className="w-full py-3 bg-delhi-dark hover:bg-black text-white rounded-xl font-medium transition-colors"
              >
                Continue Shopping
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      </div>
    </div>
  );
}
