<template>
  <div>
    <div class="container">
      <div class="left">
        <h2 class="welcome">¡Welcome!<br />Sign to start</h2>
      </div>
      <div class="right"><slot name="content"></slot></div>
    </div>
  </div>
  <header class="header">
    <div class="left">Logo</div>
    <div class="right">
      <slot name="header-right"></slot>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: stretch;
  .left {
    background-color: #248aff;
    width: 375px;
    display: flex;
    align-items: center;
    justify-content: center;
    .welcome {
      font-weight: 700;
      font-size: 40px;
      line-height: 48px;
      color: #ffffff;
    }
  }
  .right {
    width: calc(100vw - 375px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.header {
  position: absolute;
  top: 0;
  height: 94px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  .left {
    margin-top: 26px;
    margin-left: 48px;
    font-weight: 700;
    font-size: 30px;
    line-height: 36px;
    text-transform: uppercase;
    color: #ffffff;
  }
}
</style>
