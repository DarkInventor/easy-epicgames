'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, Search, ShoppingCart, User, Globe, ChevronDown, X, Heart, Gift, Download, Bell, Menu } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const [notifications, setNotifications] = useState([])
  const [activeTab, setActiveTab] = useState('store')
  const [giftRecipient, setGiftRecipient] = useState('')
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState({})
  const [appliedFilters, setAppliedFilters] = useState([])
  const [sortOrder, setSortOrder] = useState('featured')
  const [showAdultContent, setShowAdultContent] = useState(false)

  const games = [
    { id: 1, name: 'Fortnite', price: 'Free', image: '/fortnite.jpg', genre: 'Battle Royale' },
    { id: 2, name: 'Assassin\'s Creed Mirage', price: 49.99, image: '/ac-mirage.jpg', genre: 'Action Adventure' },
    { id: 3, name: 'Alan Wake 2', price: 59.99, image: '/alan-wake-2.jpg', genre: 'Horror' },
    { id: 4, name: 'Cyberpunk 2077', price: 59.99, image: '/cyberpunk-2077.jpg', genre: 'RPG' },
    { id: 5, name: 'Hogwarts Legacy', price: 59.99, image: '/hogwarts-legacy.jpg', genre: 'RPG' },
    { id: 6, name: 'Red Dead Redemption 2', price: 59.99, image: '/rdr2.jpg', genre: 'Action Adventure' },
    { id: 7, name: 'The Witcher 3', price: 39.99, image: '/witcher-3.jpg', genre: 'RPG' },
    { id: 8, name: 'Rocket League', price: 'Free', image: '/rocket-league.jpg', genre: 'Sports' },
    { id: 9, name: 'Fall Guys', price: 'Free', image: '/fall-guys.jpg', genre: 'Party' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        const newProgress = { ...prev }
        Object.keys(newProgress).forEach(gameId => {
          if (newProgress[gameId] < 100) {
            newProgress[gameId] += 1
          }
        })
        return newProgress
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const addToCart = (game) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === game.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === game.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevCart, { ...game, quantity: 1 }]
    })
  }

  const removeFromCart = (gameId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== gameId))
  }

  const updateCartItemQuantity = (gameId, newQuantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === gameId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const addToWishlist = (game) => {
    setWishlist(prevWishlist => {
      if (prevWishlist.some(item => item.id === game.id)) {
        return prevWishlist
      }
      return [...prevWishlist, game]
    })
  }

  const removeFromWishlist = (gameId) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== gameId))
  }

  const handleSearch = (e) => {
    e.preventDefault()
    console.log(`Searching for: ${searchQuery}`)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setCurrentUser({ name: 'John Doe', email: 'john@example.com' })
    setIsLoginModalOpen(false)
  }

  const handleLogout = () => {
    setCurrentUser(null)
  }

  const handleGift = (game) => {
    setIsGiftModalOpen(true)
  }

  const startDownload = (gameId) => {
    setDownloadProgress(prev => ({ ...prev, [gameId]: 0 }))
  }

  const toggleAdultContent = () => {
    setShowAdultContent(prev => !prev)
  }

  const filteredGames = games.filter(game => 
    game.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (appliedFilters.length === 0 || appliedFilters.includes(game.genre))
  )

  const sortedGames = [...filteredGames].sort((a, b) => {
    if (sortOrder === 'priceAsc') return (a.price === 'Free' ? -1 : a.price) - (b.price === 'Free' ? -1 : b.price)
    if (sortOrder === 'priceDesc') return (b.price === 'Free' ? -1 : b.price) - (a.price === 'Free' ? -1 : a.price)
    return 0 // 'featured' or default
  })

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <header className="bg-[#2a2a2a] py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/epic-games-logo.svg" alt="Epic Games" width={32} height={32} />
            </Link>
            <nav className="hidden md:flex space-x-6 text-sm">
              <Link href="#" className={`hover:text-gray-300 transition-colors ${activeTab === 'store' ? 'text-white' : 'text-gray-400'}`} onClick={() => setActiveTab('store')}>
                Store
              </Link>
              <Link href="#" className={`hover:text-gray-300 transition-colors ${activeTab === 'news' ? 'text-white' : 'text-gray-400'}`} onClick={() => setActiveTab('news')}>
                News
              </Link>
              <Link href="#" className={`hover:text-gray-300 transition-colors ${activeTab === 'faq' ? 'text-white' : 'text-gray-400'}`} onClick={() => setActiveTab('faq')}>
                FAQ
              </Link>
              <Link href="#" className={`hover:text-gray-300 transition-colors ${activeTab === 'help' ? 'text-white' : 'text-gray-400'}`} onClick={() => setActiveTab('help')}>
                Help
              </Link>
              <Link href="#" className={`hover:text-gray-300 transition-colors ${activeTab === 'unreal' ? 'text-white' : 'text-gray-400'}`} onClick={() => setActiveTab('unreal')}>
                Unreal Engine
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                type="text" 
                placeholder="Search store" 
                className="pl-10 pr-4 py-2 bg-[#202020] border-none rounded-full text-sm w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            {currentUser ? (
              <div className="relative group">
                <Button variant="ghost" className="text-sm">
                  <User size={18} className="mr-2" />
                  {currentUser.name}
                </Button>
                <div className="absolute right-0 mt-2 w-48 bg-[#2a2a2a] rounded-md shadow-lg py-1 hidden group-hover:block">
                  <Link href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#3a3a3a]">Profile</Link>
                  <Link href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#3a3a3a]">Settings</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#3a3a3a]">Logout</button>
                </div>
              </div>
            ) : (
              <Button variant="ghost" className="text-sm" onClick={() => setIsLoginModalOpen(true)}>
                <User size={18} className="mr-2" />
                Sign In
              </Button>
            )}
            <Button variant="ghost" className="text-sm relative" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart size={18} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0074e4] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Button>
            <div className="relative group">
              <Button variant="ghost" className="text-sm">
                <Globe size={18} className="mr-2" />
                <ChevronDown size={18} />
              </Button>
              <div className="absolute right-0 mt-2 w-48 bg-[#2a2a2a] rounded-md shadow-lg py-1 hidden group-hover:block">
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Spanish">Español</SelectItem>
                    <SelectItem value="French">Français</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button variant="ghost" className="text-sm relative" onClick={() => setNotifications([])}>
              <Bell size={18} />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </Button>
            <Button variant="ghost" className="md:hidden" onClick={() => setIsMenuOpen(true)}>
              <Menu size={24} />
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative h-[600px] overflow-hidden">
          <Image
            src="/fortnite-hero.jpg"
            alt="Fortnite"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
          <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-16">
            <h1 className="text-5xl font-bold mb-4">Fortnite</h1>
            <p className="text-xl mb-8 max-w-2xl">
              Drop in to a new season of Fortnite Battle Royale. Explore an all-new Island and take on enemies with new weapons and items.
            </p>
            <div className="flex space-x-4">
              <Button 
                className="bg-[#0074e4] hover:bg-[#0065c5] text-lg px-8 py-4"
                onClick={() => addToCart(games[0])}
              >
                Play Free
              </Button>
              <Button variant="outline" className="text-lg px-8 py-4 bg-black">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Game List */}
        <section className="py-16 bg-[#121212]">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Games</h2>
              <div className="flex items-center space-x-4">
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-40 bg-black border border-gray-600">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent >
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="priceAsc">Price: Low to High</SelectItem>
                    <SelectItem value="priceDesc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center space-x-2">
                  <Checkbox id="adult-content" checked={showAdultContent} onCheckedChange={toggleAdultContent} className='border-gray-600 border'/>
                  <label htmlFor="adult-content" className="text-sm text-gray-300">Show Adult Content</label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedGames.map((game) => (
                <div key={game.id} className="bg-[#202020] rounded-lg overflow-hidden">
                  <Image
                    src={game.image}
                    alt={game.name}
                    width={400}
                    height={225}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{game.name}</h3>
                    <p className="text-sm text-gray-400 mb-2">{game.genre}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">{typeof game.price === 'number' ? `$${game.price.toFixed(2)}` : game.price}</span>
                      <div className="flex space-x-2">
                        <Button 
                          className="bg-[#0074e4] hover:bg-[#0065c5]"
                          onClick={() => addToCart(game)}
                        >
                          Add to Cart
                        </Button>
                        <Button variant="outline" onClick={() => addToWishlist(game)}>
                          <Heart size={18} />
                        </Button>
                        <Button variant="outline" onClick={() => handleGift(game)}>
                          <Gift size={18} />
                        </Button>
                      </div>
                    </div>
                    {downloadProgress[game.id] !== undefined && (
                      <div className="mt-2">
                        <div className="bg-gray-700 h-2 rounded-full">
                          <div 
                            className="bg-[#0074e4] h-full rounded-full" 
                            style={{width: `${downloadProgress[game.id]}%`}}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">Downloading: {downloadProgress[game.id]}%</p>
                      </div>
                    )}
                    {downloadProgress[game.id] === undefined && (
                      <Button 
                        variant="outline" 
                        className="w-full mt-2"
                        onClick={() => startDownload(game.id)}
                      >
                        <Download size={18} className="mr-2" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Free Games */}
        <section className="py-16 bg-[#2a2a2a]">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Free Games</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {games.filter(game => game.price === 'Free').map((game) => (
                <div key={game.id} className="bg-[#121212] rounded-lg overflow-hidden">
                  <Image
                    src={game.image}
                    alt={game.name}
                    width={300}
                    height={400}
                    className="w-full h-80 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{game.name}</h3>
                    <span className="text-sm text-gray-300">Free Now</span>
                    <Button 
                      className="w-full mt-2 bg-[#0074e4] hover:bg-[#0065c5]"
                      onClick={() => addToCart(game)}
                    >
                      Get
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Game Categories */}
        <section className="py-16 bg-[#121212]">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Browse by Genre</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {["Action", "Adventure", "RPG", "Strategy", "Sports", "Simulation", "Indie", "Multiplayer", "Racing", "Horror", "Puzzle", "Shooter"].map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  className={`h-24 text-lg font-semibold ${appliedFilters.includes(category) ? 'bg-[#0074e4] text-white' : ''}`}
                  onClick={() => setAppliedFilters(prev => 
                    prev.includes(category) ? prev.filter(f => f !== category) : [...prev, category]
                  )}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#2a2a2a] py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-gray-400 hover:text-white">Support-A-Creator</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Publish on Epic Games</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Careers</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Company</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Made By Epic Games</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-gray-400 hover:text-white">Battle Breakers</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Fortnite</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Infinity Blade</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Robo Recall</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Store Specifics</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-gray-400 hover:text-white">Refund Policy</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Store EULA</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Online Services</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Community Rules</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Epic Games</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-gray-400 hover:text-white">About Epic</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Epic Newsroom</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Fan Art Policy</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">UX Research</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2023, Epic Games, Inc. All rights reserved.</p>
            <div className="flex space-x-6 text-sm">
              <Link href="#" className="text-gray-400 hover:text-white">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                Store Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Modal */}
      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your Cart</DialogTitle>
          </DialogHeader>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}>-</Button>
                    <span>{item.quantity}</span>
                    <Button variant="outline" size="sm" onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}>+</Button>
                    <Button variant="destructive" size="sm" onClick={() => removeFromCart(item.id)}>
                      <X size={16} />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="mt-4">
                <p className="font-semibold">Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
              </div>
              <Button className="w-full mt-4 bg-[#0074e4] hover:bg-[#0065c5]">
                Checkout
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Login Modal */}
      <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input id="email" type="email" required />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full bg-[#0074e4] hover:bg-[#0065c5]">
                Sign In
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Gift Modal */}
      <Dialog open={isGiftModalOpen} onOpenChange={setIsGiftModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gift a Game</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault()
            setIsGiftModalOpen(false)
          }}>
            <div className="space-y-4">
              <div>
                <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">
                  Recipient's Email
                </label>
                <Input 
                  id="recipient" 
                  type="email" 
                  required 
                  value={giftRecipient}
                  onChange={(e) => setGiftRecipient(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full bg-[#0074e4] hover:bg-[#0065c5]">
                Send Gift
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Mobile Menu */}
      <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Menu</DialogTitle>
          </DialogHeader>
          <nav className="flex flex-col space-y-4">
            <Link href="#" className="text-lg" onClick={() => setIsMenuOpen(false)}>
              Store
            </Link>
            <Link href="#" className="text-lg" onClick={() => setIsMenuOpen(false)}>
              News
            </Link>
            <Link href="#" className="text-lg" onClick={() => setIsMenuOpen(false)}>
              FAQ
            </Link>
            <Link href="#" className="text-lg" onClick={() => setIsMenuOpen(false)}>
              Help
            </Link>
            <Link href="#" className="text-lg" onClick={() => setIsMenuOpen(false)}>
              Unreal Engine
            </Link>
          </nav>
        </DialogContent>
      </Dialog>
    </div>
  )
}