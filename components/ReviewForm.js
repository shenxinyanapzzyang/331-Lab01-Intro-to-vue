const reviewForm = {
    template:
        /*html*/
        `<form class="review-form" @submit.prevent="submitForm">
      <h3>Leave a review</h3>
      <label for="name">Name:</label>
      <input id="name" v-model="name">
      <span v-if="errors.name" class="error">{{ errors.name }}</span>

      <label for="review">Review:</label>    
      <textarea id="review" v-model="review"></textarea>
      <span v-if="errors.review" class="error">{{ errors.review }}</span>

      <label for="rating">Rating:</label>
      <select id="rating" v-model="rating">        
        <option value="">Select a rating</option>
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
      <span v-if="errors.rating" class="error">{{ errors.rating }}</span>

      <label>Would you recommend this product?</label>
      <div class="recommend-options">
        <label><input type="radio" v-model="recommend" value="true"> Yes</label>
        <label><input type="radio" v-model="recommend" value="false"> No</label>
      </div>
      <span v-if="errors.recommend" class="error">{{ errors.recommend }}</span>

      <input class="button" type="submit" value="Submit" :disabled="!isFormValid">
    </form>`,
    setup(props,{emit}) {
        const form = Vue.reactive({
            name: '',
            review: '',
            rating: '',
            recommend: undefined
        })
        
        // 使用toRefs解构响应性对象
        const { name, review, rating, recommend } = Vue.toRefs(form)
        
        const errors = Vue.reactive({
            name: '',
            review: '',
            rating: '',
            recommend: ''
        })
        
        function validateForm() {
            let isValid = true
            
            // 重置错误信息
            errors.name = ''
            errors.review = ''
            errors.rating = ''
            errors.recommend = ''
            
            // 验证每个字段
            if (!name.value.trim()) {
                errors.name = 'Name is required'
                isValid = false
            }
            
            if (!review.value.trim()) {
                errors.review = 'Review is required'
                isValid = false
            }
            
            if (!rating.value) {
                errors.rating = 'Rating is required'
                isValid = false
            }
            
            if (recommend.value === undefined) {
                errors.recommend = 'Please select whether you recommend this product'
                isValid = false
            }
            
            return isValid
        }
        
        const isFormValid = Vue.computed(() => {
            return name.value.trim() && review.value.trim() && rating.value && recommend.value !== undefined
        })
          
        function submitForm(){
            if (validateForm()) {
                const productReview = {
                    name: name.value,
                    review: review.value,
                    rating: rating.value,
                    recommend: recommend.value === 'true' // 转换为布尔值
                }
                emit('review-submitted', productReview)
                
                // 重置表单
                name.value = ''
                review.value = ''
                rating.value = ''
                recommend.value = undefined
            }
        }
        
        return {
            name,
            review,
            rating,
            recommend,
            errors,
            isFormValid,
            submitForm
        }
    }

}