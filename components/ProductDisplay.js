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
            <review-list :reviews="reviews"></review-list>
            <review-form @review-submitted="addReview"></review-form>
            <button class="button" @click="toggleInStock">Toggle In Stock</button>
            <button class="button" @click="removeFromCart">Remove From Cart</button>
            <p>Sizes: {{ sizes.join(', ') }}</p>
        </div>
    </div>
    `,
    props: {
        premium: Boolean,
        shipping: [String, Number] // 允许字符串或数字类型
    },
    setup(props,{emit}) {
        const reviews = Vue.ref([])
        function addReview(review) {
            reviews.value.push(review)
        }
        const product = Vue.ref('Boots')
        const brand = Vue.ref('SE 331')
        const productLink = Vue.ref('https://www.camt.cmu.ac.th')
        const inventory = Vue.ref(100)
        const onSale = Vue.ref(false)
        const details = Vue.ref([
            '50% cotton',
            '30% wool',
            '20% polyester'
        ])
        const variants = Vue.ref([
            { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
            { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 }
        ])
        const selectedVariant = Vue.ref(0)
        const sizes = Vue.ref(['S', 'M', 'L'])
        const cart = Vue.ref(0)
        
        function updateVariant(index) {
            selectedVariant.value = index;
        }
        
        const image = Vue.computed(() => {
            return variants.value[selectedVariant.value].image
        })
        
        const inStock = Vue.computed(() => {
            return variants.value[selectedVariant.value].quantity
        })
        
        const saleMessage = Vue.computed(() => {
            if (onSale.value) {
                return brand.value + ' ' + product.value + ' is on sale';
            }
            return '';
        })
        
        function addToCart() {
            emit('add-to-cart',variants.value[selectedVariant.value].id)
        }
        
        const title = Vue.computed(() => {
            return brand.value + ' ' + product.value
        })
        
        function updateImage(variantImage) {
            image.value = variantImage
        }
        
        function toggleInStock() {
            const currentQuantity = variants.value[selectedVariant.value].quantity;
            variants.value[selectedVariant.value].quantity = currentQuantity > 0 ? 0 : 50;
        }
        
        function removeFromCart() {
            emit('remove-from-cart', variants.value[selectedVariant.value].id);
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
            toggleInStock,
            removeFromCart
        }
    }
}