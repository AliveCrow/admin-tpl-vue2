<template>
    <div>
        TableView
        {{ new Date() }}
        <el-input v-model="value"></el-input>
    </div>
</template>

<script>
export default {
    name: 'TableView',
    data() {
        return {
            value: ''
        }
    }
}
</script>