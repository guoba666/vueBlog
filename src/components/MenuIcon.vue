<template>
    <div>
        <input id="menu" type="checkbox">
        <label for="menu"></label>
    </div>
</template>

<script>
    export default {
        name: "MenuIcon",

    }
</script>

<style scoped>
    #menu {
        display: inline-block;
        visibility: hidden;
    } /* hiding the checkbox */

    /* hamburger */
    label {
        width: 30px;
        height: 5px;
        border-radius: 5px;
        background: white;
        cursor: pointer;
        -webkit-transition: 0.6s;
        transition: 0.6s;
        position: fixed;
        top: 34px;
        left: 24px;
    }
    label:before {
        content: "";
        width: 30px;
        height: 5px;
        background: white;
        position: absolute;
        ransform: translateY(-10px);
        -webkit-transform: translateY(-10px);
        border-radius: 5px;
        -webkit-tratnsition: 0.6s;
        transition: 0.6s;
        left:0;
    }
    label:after {
        content: "";
        width: 30px;
        height: 5px;
        background: white;
        position: absolute;
        transform: translateY(10px);
        -webkit-transform: translateY(10px);
        border-radius: 5px;
        transition: 0.6s;
        -webkit-transition: 0.6s;
        left:0px;
    }

    /* animation when checked */
    #menu:checked + label {
        width: 0px;
    }
    #menu:checked + label:before {
        transform: rotate(45deg) translate(0px);
        -webkit-transform: rotate(45deg) translate(0px);
    }
    #menu:checked + label:after {
        transform: rotate(-45deg) translate(0px);
        -webkit-transform: rotate(-45deg) translate(0px);
    }


</style>