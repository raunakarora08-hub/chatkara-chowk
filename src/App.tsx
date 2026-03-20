import React, { useState, useEffect } from 'react';
import { ShoppingBag, Plus, Minus, Trash2, X, MapPin, Phone, User, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Product Data
const products = [
  {
    id: 1,
    name: 'Hand-sculpted resin Clay paperweights',
    price: 80,
    image: 'https://iili.io/qODlYiv.jpg',
    gallery: [
      'https://iili.io/qODlYiv.jpg',
      'https://iili.io/qODlllp.jpg',
      'https://iili.io/qODl5xa.jpg',
      'https://iili.io/qODl0UN.jpg',
      'https://iili.io/qODlXxs.jpg'
    ],
    description: 'Hand-sculpted from premium clay, these unique figurines combine artistic charm with a substantial weight that keeps your documents perfectly in place.',
    longDescription: 'Hand-sculpted from premium clay, these unique figurines combine artistic charm with a substantial weight that keeps your documents perfectly in place.\n\nWhether you\'re organizing a busy workspace or looking for a conversation piece, these resin-coated paperweights offer the perfect blend of playful design and utility.'
  },
  {
    id: 2,
    name: 'Personalised Sketches',
    price: 150,
    image: 'https://i.ibb.co/KpCdyHHH/Screenshot-2026-03-20-182406.png',
    gallery: ['https://i.ibb.co/KpCdyHHH/Screenshot-2026-03-20-182406.png'],
    description: 'Custom hand-drawn portraits and sketches. A perfect memory.',
    longDescription: 'Custom hand-drawn portraits and sketches. A perfect memory to cherish forever.'
  },
  {
    id: 3,
    name: 'Block-Painted Handkerchiefs',
    price: 60,
    image: 'https://i.ibb.co/Kg89p8M/Screenshot-2026-03-20-182218.png',
    gallery: ['https://i.ibb.co/Kg89p8M/Screenshot-2026-03-20-182218.png'],
    description: 'Each handkerchief is a unique piece of wearable art.',
    longDescription: 'Each handkerchief is a unique piece of wearable art. Using hand-carved wooden blocks and eco-friendly pigments, we press intricate patterns onto premium, breathable cotton. Because they are hand-stamped, no two pieces are identical—giving you a truly one-of-a-kind accessory.\n\nIt’s a sustainable alternative to disposables that brings heritage craftsmanship to your pocket.'
  },
  {
    id: 4,
    name: 'Wooden Coasters',
    price: 90,
    image: 'https://iili.io/qODfDNt.jpg',
    gallery: [
      'https://iili.io/qODfDNt.jpg',
      'https://iili.io/qODftRI.jpg',
      'https://iili.io/qODfpxn.jpg',
      'https://iili.io/qODfbDX.jpg'
    ],
    description: 'Hand-painted wooden coasters featuring traditional Indian art.',
    longDescription: 'Hand-painted wooden coasters featuring traditional Indian art. Perfect for protecting your surfaces while adding a touch of heritage to your home.'
  }
];

type CartItem = {
  product: typeof products[0];
  quantity: number;
};

const ImageCarousel = ({ images, alt }: { images: string[], alt: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-full overflow-hidden group">
      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
      </AnimatePresence>
      
      {images.length > 1 && (
        <>
          <button 
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/60 hover:bg-white/90 backdrop-blur-sm rounded-full text-delhi-dark opacity-0 group-hover:opacity-100 transition-opacity z-20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/60 hover:bg-white/90 backdrop-blur-sm rounded-full text-delhi-dark opacity-0 group-hover:opacity-100 transition-opacity z-20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {images.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentIndex ? 'bg-delhi-red' : 'bg-white/60'}`} 
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [modalQuantity, setModalQuantity] = useState(1);

  const addToCart = (product: typeof products[0], quantityToAdd: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      }
      return [...prev, { product, quantity: quantityToAdd }];
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
            role: formData.get('role'),
            phone: formData.get('phone'),
            notes: formData.get('notes'),
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
        style={{ backgroundImage: 'url("https://iili.io/qOV1iw7.jpg")' }}
      />
      <div className="fixed inset-0 z-0 bg-delhi-bg/65 pointer-events-none" />

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="relative z-40 bg-delhi-bg border-b-4 border-delhi-gold/80 shadow-md">
          {/* Full Header Logo */}
          <div className="w-full">
            <img 
              src="https://iili.io/qOGZ6UG.jpg" 
              alt="Chatkara Chowk Banner" 
              className="w-full h-auto block"
              referrerPolicy="no-referrer"
            />
          </div>
        </header>

        {/* Floating Cart Button Below Banner */}
        <div className="sticky top-4 z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-start pointer-events-none h-0 pt-4">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative px-5 py-2.5 bg-white/60 backdrop-blur-md border-2 border-delhi-gold/60 rounded-full text-delhi-dark hover:text-delhi-red hover:border-delhi-red transition-all flex items-center gap-2 shadow-sm pointer-events-auto"
          >
            <span className="font-display tracking-wider text-lg">Cart</span>
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-delhi-red text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                {totalItems}
              </span>
            )}
          </button>
        </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
             style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%238B261D\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}>
        </div>
        <div className="text-center max-w-3xl mx-auto relative z-10">
          <h2 className="font-display text-5xl md:text-7xl text-delhi-dark mb-6 leading-tight">
            The Essence of <br/><span className="text-delhi-red italic">Purani Dilli</span>
          </h2>
          <p className="text-lg md:text-xl text-delhi-dark/80 mb-8 font-medium">
            Discover handcrafted treasures, personalized art, and traditional keepsakes straight from the heart of the old city.
          </p>
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full border border-delhi-gold/40 shadow-sm text-delhi-dark font-medium">
            <CheckCircle2 className="w-5 h-5 text-delhi-red" />
            No payment required now. Pay upon delivery!
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -5 }}
              onClick={() => {
                setSelectedProduct(product);
                setModalQuantity(1);
              }}
              className="bg-white rounded-t-[2rem] rounded-b-2xl overflow-hidden shadow-lg border-2 border-delhi-gold/30 group cursor-pointer flex flex-col relative"
            >
              {/* Traditional decorative corner */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-delhi-gold/60 rounded-tl-[2rem] z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-delhi-gold/60 rounded-tr-[2rem] z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="aspect-square overflow-hidden relative border-b-2 border-delhi-gold/20">
                <ImageCarousel images={product.gallery} alt={product.name} />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold text-delhi-red shadow-md border border-delhi-gold/30 z-30">
                  ₹{product.price}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-white to-delhi-bg/50">
                <h3 className="font-display text-xl mb-2 text-delhi-dark">{product.name}</h3>
                <p className="text-sm text-delhi-dark/70 mb-6 line-clamp-2 flex-grow">{product.description}</p>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product, 1);
                  }}
                  className="w-full py-3 px-4 bg-delhi-red hover:bg-delhi-red/90 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 mt-auto border border-delhi-red shadow-sm"
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
        <p className="text-sm opacity-70">Bringing Purani Dilli to your doorstep.</p>
      </footer>

      {/* Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <ImageCarousel images={selectedProduct.gallery} alt={selectedProduct.name} />
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 left-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-delhi-dark hover:text-delhi-red transition-colors md:hidden z-30"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
                <div className="flex justify-between items-start mb-4 hidden md:flex">
                  <h2 className="font-display text-3xl text-delhi-dark pr-4">{selectedProduct.name}</h2>
                  <button 
                    onClick={() => setSelectedProduct(null)}
                    className="p-2 text-delhi-dark/50 hover:text-delhi-red transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <h2 className="font-display text-3xl text-delhi-dark mb-4 md:hidden">{selectedProduct.name}</h2>
                <div className="text-2xl font-bold text-delhi-red mb-6">₹{selectedProduct.price}</div>
                
                <div className="prose prose-sm text-delhi-dark/80 mb-8 flex-grow whitespace-pre-wrap">
                  {selectedProduct.longDescription}
                </div>
                
                <div className="flex items-center gap-4 mt-auto">
                  <div className="flex items-center border-2 border-delhi-gold/40 rounded-xl overflow-hidden bg-delhi-bg/50">
                    <button 
                      onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                      className="px-4 py-4 text-delhi-dark hover:bg-delhi-gold/20 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-bold text-delhi-dark text-lg">{modalQuantity}</span>
                    <button 
                      onClick={() => setModalQuantity(modalQuantity + 1)}
                      className="px-4 py-4 text-delhi-dark hover:bg-delhi-gold/20 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button 
                    onClick={() => {
                      addToCart(selectedProduct, modalQuantity);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 py-4 bg-delhi-red hover:bg-delhi-red/90 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <ShoppingBag className="w-5 h-5" /> Add to Bag
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                      <div key={item.product.id} className="flex flex-col gap-2">
                        <div className="flex gap-4 bg-white p-4 rounded-2xl border border-delhi-red/5 shadow-sm">
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
                        {item.product.id === 2 && (
                          <div className="bg-delhi-gold/10 text-delhi-dark text-sm p-3 rounded-xl border border-delhi-gold/30 flex items-start gap-2">
                            <Info className="w-5 h-5 text-delhi-red shrink-0 mt-0.5" />
                            <p>We will be texting you soon for the reference image for your personalised sketch!</p>
                          </div>
                        )}
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
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-3 mb-3 bg-white border-2 border-delhi-red text-delhi-red hover:bg-delhi-red/5 rounded-xl font-medium text-lg transition-colors flex items-center justify-center"
                  >
                    Continue Shopping
                  </button>
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
              onClick={() => setIsCheckout(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-delhi-bg w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col"
              >
                <div className="p-6 border-b border-delhi-red/10 bg-white flex items-center justify-between shrink-0">
                  <h2 className="font-display text-2xl text-delhi-red">Checkout</h2>
                  <button 
                    type="button"
                    onClick={() => setIsCheckout(false)}
                    className="p-2 hover:bg-delhi-red/10 bg-delhi-red/5 text-delhi-red rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <form 
                  action="https://formsubmit.co/raunakarora08@gmail.com" 
                  method="POST"
                  onSubmit={handleCheckoutSubmit}
                  className="p-6 space-y-5 overflow-y-auto"
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
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
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
                      <div className="w-full sm:w-1/3">
                        <label className="block text-sm font-medium text-delhi-dark mb-1.5">Role</label>
                        <select 
                          name="role"
                          required
                          className="block w-full px-3 py-3 border border-delhi-red/20 rounded-xl focus:ring-2 focus:ring-delhi-red focus:border-delhi-red bg-white transition-shadow text-delhi-dark"
                        >
                          <option value="Student">Student</option>
                          <option value="Professor">Professor</option>
                        </select>
                      </div>
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
                    <label className="block text-sm font-medium text-delhi-dark mb-1.5">Notes for us (Optional)</label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 pointer-events-none">
                        <MapPin className="h-5 w-5 text-delhi-dark/40" />
                      </div>
                      <textarea 
                        name="notes"
                        rows={3}
                        className="block w-full pl-10 pr-3 py-3 border border-delhi-red/20 rounded-xl focus:ring-2 focus:ring-delhi-red focus:border-delhi-red bg-white transition-shadow resize-none"
                        placeholder="Any special requests or instructions..."
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
