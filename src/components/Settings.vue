<script setup>
    import { ref } from 'vue';
    const but = ref(null)
    const switchButton = () => {
        but.value.classList.toggle('clicked')
    }
</script>
<template>
    <div class="options">
        <div class="theme">
            <h3>Motyw:</h3>
            <div class="border" @click="switchButton" ref="but">
                <div class="content">
                    <img id="stars" src="../assets/stars.png" alt="gwiazdki">
                    <div class="ray ray-0"></div>
                    <div class="ray ray-1"></div>
                    <div class="ray ray-2"></div>
                    <div class="ray ray-3"></div>
                    <div class="ray ray-4"></div>
                    <div class="ray ray-5"></div>
                    <div class="ray ray-6"></div>
                    <div class="ray ray-7"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .options{
        display: flex;
        flex-direction: column;
        height: auto;
        width: 100%;
        padding: 1%;
        .theme{
            display: flex;
            width: 15%;
            min-width: 9rem;
            justify-content: space-around;
            align-items: center;
            .border{
                width: 4rem;
                height: 2rem;
                padding: 0.2rem;
                border-radius: 1rem;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                background-color: #87CEEB;
                transition: background-color 1s;
                .content{
                    transform: scale(-70%);
                    height: 1.5rem;
                    width: 1.5rem;
                    background-color: #FFD700;
                    border-radius: 100%;
                    transition: background-color 1s, transform 0.5s;
                    position: relative;
                    .ray {
                        opacity: 1;
                        position: absolute;
                        top: 30%;
                        left: 30%;
                        width: 0;
                        height: 0;
                        border-left: 0.3rem solid transparent;
                        border-right: 0.3rem solid transparent;
                        border-bottom: 0.6rem solid #FFD700;
                        transform-origin: center;
                        transition: opacity 0.3s;
                    }
                    @for $i from 0 through 7 {
                      .ray-#{$i} {
                        transform: rotate(#{$i * 45}deg) translateY(-0.85rem);
                      }
                    }
                    &::after{
                        content: "";
                        background-color: transparent;
                        border-radius: 100%;
                        opacity: 0;
                    }
                }
                #stars{
                    height: 100%;
                    opacity: 0;
                }


                &.clicked{
                    background-color: #000033;
                    .content {
                        transform: translateX(calc(100% + 0.5rem));
                        background-color: #C0C0C0;
                        position: relative;
                        display: flex;
                        &::after{
                            position: absolute;
                            left:35%;
                            content:"";
                            width: 1rem;
                            height: 1rem;
                            border-radius: 100%;
                            background-color: #000033;
                            opacity: 1;
                        }
                        .ray{
                            opacity: 0;
                        }
                        #stars{
                            position:absolute;
                            opacity: 1;
                            right: 130%;

                        }

                    }
                }
            }
        }
    }



</style>