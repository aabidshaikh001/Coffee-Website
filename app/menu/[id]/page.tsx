import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, Share2, Coffee, Leaf } from "lucide-react"

// This would typically come from a database
const getProductById = (id: string) => {
  const products = {
    espresso: {
      id: "espresso",
      name: "Espresso",
      category: "coffee",
      priceRange: "$3.50 - $4.25",
      prices: [
        { size: "Single", price: "$3.50" },
        { size: "Double", price: "$4.25" },
      ],
      description: "Our signature espresso blend with notes of chocolate and caramel.",
      longDescription:
        "Our signature espresso is a carefully crafted blend of beans from Ethiopia and Colombia. The result is a rich, full-bodied shot with notes of dark chocolate, caramel, and a hint of citrus. Each shot is pulled with precision by our trained baristas to ensure the perfect extraction every time.",
      ingredients: ["100% Arabica coffee beans", "Ethically sourced from Ethiopia and Colombia"],
      nutritionalInfo: "Serving Size: 1 oz (30ml) | Calories: 3 | Caffeine: 63mg",
      image: "/placeholder.svg?height=600&width=800",
      relatedProducts: ["latte", "cappuccino", "americano"],
    },
    americano: {
      id: "americano",
      name: "Americano",
      category: "coffee",
      priceRange: "$3.75 - $4.50",
      prices: [
        { size: "Small", price: "$3.75" },
        { size: "Large", price: "$4.50" },
      ],
      description: "Espresso diluted with hot water, maintaining the flavor but reducing intensity.",
      longDescription:
        "Our Americano starts with our signature espresso shots, which are then diluted with hot water. This method preserves the complex flavors of the espresso while reducing its intensity, resulting in a smooth, full-flavored coffee that can be enjoyed for longer. Perfect for those who appreciate the taste of espresso but prefer a larger, less concentrated drink.",
      ingredients: ["100% Arabica coffee beans", "Filtered water"],
      nutritionalInfo: "Serving Size: 8 oz (240ml) | Calories: 5 | Caffeine: 77mg",
      image: "/placeholder.svg?height=600&width=800",
      relatedProducts: ["espresso", "latte", "cold-brew"],
    },
    cappuccino: {
      id: "cappuccino",
      name: "Cappuccino",
      category: "coffee",
      priceRange: "$4.50 - $5.25",
      prices: [
        { size: "Small", price: "$4.50" },
        { size: "Large", price: "$5.25" },
      ],
      description: "Equal parts espresso, steamed milk, and milk foam for a balanced coffee experience.",
      longDescription:
        "The perfect cappuccino is all about balance. Ours features equal parts of our rich espresso, velvety steamed milk, and airy milk foam. This traditional Italian coffee provides a harmonious blend of strong coffee flavor and creamy texture. Each cappuccino is crafted with care, ensuring the ideal temperature and consistency.",
      ingredients: ["100% Arabica coffee beans", "Organic whole milk (alternatives available)"],
      nutritionalInfo: "Serving Size: 6 oz (180ml) | Calories: 80 | Protein: 4g | Fat: 4g | Caffeine: 63mg",
      image: "/placeholder.svg?height=600&width=800",
      relatedProducts: ["latte", "espresso", "macchiato"],
    },
    latte: {
      id: "latte",
      name: "Latte",
      category: "coffee",
      priceRange: "$4.75 - $5.50",
      prices: [
        { size: "Small", price: "$4.75" },
        { size: "Large", price: "$5.50" },
        { size: "Add flavor", price: "+$0.75" },
      ],
      description: "Espresso with steamed milk and a light layer of foam. Smooth and creamy.",
      longDescription:
        "Our latte combines our signature espresso with a generous amount of steamed milk and topped with a light layer of microfoam. The result is a smooth, creamy coffee with a mild, balanced flavor. Available with your choice of milk and optional flavor additions like vanilla, caramel, or hazelnut.",
      ingredients: [
        "100% Arabica coffee beans",
        "Organic whole milk (alternatives available)",
        "Optional flavor syrups",
      ],
      nutritionalInfo: "Serving Size: 12 oz (360ml) | Calories: 120 | Protein: 8g | Fat: 7g | Caffeine: 63mg",
      image: "/placeholder.svg?height=600&width=800",
      relatedProducts: ["cappuccino", "espresso", "mocha"],
    },
    "pour-over": {
      id: "pour-over",
      name: "Pour Over",
      category: "coffee",
      priceRange: "$5.50",
      prices: [{ size: "Single Origin", price: "$5.50" }],
      description: "Hand-poured coffee highlighting the unique characteristics of our single-origin beans.",
      longDescription:
        "Our pour-over coffee is a celebration of the unique characteristics of our single-origin beans. This hand-brewing method allows for precise control over the brewing process, resulting in a clean, flavorful cup that highlights the distinct notes of each coffee origin. We rotate our selection regularly, offering you the opportunity to explore different flavor profiles from around the world.",
      ingredients: ["Single-origin coffee beans", "Filtered water"],
      nutritionalInfo: "Serving Size: 12 oz (360ml) | Calories: 5 | Caffeine: varies by bean",
      image: "/placeholder.svg?height=600&width=800",
      relatedProducts: ["cold-brew", "americano", "espresso"],
    },
    "cold-brew": {
      id: "cold-brew",
      name: "Cold Brew",
      category: "coffee",
      priceRange: "$4.75 - $5.50",
      prices: [
        { size: "Regular", price: "$4.75" },
        { size: "Nitro", price: "$5.50" },
      ],
      description: "Steeped for 18 hours, our cold brew is smooth, rich, and less acidic than hot coffee.",
      longDescription:
        "Our cold brew coffee is steeped for 18 hours in cold, filtered water, resulting in a smooth, rich coffee concentrate with lower acidity than traditional brewing methods. The slow extraction process brings out subtle chocolate and caramel notes while minimizing bitterness. Available as a traditional cold brew or as a nitro version, which is infused with nitrogen for a creamy, stout-like texture with a beautiful cascading effect.",
      ingredients: ["100% Arabica coffee beans", "Filtered water", "Nitrogen (Nitro version only)"],
      nutritionalInfo: "Serving Size: 12 oz (360ml) | Calories: 5 | Caffeine: 155mg",
      image: "/placeholder.svg?height=600&width=800",
      relatedProducts: ["pour-over", "americano", "latte"],
    },
    "avocado-toast": {
      id: "avocado-toast",
      name: "Avocado Toast",
      category: "food",
      priceRange: "$9.50",
      prices: [{ size: "Regular", price: "$9.50" }],
      description: "Sourdough, smashed avocado, cherry tomatoes, microgreens, and a sprinkle of sea salt.",
      longDescription:
        "Our avocado toast features locally-baked sourdough bread topped with perfectly ripe, smashed avocado. We enhance it with halved cherry tomatoes, fresh microgreens, a sprinkle of sea salt, and a drizzle of extra virgin olive oil. A squeeze of lemon adds brightness to this nutritious and satisfying dish. Add a poached egg for an additional $2.",
      ingredients: [
        "Locally-baked sourdough bread",
        "Ripe avocado",
        "Cherry tomatoes",
        "Microgreens",
        "Sea salt",
        "Extra virgin olive oil",
        "Lemon",
      ],
      nutritionalInfo: "Serving Size: 1 toast | Calories: 320 | Protein: 7g | Fat: 18g | Carbs: 32g",
      image: "/placeholder.svg?height=600&width=800",
      relatedProducts: ["breakfast-bowl", "granola-yogurt", "seasonal-salad"],
    },
    "breakfast-bowl": {
      id: "breakfast-bowl",
      name: "Breakfast Bowl",
      category: "food",
      priceRange: "$12.50",
      prices: [{ size: "Regular", price: "$12.50" }],
      description: "Quinoa, poached egg, kale, roasted sweet potato, avocado, and tahini dressing.",
      longDescription:
        "Start your day with our nutrient-packed breakfast bowl. We begin with a base of protein-rich quinoa, topped with a perfectly poached egg, sautéed kale, roasted sweet potato cubes, and fresh avocado slices. Our house-made tahini dressing adds a creamy, nutty finish to this satisfying and energizing breakfast option.",
      ingredients: [
        "Organic quinoa",
        "Free-range egg",
        "Local kale",
        "Sweet potato",
        "Avocado",
        "House-made tahini dressing",
        "Sesame seeds",
      ],
      nutritionalInfo: "Serving Size: 1 bowl | Calories: 450 | Protein: 15g | Fat: 22g | Carbs: 48g",
      image: "/placeholder.svg?height=600&width=800",
      relatedProducts: ["avocado-toast", "granola-yogurt", "seasonal-salad"],
    },
    "granola-yogurt": {
      id: "granola-yogurt",
      name: "Granola & Yogurt",
      category: "food",
      priceRange: "$8.75",
      prices: [{ size: "Regular", price: "$8.75" }],
      description: "House-made granola, Greek yogurt, seasonal fruit, and a drizzle of local honey.",
      longDescription:
        "Our house-made granola is a crunchy blend of rolled oats, nuts, seeds, and a touch of maple syrup, slow-baked to perfection. We serve it atop creamy Greek yogurt and garnish with a selection of seasonal fruits. A drizzle of locally-sourced honey adds just the right amount of sweetness to this protein-rich breakfast or snack option.",
      ingredients: [
        "House-made granola (oats, almonds, pecans, pumpkin seeds, maple syrup)",
        "Greek yogurt",
        "Seasonal fruits",
        "Local honey",
      ],
      nutritionalInfo: "Serving Size: 1 bowl | Calories: 380 | Protein: 12g | Fat: 14g | Carbs: 52g",
      image: "/placeholder.svg?height=600&width=800",
      relatedProducts: ["avocado-toast", "breakfast-bowl", "pastries"],
    },
    "seasonal-salad": {
      id: "seasonal-salad",
      name: "Seasonal Salad",
      category: "food",
      priceRange: "$11.50",
      prices: [{ size: "Regular", price: "$11.50" }],
      description: "Mixed greens, seasonal vegetables, house vinaigrette, and toasted seeds.",
      longDescription:
        "Our seasonal salad celebrates the best produce each season has to offer. We start with a base of mixed local greens and add a variety of seasonal vegetables, herbs, and occasionally fruits. Our house-made vinaigrette uses cold-pressed olive oil and aged balsamic vinegar. Topped with toasted seeds for added texture and nutrition, this salad is both satisfying and nourishing.",
      ingredients: ["Local mixed greens", "Seasonal vegetables", "House-made vinaigrette", "Toasted seeds mix"],
      nutritionalInfo: "Serving Size: 1 salad | Calories: 280 | Protein: 5g | Fat: 18g | Carbs: 24g",
      image: "/placeholder.svg?height=600&width=800",
      relatedProducts: ["grain-bowl", "avocado-toast", "breakfast-bowl"],
    },
    "grain-bowl": {
      id: "grain-bowl",
      name: "Grain Bowl",
      category: "food",
      priceRange: "$13.75",
      prices: [{ size: "Regular", price: "$13.75" }],
      description: "Farro, roasted seasonal vegetables, tahini dressing, and fresh herbs.",
      longDescription:
        "Our hearty grain bowl features ancient farro as its base, topped with a colorful array of roasted seasonal vegetables that change throughout the year. Our creamy tahini dressing adds richness, while fresh herbs bring brightness to this nutritious and satisfying meal. This bowl provides a perfect balance of complex carbohydrates, plant proteins, and healthy fats.",
      ingredients: [
        "Organic farro",
        "Seasonal roasted vegetables",
        "House-made tahini dressing",
        "Fresh herbs",
        "Lemon zest",
      ],
      nutritionalInfo: "Serving Size: 1 bowl | Calories: 520 | Protein: 14g | Fat: 22g | Carbs: 68g",
      image: "/placeholder.svg?height=600&width=800",
      relatedProducts: ["seasonal-salad", "breakfast-bowl", "avocado-toast"],
    },
    pastries: {
      id: "pastries",
      name: "Pastries",
      category: "food",
      priceRange: "$4.25 - $4.75",
      prices: [
        { size: "Croissant", price: "$4.25" },
        { size: "Pain au Chocolat", price: "$4.75" },
        { size: "Seasonal Scone", price: "$4.50" },
        { size: "Banana Bread", price: "$4.25" },
      ],
      description: "House-made pastries baked fresh daily.",
      longDescription:
        "Our pastries are baked fresh every morning in our kitchen. We use European-style butter, organic flour, and the finest ingredients to create flaky croissants, indulgent pain au chocolat, seasonal scones, and moist banana bread. Our recipes have been perfected over years, resulting in pastries that pair perfectly with our coffee offerings.",
      ingredients: [
        "Organic flour",
        "European-style butter",
        "Free-range eggs",
        "Organic sugar",
        "Various fillings and flavors",
      ],
      nutritionalInfo: "Varies by pastry. Please ask our staff for specific information.",
      image: "/placeholder.svg?height=600&width=800",
      relatedProducts: ["granola-yogurt", "espresso", "latte"],
    },
  }

  return products[id as keyof typeof products]
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif mb-4">Product Not Found</h1>
          <p className="mb-6">Sorry, we couldn't find the product you're looking for.</p>
          <Link href="/menu" className="inline-flex items-center text-amber-800 hover:text-amber-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Menu
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <Link href="/menu" className="inline-flex items-center text-amber-800 hover:text-amber-900 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Menu
        </Link>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl md:text-4xl font-serif">{product.name}</h1>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-full hover:bg-neutral-100">
                    <Heart className="h-5 w-5 text-neutral-600" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-neutral-100">
                    <Share2 className="h-5 w-5 text-neutral-600" />
                  </button>
                </div>
              </div>

              <p className="text-xl text-amber-800 font-medium mb-4">{product.priceRange}</p>

              <p className="text-neutral-700 mb-6">{product.longDescription}</p>

              <div className="mb-6">
                <h2 className="text-lg font-medium mb-2">Sizes & Prices</h2>
                <div className="space-y-1">
                  {product.prices.map((price, index) => (
                    <div key={index} className="flex justify-between text-neutral-700">
                      <span>{price.size}</span>
                      <span>{price.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {product.category === "coffee" && (
                <div className="mb-6">
                  <h2 className="text-lg font-medium mb-2">Customizations</h2>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <h3 className="text-sm font-medium mb-1">Milk Options</h3>
                      <select className="w-full border rounded-md p-2">
                        <option>Whole Milk</option>
                        <option>Oat Milk (+$0.75)</option>
                        <option>Almond Milk (+$0.75)</option>
                        <option>Soy Milk (+$0.75)</option>
                      </select>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">Extras</h3>
                      <select className="w-full border rounded-md p-2">
                        <option>None</option>
                        <option>Extra Shot (+$1.00)</option>
                        <option>Vanilla Syrup (+$0.75)</option>
                        <option>Caramel Syrup (+$0.75)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button className="bg-amber-800 hover:bg-amber-900 text-white">Add to Cart</Button>
                <Button variant="outline" className="border-amber-800 text-amber-800 hover:bg-amber-50">
                  Subscribe & Save 10%
                </Button>
              </div>

              <div className="border-t pt-6">
                <div className="mb-4">
                  <h2 className="text-lg font-medium mb-2 flex items-center">
                    {product.category === "coffee" ? (
                      <Coffee className="h-4 w-4 mr-2 text-amber-800" />
                    ) : (
                      <Leaf className="h-4 w-4 mr-2 text-amber-800" />
                    )}
                    Ingredients
                  </h2>
                  <ul className="list-disc list-inside text-neutral-700 space-y-1">
                    {product.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-lg font-medium mb-2">Nutritional Information</h2>
                  <p className="text-neutral-700">{product.nutritionalInfo}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-serif mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {product.relatedProducts.map((relatedId) => {
                const relatedProduct = getProductById(relatedId)
                if (!relatedProduct) return null

                return (
                  <Link
                    href={`/menu/${relatedId}`}
                    key={relatedId}
                    className="bg-white rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-40">
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{relatedProduct.name}</h3>
                      <p className="text-amber-800">{relatedProduct.priceRange}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

