<template>
    <div class="header">
        <headerTop></headerTop>
        <headerMiddle></headerMiddle>
        <navbar></navbar> 
    </div>
</template>

<script>
    import headerMiddle from '../headerMiddle/headerMiddle.vue'
    import headerTop from '../headerTop/headerTop.vue'
    import navbar from '../navbar/navbar.vue'
    export default {
        components:{
            headerTop,
            headerMiddle,
            navbar
        },
        data(){
            return{
                
            }
        }
    }
</script>

<style scoped lang="less">
    .header{
        height: 205px;
        width: 100%;
    }
    
</style>