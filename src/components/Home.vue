<template>
    <list-model>
        {{$route.params}}
    </list-model>
</template>
<script>
import listModel from '@/components/ListModel.vue'
export default {
    name: 'Home',
    components: {
        listModel
    },
    data() {
        return {
            category: 'all web '
        }
    }
}
</script>
