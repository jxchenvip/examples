<template>
    <list-model :category="category"></list-model>
</template>
<script>
import listModel from '@/components/ListModel.vue'
export default {
    name: 'Canvas',
    components: {
        listModel
    },
    data() {
        return {
            category: 'Canvas'
        }
    }
}
</script>
