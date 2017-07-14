<template>
    <list-model :category="category"></list-model>
</template>
<script>
import listModel from '@/components/ListModel.vue'
export default {
    name: 'Vue',
    components: {
        listModel
    },
    data() {
        return {
            category: 'Vue'
        }
    }
}
</script>
