const {createApp,ref,computed} = Vue

const app = createApp({
    setup(){
        const premium =ref(true)
        const shipping = computed(()=>{
            if (premium.value){
                return 'Free'
            } else {
                return 30
            }
           
        })
        const product = ref('Boots')
        const brand = ref('SE 331')
        const productLink = ref('https://www.camt.cmu.ac.th')
        const inventory =ref(100)
        const onSale = ref(false)
        const details = ref(['50% cotton', '30% wool', '20% polyester'])
        const variants = ref([
            { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
           { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 }
        ])
        const selectedVariant = ref(0)
        function updateVariant(index){
            selectedVariant.value = index;
        }
        const image = computed(() => {
            return variants.value[selectedVariant.value].image
        })
        const inStock = computed(() => {
            return variants.value[selectedVariant.value].quantity
        })
       const sizes = ref(['S', 'M', 'L'])
       const cart=ref(0)
       const saleMessage = computed(() => {
    if (onSale.value) {
        return brand.value + ' ' + product.value + ' is on sale';
    }
    return '';
       })
      function addToCart() {
            cart.value +=1
        }
      const title = computed(() =>{
            return brand.value + ' ' + product.value
        })
      function updateImage(variantImage){
          image.value = variantImage
        }   
      const toggleInStock = () => {
      inStock.value = !inStock.value
      }

      
      
        return {  
            
            image,
            inStock,
            productLink,
            inventory,
            onSale,
            details,
            variants,
            sizes,
            cart,
            title,
            saleMessage,
            premium,
            addToCart,
            shipping,
        }
    }
})

app.component('product-display', productDisplay)
app.component('product-details', productDetails)
app.mount('#app')