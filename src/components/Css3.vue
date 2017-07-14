<template>
    <list-model :category="category"></list-model>
</template>
<script>
import listModel from '@/components/ListModel.vue'
export default {
    name: 'Css3',
    components: {
        listModel
    },
    data() {
        return {
            category: 'Css3'
        }
    }
}
</script>
