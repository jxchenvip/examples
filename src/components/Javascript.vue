<template>
    <list-model :category="category"></list-model>
</template>
<script>
import listModel from '@/components/ListModel.vue'
export default {
    name: 'Javascript',
    components: {
        listModel
    },
    data() {
        return {
            category: 'Javascript'
        }
    }
}
</script>
