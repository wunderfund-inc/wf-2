<template>
  <section>
    <div class="container">
      <div class="img--bg">
        <div class="row justify-content-left">
          <div class="col-md-6">
            <div class="text-container">
              <h1 class="title">Invest in vetted startups near you</h1>
              <h6 class="subtitle">
                Invest as little as $20 in local startups and earn a return if
                the startup succeeds.
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.img--bg {
  background-image: url("~assets/bg/hero.svg");
  background-position: bottom right;
  background-repeat: no-repeat;
  -webkit-box-reflect: below -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(70%, transparent), to(rgba(250, 250, 250, 0.1)));

  .text-container {
    display: table-cell;
    height: 80vh;
    vertical-align: middle;
  }
}

@media only screen and (max-width: 991px) {
  .img-bg {
    margin: 15px;
    height: 50vh;
    background-position: right bottom;
    margin-bottom: 0;
    -webkit-box-reflect: transparent;

    .hero {
      height: 50vh;

      .title {
        width: 100%;
      }
    }
  }
}
</style>
