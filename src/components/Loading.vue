<template>
    <div class="carregar"></div>
</template>

<style>

.carregar {
    animation: is-rotating 1s infinite;
    border: 6px solid #e5e5e5;
    border-radius: 50%;
    border-top-color: #B9DD2A;
    height: 80px;
    width: 80px;
    margin: 60px auto 40px;
}

@keyframes is-rotating {
  to {
    transform: rotate(1turn);
  }
}

</style>