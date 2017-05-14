<template>
    <nav class="header">
        <div class="nav-left">
            <div class="nav-logo">
                <a href="#/">
                    <img src="http://ohg8bcao5.bkt.clouddn.com/img/brand.png">
                </a>
            </div>
        </div>
        <!--<div class="nav-title">策略选购平台</div>-->
        <ul class="nav-setting">
            <li>用户</li>
        </ul>
    </nav>
</template>
<style lang="scss">
    //必须要加~才行
    @import "~css/variable.scss";
    .header {
        height: $header-height;
        overflow: hidden;
        background-color: $primary-color;
        padding: 0 15px;
        .nav-left{
            height: 100%;
            float: left;
        }
        .nav-logo, .nav-title {
            display: table-cell;
            height: $header-height;
            color: white;
            vertical-align: middle;
        }
        .nav-logo {
            img {
                height: 32px;
                width: 136px;
            }
        }
        .nav-title {
            font-size: 20px;
        }
        > ul{
            list-style: none;
            float: right;
            margin: 0;
            padding: 0;
            color: white;
        }
        .nav-setting{
            height: 100%;
            >li{
                height: 100%;
                line-height: $header-height;
                padding: 0 10px;
            }
            >li:hover{
                background-color: darken($primary-color,10%);
                cursor: pointer;
            }
        }
    }
</style>
<script>
   export default{
     data () {
       return {
         msg: 'hello vue'
       }
     }

   }

</script>
