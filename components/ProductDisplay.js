const productDisplay = {
    template:
        /*html*/
        `
    <div class="product-display">
        <div class="product-container">
            <div class="product-image">
                <img :src="image" :class="{ 'out-stock-image': !inStock }">
            </div>
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <h1><a :href="productLink">{{ product }}</a></h1>
            <p v-if="inventory > 10">In Stock</p>
            <p v-else-if="inventory <= 10 && inventory > 0">Almost out of Stock</p>
            <p v-else>Out of Stock</p>
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
            <p>Shipping: {{ shipping }}</p>
            <p v-if="onSale">{{ saleMessage }}</p>
            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>
            <div v-for="(variant,index) in variants" 
                 :key="variant.id" 
                 @mouseover="updateVariant(index)"
                 class="color-circle" 
                 :style="{backgroundColor: variant.color}">
            </div>
            <div>   
                <button class="button" 
                        :disabled='!inStock' 
                        @click="addToCart" 
                        :class="{disabledButton: !inStock}">
                    Add To Cart
                </button>
            </div>
            <button class="button" @click="toggleInStock">Toggle In Stock</button>
            <p>Sizes: {{ sizes.join(', ') }}</p>
        </div>
    </div>
    `,
    props: {
        premium: Boolean,
        shipping: [String, Number] // 允许字符串或数字类型
    },
    setup(props,{emit}) {
        const product = ref('Boots')
        const brand = ref('SE 331')
        const productLink = ref('https://www.camt.cmu.ac.th')
        const inventory = ref(100)
        const onSale = ref(false)
        const details = ref([
            '50% cotton',
            '30% wool',
            '20% polyester'
        ])
        const variants = ref([
            { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
            { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 }
        ])
        const selectedVariant = ref(0)
        const sizes = ref(['S', 'M', 'L'])
        const cart = ref(0)
        
        function updateVariant(index) {
            selectedVariant.value = index;
        }
        
        const image = computed(() => {
            return variants.value[selectedVariant.value].image
        })
        
        const inStock = computed(() => {
            return variants.value[selectedVariant.value].quantity
        })
        
        const saleMessage = computed(() => {
            if (onSale.value) {
                return brand.value + ' ' + product.value + ' is on sale';
            }
            return '';
        })
        
        function addToCart() {
            emit('add-to-cart',variants.value[selectedVariant.value].id)
        }
        
        const title = computed(() => {
            return brand.value + ' ' + product.value
        })
        
        function updateImage(variantImage) {
            image.value = variantImage
        }
        
        const toggleInStock = () => {
            const currentQuantity = variants.value[selectedVariant.value].quantity;
            variants.value[selectedVariant.value].quantity = currentQuantity > 0 ? 0 : 50;
        }
        
        return {
            product,
            brand,
            productLink,
            title,
            image,
            inStock,
            inventory,
            onSale,
            details,
            variants,
            sizes,
            cart,
            saleMessage,
            addToCart,
            updateImage,
            updateVariant,
            toggleInStock
        }
    }
}