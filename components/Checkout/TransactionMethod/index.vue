<template lang="pug">
  b-form-group(label="How do you want to invest?")
    b-form-radio(value="ach") ACH
    b-form-radio(value="check") via a Check
    b-form-radio(value="wire") via Wire Transfer
    b-form-radio(value="cc") via Credit Card
    b-form-radio(value="crypto") via Cryptocurrency
</template>
