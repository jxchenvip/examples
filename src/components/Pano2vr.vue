<template>
    <list-model :category="category"></list-model>
</template>
<script>
import listModel from '@/components/ListModel.vue'
export default {
    name: 'Pano2vr',
    components: {
        listModel
    },
    data() {
        return {
            category: 'Pano2vr'
        }
    }
}
</script>
