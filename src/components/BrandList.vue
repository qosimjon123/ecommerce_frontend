<script setup lang="ts"></script>

<template>
  <section class="inner-section single-banner">
    <div class="container">
      <h2>Наши Партнеры</h2>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/store/1">Главная</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">Партнеры</li>
      </ol>
    </div>
  </section>
  <section class="inner-section"></section>
</template>

<style>
.single-banner {
  background: url(../assets/images/single-banner.jpg) no-repeat center;
}
</style>
