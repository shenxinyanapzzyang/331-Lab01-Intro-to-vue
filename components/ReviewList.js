const reviewList = {

    template:
        /*html*/
        `
    <div class="review-container" v-if="reviews && reviews.length > 0">
        <h3>Reviews:</h3>
        <ul>
        <li v-for="(review, index) in reviews" :key="index">
            {{ review.name }} gave this {{ review.rating }} stars
            <br/>
            "{{ review.review }}"
            <br/>
            <span v-if="review.recommend">Would recommend this product</span>
            <span v-else-if="review.recommend !== undefined">Would not recommend this product</span>
        </li>
        </ul>
    </div>
        `
    ,props: {
        reviews: {
            type: Array
        }
    },
    setup(props){
        const reviews = props.reviews
        return {
            reviews
        }
    }
}