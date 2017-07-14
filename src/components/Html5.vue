<template>
    <list-model :category="category"></list-model>
</template>
<script>
import listModel from '@/components/ListModel.vue'
export default {
    name: 'Html5',
    components: {
        listModel
    },
    data() {
        return {
            category: 'Html5'
        }
    }
}
</script>
